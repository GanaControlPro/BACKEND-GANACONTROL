const {
  sequelize,
  Venta,
  DetalleVentaGanado,
  DetalleVentaProducto,
  Ganado,
  Producto,
  Produccion,
} = require('../models');

const crypto = require('crypto');
const { Op, fn, col, literal } = require('sequelize');

function toDateOnly(date) {
  return date.toISOString().split('T')[0];
}

async function resolverGanadoParaVenta({
  codigo,
  ganado_id,
  finca_id,
  ventaIdExcluir = null,
  transaction,
}) {
  const whereGanado = ganado_id
    ? { id: ganado_id, finca_id }
    : { codigo, finca_id };

  const ganado = await Ganado.findOne({
    where: whereGanado,
    transaction,
    lock: transaction.LOCK.UPDATE,
  });

  if (!ganado) {
    const error = new Error(`No existe ganado con código/id ${codigo || ganado_id}`);
    error.status = 404;
    throw error;
  }

  if (ganado.estado_comercial === 'Vendido') {
    const error = new Error(`El ganado ${ganado.codigo} ya está marcado como vendido`);
    error.status = 409;
    throw error;
  }

  const whereDetalle = { ganado_id: ganado.id };

  if (ventaIdExcluir) {
    whereDetalle.venta_id = { [Op.ne]: ventaIdExcluir };
  }

  const ventaExistente = await DetalleVentaGanado.findOne({
    where: whereDetalle,
    include: [
      {
        model: Venta,
        as: 'venta',
        where: { finca_id, estado: 'Completado' },
        required: true,
      },
    ],
    transaction,
  });

  if (ventaExistente) {
    const error = new Error(`El ganado ${ganado.codigo} ya fue vendido en otra venta`);
    error.status = 409;
    throw error;
  }

  return ganado;
}

async function crearVenta({
  finca_id,
  cliente,
  fecha,
  estado = 'Pendiente',
  ganadoItems = [],
  productoItems = [],
  produccionItems = [],
}) {
  return sequelize.transaction(async (t) => {
    const venta = await Venta.create(
      { finca_id, cliente, fecha, estado },
      { transaction: t }
    );

    let total = 0;

    for (const it of ganadoItems) {
      const ganado = await resolverGanadoParaVenta({
        codigo: it.codigo,
        ganado_id: it.ganado_id,
        finca_id,
        transaction: t,
      });

      await DetalleVentaGanado.create(
        {
          venta_id: venta.id,
          ganado_id: ganado.id,
          precio: it.precio,
        },
        { transaction: t }
      );

      if (estado === 'Completado') {
        await ganado.update(
          { estado_comercial: 'Vendido' },
          { transaction: t }
        );
      }

      total += Number(it.precio || 0);
    }

    for (const it of productoItems) {
      const subtotal =
        Number(it.cantidad || 0) * Number(it.precio_unitario || 0);

      await DetalleVentaProducto.create(
        {
          venta_id: venta.id,
          producto_id: it.producto_id,
          cantidad: it.cantidad,
          precio_unitario: it.precio_unitario,
          subtotal,
        },
        { transaction: t }
      );

      total += subtotal;
    }

    for (const it of produccionItems) {
      const subtotal =
        Number(it.cantidad || 0) * Number(it.precio_unitario || 0);

      await DetalleVentaProducto.create(
        {
          venta_id: venta.id,
          produccion_id: it.produccion_id,
          cantidad: it.cantidad,
          precio_unitario: it.precio_unitario,
          subtotal,
        },
        { transaction: t }
      );

      total += subtotal;
    }

    await Venta.update(
      { total },
      { where: { id: venta.id }, transaction: t }
    );

    return await Venta.findByPk(venta.id, {
      transaction: t,
      include: [
        {
          model: DetalleVentaGanado,
          as: 'detalle_ganado',
          include: [
            {
              model: Ganado,
              as: 'ganado',
              attributes: ['id', 'codigo', 'nombre', 'categoria', 'raza'],
            },
          ],
        },
        {
          model: DetalleVentaProducto,
          as: 'detalle_productos',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'tipo'],
              required: false,
            },
            {
              model: Produccion,
              as: 'produccion',
              attributes: ['id', 'fecha'],
              required: false,
            },
          ],
        },
      ],
    });
  });
}

async function actualizarVentaCompleta(id, finca_id, payload) {
  return sequelize.transaction(async (t) => {
    const venta = await Venta.findOne({
      where: { id, finca_id },
      transaction: t,
    });

    if (!venta) {
      const error = new Error('Venta no encontrada');
      error.status = 404;
      throw error;
    }

    const detallesGanadoAnteriores = await DetalleVentaGanado.findAll({
      where: { venta_id: id },
      transaction: t,
    });

    const ganadoAnteriorIds = detallesGanadoAnteriores.map((d) => d.ganado_id);
    const nuevoEstado = payload.estado ?? venta.estado;

    await venta.update(
      {
        cliente: payload.cliente,
        fecha: payload.fecha,
        estado: nuevoEstado,
      },
      { transaction: t }
    );

    await DetalleVentaGanado.destroy({
      where: { venta_id: id },
      transaction: t,
    });

    await DetalleVentaProducto.destroy({
      where: { venta_id: id },
      transaction: t,
    });

    let total = 0;

    const ganadoNuevoIds = [];

    for (const it of payload.ganadoItems || []) {
      const ganado = await resolverGanadoParaVenta({
        codigo: it.codigo,
        ganado_id: it.ganado_id,
        finca_id,
        ventaIdExcluir: id,
        transaction: t,
      });

      ganadoNuevoIds.push(ganado.id);

      await DetalleVentaGanado.create(
        {
          venta_id: id,
          ganado_id: ganado.id,
          precio: it.precio,
        },
        { transaction: t }
      );

      if ((payload.estado || venta.estado) === 'Completado') {
        await ganado.update(
          { estado_comercial: 'Vendido' },
          { transaction: t }
        );
      }

      total += Number(it.precio || 0);
    }

    const removidos = ganadoAnteriorIds.filter(
      (oldId) => !ganadoNuevoIds.includes(oldId)
    );

    for (const ganadoId of removidos) {
      const vendidoEnOtraVenta = await DetalleVentaGanado.findOne({
        where: {
          ganado_id: ganadoId,
          venta_id: { [Op.ne]: id },
        },
        include: [
          {
            model: Venta,
            as: 'venta',
            where: { finca_id, estado: 'Completado' },
            required: true,
          },
        ],
        transaction: t,
      });

      if (!vendidoEnOtraVenta) {
        await Ganado.update(
          { estado_comercial: 'Disponible' },
          {
            where: { id: ganadoId, finca_id },
            transaction: t,
          }
        );
      }
    }

    for (const it of payload.productoItems || []) {
      const subtotal =
        Number(it.cantidad || 0) * Number(it.precio_unitario || 0);

      await DetalleVentaProducto.create(
        {
          venta_id: id,
          producto_id: it.producto_id,
          cantidad: it.cantidad,
          precio_unitario: it.precio_unitario,
          subtotal,
        },
        { transaction: t }
      );

      total += subtotal;
    }

    for (const it of payload.produccionItems || []) {
      const subtotal =
        Number(it.cantidad || 0) * Number(it.precio_unitario || 0);

      await DetalleVentaProducto.create(
        {
          venta_id: id,
          produccion_id: it.produccion_id,
          cantidad: it.cantidad,
          precio_unitario: it.precio_unitario,
          subtotal,
        },
        { transaction: t }
      );

      total += subtotal;
    }

    await venta.update({ total }, { transaction: t });

    return await Venta.findOne({
      where: { id, finca_id },
      include: [
        {
          model: DetalleVentaGanado,
          as: 'detalle_ganado',
          include: [
            {
              model: Ganado,
              as: 'ganado',
              attributes: ['id', 'codigo', 'nombre', 'categoria', 'raza'],
            },
          ],
        },
        {
          model: DetalleVentaProducto,
          as: 'detalle_productos',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'tipo'],
              required: false,
            },
            {
              model: Produccion,
              as: 'produccion',
              attributes: ['id', 'fecha'],
              required: false,
            },
          ],
        },
      ],
      transaction: t,
    });
  });
}

async function obtenerKPIs(finca_id) {
  const hoy = new Date();
  const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const inicioMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
  const finMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0);

  const [
    totalHistorico,
    totalMesActual,
    totalMesAnterior,
    cantidadVentas,
    cantidadVentasMesActual,
  ] = await Promise.all([
    Venta.sum('total', { where: { finca_id } }),
    Venta.sum('total', {
      where: {
        finca_id,
        fecha: { [Op.gte]: inicioMesActual },
      },
    }),
    Venta.sum('total', {
      where: {
        finca_id,
        fecha: { [Op.between]: [inicioMesAnterior, finMesAnterior] },
      },
    }),
    Venta.count({ where: { finca_id } }),
    Venta.count({
      where: {
        finca_id,
        fecha: { [Op.gte]: inicioMesActual },
      },
    }),
  ]);

  const totalGeneral = Number(totalHistorico || 0);
  const totalActual = Number(totalMesActual || 0);
  const totalAnterior = Number(totalMesAnterior || 0);

  let deltaVentasMes = '0%';
  let trendVentasMes = 'flat';

  if (totalAnterior > 0) {
    const variacion = ((totalActual - totalAnterior) / totalAnterior) * 100;
    deltaVentasMes = `${variacion >= 0 ? '+' : ''}${variacion.toFixed(1)}%`;
    trendVentasMes = variacion > 0 ? 'up' : variacion < 0 ? 'down' : 'flat';
  } else if (totalActual > 0) {
    deltaVentasMes = '+100%';
    trendVentasMes = 'up';
  }

  const ticketPromedio = cantidadVentas > 0 ? totalGeneral / cantidadVentas : 0;

  return [
    {
      label: 'Ventas Totales',
      value: `$${totalGeneral.toLocaleString('es-CO')}`,
      delta: 'Histórico',
      trend: 'flat',
      ico: '💰',
      pct: totalGeneral > 0 ? 100 : 0,
    },
    {
      label: 'Ventas del Mes',
      value: `$${totalActual.toLocaleString('es-CO')}`,
      delta: deltaVentasMes,
      trend: trendVentasMes,
      ico: '📈',
      pct: totalActual > 0 ? 80 : 0,
    },
    {
      label: 'Cantidad de Ventas',
      value: `${cantidadVentas}`,
      delta: `${cantidadVentasMesActual} este mes`,
      trend: cantidadVentasMesActual > 0 ? 'up' : 'flat',
      ico: '🧾',
      pct: cantidadVentas > 0 ? 60 : 0,
    },
    {
      label: 'Ticket Promedio',
      value: `$${ticketPromedio.toLocaleString('es-CO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      delta: 'Promedio por venta',
      trend: 'flat',
      ico: '🏦',
      pct: ticketPromedio > 0 ? 70 : 0,
    },
  ];
}

async function obtenerResumenHero(finca_id) {
  const hoy = new Date();
  const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const inicioAnioActual = new Date(hoy.getFullYear(), 0, 1);

  const [
    ventasMes,
    cantidadVentasMes,
    ventasEsteAnio,
    clientesActivos,
  ] = await Promise.all([
    Venta.sum('total', {
      where: {
        finca_id,
        fecha: { [Op.gte]: inicioMesActual },
      },
    }),
    Venta.count({
      where: {
        finca_id,
        fecha: { [Op.gte]: inicioMesActual },
      },
    }),
    Venta.count({
      where: {
        finca_id,
        fecha: { [Op.gte]: inicioAnioActual },
      },
    }),
    Venta.count({
      distinct: true,
      col: 'cliente',
      where: { finca_id },
    }),
  ]);

  const totalMes = Number(ventasMes || 0);
  const cantidadMes = Number(cantidadVentasMes || 0);

  return {
    ventasEsteAnio: Number(ventasEsteAnio || 0),
    clientesActivos: Number(clientesActivos || 0),
    ingresosMes: totalMes,
    totalMes,
    cantidadMes,
  };
}

async function obtenerCrecimiento(finca_id, periodo = 'Semana') {
  const hoy = new Date();
  const tipo = String(periodo || 'Semana').toLowerCase();
  let dataBase = [];

  if (tipo === 'semana') {
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - 6);
    inicioSemana.setHours(0, 0, 0, 0);

    const finSemana = new Date(hoy);
    finSemana.setHours(23, 59, 59, 999);

    const claveHoy = toDateOnly(hoy);

    const ventas = await Venta.findAll({
      attributes: [
        [fn('DATE', col('fecha')), 'fecha'],
        [fn('SUM', col('total')), 'total'],
      ],
      where: {
        finca_id,
        fecha: { [Op.between]: [inicioSemana, finSemana] },
      },
      group: [fn('DATE', col('fecha'))],
      order: [[literal('fecha'), 'ASC']],
      raw: true,
    });

    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    dataBase = Array.from({ length: 7 }, (_, i) => {
      const fecha = new Date(inicioSemana);
      fecha.setDate(inicioSemana.getDate() + i);

      return {
        clave: toDateOnly(fecha),
        label: dias[fecha.getDay()],
        valor: 0,
        esActual: toDateOnly(fecha) === claveHoy,
      };
    });

    ventas.forEach((v) => {
      const item = dataBase.find((x) => x.clave === v.fecha);
      if (item) item.valor = Number(v.total || 0);
    });
  } else if (tipo === 'mes') {
    const mesesNombres = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const mesActual = hoy.getMonth() + 1;
    const anioActual = hoy.getFullYear();

    dataBase = Array.from({ length: 12 }, (_, i) => ({
      year: anioActual,
      month: i + 1,
      label: mesesNombres[i],
      valor: 0,
      esActual: i + 1 === mesActual,
    }));

    const fechaInicio = new Date(anioActual, 0, 1, 0, 0, 0, 0);
    const fechaFin = new Date(anioActual, 11, 31, 23, 59, 59, 999);

    const ventas = await Venta.findAll({
      attributes: [
        [fn('YEAR', col('fecha')), 'anio'],
        [fn('MONTH', col('fecha')), 'mes'],
        [fn('SUM', col('total')), 'total'],
      ],
      where: {
        finca_id,
        fecha: { [Op.between]: [fechaInicio, fechaFin] },
      },
      group: [fn('YEAR', col('fecha')), fn('MONTH', col('fecha'))],
      order: [
        [literal('anio'), 'ASC'],
        [literal('mes'), 'ASC'],
      ],
      raw: true,
    });

    ventas.forEach((v) => {
      const item = dataBase.find(
        (x) => x.year === Number(v.anio) && x.month === Number(v.mes)
      );
      if (item) item.valor = Number(v.total || 0);
    });
  } else {
    const anioActual = hoy.getFullYear();

    dataBase = Array.from({ length: 5 }, (_, i) => {
      const year = anioActual - (4 - i);
      return {
        year,
        label: String(year),
        valor: 0,
        esActual: year === anioActual,
      };
    });

    const fechaInicio = new Date(anioActual - 4, 0, 1, 0, 0, 0, 0);
    const fechaFin = new Date(anioActual, 11, 31, 23, 59, 59, 999);

    const ventas = await Venta.findAll({
      attributes: [
        [fn('YEAR', col('fecha')), 'anio'],
        [fn('SUM', col('total')), 'total'],
      ],
      where: {
        finca_id,
        fecha: {
          [Op.between]: [fechaInicio, fechaFin],
        },
      },
      group: [fn('YEAR', col('fecha'))],
      order: [[literal('anio'), 'ASC']],
      raw: true,
    });

    ventas.forEach((v) => {
      const anio = Number(v.anio);
      const item = dataBase.find((x) => x.year === anio);
      if (item) item.valor = Number(v.total || 0);
    });
  }

  const maxValor = Math.max(...dataBase.map((x) => x.valor), 0);

  return dataBase.map((item) => {
    const alturaReal = maxValor > 0 ? (item.valor / maxValor) * 100 : 0;

    return {
      label: item.label,
      valor: item.valor,
      altura: item.valor > 0 ? Math.max(12, Math.round(alturaReal)) : 0,
      activo: item.esActual === true,
    };
  });
}

async function obtenerLiquidacion(finca_id) {
  const ventas = await Venta.findAll({
    where: { finca_id },
    order: [['fecha', 'DESC']],
    limit: 5,
    include: [
      {
        model: DetalleVentaGanado,
        as: 'detalle_ganado',
        attributes: ['id', 'ganado_id', 'precio'],
        required: false,
      },
      {
        model: DetalleVentaProducto,
        as: 'detalle_productos',
        attributes: ['id', 'producto_id', 'produccion_id', 'subtotal'],
        required: false,
      },
    ],
  });

  return ventas.map((v) => {
    const cantidadGanado = Array.isArray(v.detalle_ganado)
      ? v.detalle_ganado.length
      : 0;

    const cantidadProductos = Array.isArray(v.detalle_productos)
      ? v.detalle_productos.filter((x) => x.producto_id).length
      : 0;

    const cantidadProduccion = Array.isArray(v.detalle_productos)
      ? v.detalle_productos.filter((x) => x.produccion_id).length
      : 0;

    let tipo = 'mixto';

    if (cantidadGanado > 0 && cantidadProductos === 0 && cantidadProduccion === 0) {
      tipo = 'ganado';
    } else if (cantidadGanado === 0 && cantidadProduccion > 0 && cantidadProductos === 0) {
      tipo = 'produccion';
    } else if (cantidadGanado === 0 && cantidadProductos > 0 && cantidadProduccion === 0) {
      tipo = 'producto';
    }

    let desc = v.cliente;

    if (tipo === 'ganado') {
      desc = `${cantidadGanado} animal${cantidadGanado !== 1 ? 'es' : ''}`;
    } else if (tipo === 'produccion') {
      desc = `${cantidadProduccion} registro${cantidadProduccion !== 1 ? 's' : ''} de producción`;
    } else if (tipo === 'producto') {
      desc = `${cantidadProductos} producto${cantidadProductos !== 1 ? 's' : ''}`;
    } else {
      desc = 'Venta mixta';
    }

    return {
      id: v.id,
      tipo,
      label: v.numero_factura || `Venta #${v.id}`,
      desc,
      cliente: v.cliente,
      val: `$${Number(v.total || 0).toLocaleString('es-CO')}`,
    };
  });
}

async function obtenerTransacciones(finca_id, busqueda = '', estado = '') {
  const where = { finca_id };

  if (busqueda?.trim()) {
    where[Op.or] = [
      { cliente: { [Op.like]: `%${busqueda}%` } },
      { numero_factura: { [Op.like]: `%${busqueda}%` } },
    ];
  }

  if (estado?.trim()) {
    where.estado = estado;
  }

  const ventas = await Venta.findAll({
    where,
    order: [['fecha', 'DESC']],
    raw: true,
  });

  return ventas.map((v) => ({
    id: `#V-${v.id}`,
    venta_id: v.id,
    lote: v.numero_factura || `Venta ${v.id}`,
    cliente: v.cliente,
    fecha: v.fecha,
    estado: v.estado || 'Pendiente',
    estadoKey: (v.estado || 'Pendiente').toLowerCase(),
    monto: `$${Number(v.total || 0).toLocaleString('es-CO')}`,
    avatarSeed: (v.cliente || 'CL').substring(0, 2).toUpperCase(),
  }));
}

async function obtenerTransaccionPorId(id, finca_id) {
  return await Venta.findOne({
    where: { id, finca_id },
    include: [
      {
        model: DetalleVentaGanado,
        as: 'detalle_ganado',
        include: [
          {
            model: Ganado,
            as: 'ganado',
            attributes: ['id', 'codigo', 'nombre', 'categoria', 'raza'],
          },
        ],
      },
      {
        model: DetalleVentaProducto,
        as: 'detalle_productos',
        include: [
          {
            model: Producto,
            as: 'producto',
            attributes: ['id', 'nombre', 'tipo'],
            required: false,
          },
          {
            model: Produccion,
            as: 'produccion',
            attributes: ['id', 'fecha'],
            required: false,
          },
        ],
      },
    ],
  });
}

async function obtenerVenta(id, finca_id) {
  const item = await Venta.findOne({
    where: { id, finca_id },
    include: [
      {
        model: DetalleVentaGanado,
        as: 'detalle_ganado',
        include: [
          {
            model: Ganado,
            as: 'ganado',
            attributes: ['id', 'codigo', 'nombre'],
          },
        ],
      },
      {
        model: DetalleVentaProducto,
        as: 'detalle_productos',
        include: [
          {
            model: Producto,
            as: 'producto',
            required: false,
          },
          {
            model: Produccion,
            as: 'produccion',
            required: false,
          },
        ],
      },
    ],
  });

  if (!item) return null;

  const itemsGanado = (item.detalle_ganado || []).map((g) => ({
    tempId: crypto.randomUUID(),
    tipo: 'ganado',
    codigo: g.ganado?.codigo || '',
    precio: Number(g.precio || 0),
  }));

  const itemsProductos = (item.detalle_productos || []).map((p) => {
    if (p.producto_id) {
      return {
        tempId: crypto.randomUUID(),
        tipo: 'producto',
        ref_id: p.producto_id,
        cantidad: Number(p.cantidad || 0),
        precio_unitario: Number(p.precio_unitario || 0),
      };
    }

    return {
      tempId: crypto.randomUUID(),
      tipo: 'produccion',
      ref_id: p.produccion_id,
      cantidad: Number(p.cantidad || 0),
      precio_unitario: Number(p.precio_unitario || 0),
    };
  });

  return {
    venta_id: item.id,
    id: item.numero_factura || `FV-${String(item.id).padStart(5, '0')}`,
    cliente: item.cliente || '',
    fechaISO: item.fecha || '',
    estado: item.estado || 'Pendiente',
    items: [...itemsGanado, ...itemsProductos],
    total: Number(item.total || 0),
  };
}

async function eliminarVenta(id, finca_id) {
  return sequelize.transaction(async (t) => {
    const venta = await Venta.findOne({
      where: { id, finca_id },
      transaction: t,
    });

    if (!venta) return null;

    const detallesGanado = await DetalleVentaGanado.findAll({
      where: { venta_id: id },
      transaction: t,
    });

    const ganadoIds = detallesGanado.map((d) => d.ganado_id);

    await DetalleVentaGanado.destroy({
      where: { venta_id: id },
      transaction: t,
    });

    await DetalleVentaProducto.destroy({
      where: { venta_id: id },
      transaction: t,
    });

    await venta.destroy({ transaction: t });

    for (const ganadoId of ganadoIds) {
      const vendidoEnOtraVenta = await DetalleVentaGanado.findOne({
        where: { ganado_id: ganadoId },
        include: [
          {
            model: Venta,
            as: 'venta',
            where: { finca_id, estado: 'Completado' },
            required: true,
          },
        ],
        transaction: t,
      });

      if (!vendidoEnOtraVenta) {
        await Ganado.update(
          { estado_comercial: 'Disponible' },
          {
            where: { id: ganadoId, finca_id },
            transaction: t,
          }
        );
      }
    }

    return true;
  });
}

module.exports = {
  crearVenta,
  actualizarVentaCompleta,
  obtenerKPIs,
  obtenerResumenHero,
  obtenerCrecimiento,
  obtenerLiquidacion,
  obtenerTransacciones,
  obtenerTransaccionPorId,
  obtenerVenta,
  eliminarVenta,
};