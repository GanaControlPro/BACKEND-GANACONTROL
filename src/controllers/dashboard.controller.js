const { Op, fn, col } = require('sequelize');
const {
  sequelize,
  Usuario,
  Ganado,
  Producto,
  Potrero,
  Venta,
  Produccion,
  Sesion,
  EventoSanitario
} = require('../models');
const { ok } = require('../utils/response');

function getInicioMes() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
}

function getFinMes() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
}

async function resumen(req, res, next) {
  try {
    const finca_id = req.user?.finca_id;
    const inicioMes = getInicioMes();
    const finMes = getFinMes();
    const hoy = new Date();
    const en7Dias = new Date();
    en7Dias.setDate(hoy.getDate() + 7);

    const [
      totalGanado,
      totalVendidoMes,
      totalEventosMes,
      productosActivos,
      eventosProximos
    ] = await Promise.all([
      Ganado.count({
        where: { finca_id }
      }),

      Venta.sum('total', {
        where: {
          finca_id,
          fecha: {
            [Op.between]: [inicioMes, finMes]
          }
        }
      }),

      EventoSanitario.count({
        where: {
          fecha: {
            [Op.between]: [inicioMes, finMes]
          }
        },
        include: [
          {
            model: Ganado,
            as: 'ganado',
            attributes: [],
            required: true,
            where: { finca_id }
          }
        ]
      }),

      Producto.findAll({
        where: {
          finca_id,
          estado: 'Activo'
        },
        attributes: ['cantidad_actual', 'cantidad_min']
      }),

      EventoSanitario.count({
        where: {
          fecha: {
            [Op.between]: [hoy, en7Dias]
          }
        },
        include: [
          {
            model: Ganado,
            as: 'ganado',
            attributes: [],
            required: true,
            where: { finca_id }
          }
        ]
      })
    ]);

    const totalStockBajo = productosActivos.filter(
      (p) => Number(p.cantidad_actual) <= Number(p.cantidad_min)
    ).length;

    const alertasActivas = totalStockBajo + eventosProximos;

    const tasaVacunacion = totalEventosMes > 0 ? 100 : 0;

    return ok(
      res,
      'Resumen del dashboard obtenido correctamente',
      {
        kpis: {
          ganadoTotal: {
            label: 'Ganado Total',
            value: totalGanado,
            sub: 'Animales registrados actualmente',
            trend: 'up',
            barPct: totalGanado > 0 ? 85 : 0
          },
          alertasActivas: {
            label: 'Alertas Activas',
            value: alertasActivas,
            sub: 'Requieren atención',
            trend: alertasActivas > 0 ? 'down' : 'up',
            barPct: Math.min(alertasActivas * 20, 100)
          },
          ingresosMes: {
            label: 'Ingresos del mes',
            value: Number(totalVendidoMes || 0),
            sub: 'Ventas registradas en el mes actual',
            trend: 'up',
            barPct: totalVendidoMes > 0 ? 72 : 0
          },
          tasaVacunacion: {
            label: 'Tasa Vacunación',
            value: tasaVacunacion,
            sub: totalEventosMes > 0
              ? `${totalEventosMes} eventos sanitarios del mes`
              : 'Sin eventos registrados este mes',
            trend: 'up',
            barPct: tasaVacunacion
          }
        }
      },
      200
    );
  } catch (error) {
    console.error('Dashboard.resumen ERROR REAL:', error);
    return res.status(500).json({
      ok: false,
      mensaje: error.message || 'Error en el servidor',
      data: null,
      errores: null
    });
  }
}

async function ventasMes(req, res, next) {
  try {
    const finca_id = req.user?.finca_id;
    const inicioMes = getInicioMes();
    const finMes = getFinMes();

    const ventas = await Venta.findAll({
      attributes: [
        'fecha',
        [fn('COUNT', col('id')), 'cantidad_ventas'],
        [fn('SUM', col('total')), 'total_vendido']
      ],
      where: {
        finca_id,
        fecha: {
          [Op.between]: [inicioMes, finMes]
        }
      },
      group: ['fecha'],
      order: [['fecha', 'ASC']]
    });

    const totalVentasMes = await Venta.count({
      where: {
        finca_id,
        fecha: {
          [Op.between]: [inicioMes, finMes]
        }
      }
    });

    const totalVendidoMes = await Venta.sum('total', {
      where: {
        finca_id,
        fecha: {
          [Op.between]: [inicioMes, finMes]
        }
      }
    });

    const promedioVenta =
      totalVentasMes > 0
        ? Number(totalVendidoMes || 0) / totalVentasMes
        : 0;

    return ok(
      res,
      'Métricas de ventas del mes obtenidas correctamente',
      {
        periodo: {
          inicioMes,
          finMes
        },
        resumen: {
          totalVentasMes,
          totalVendidoMes: Number(totalVendidoMes || 0),
          promedioVenta
        },
        ventasPorDia: ventas.map((v) => ({
          fecha: v.fecha,
          cantidadVentas: Number(v.get('cantidad_ventas') || 0),
          totalVendido: Number(v.get('total_vendido') || 0)
        }))
      },
      200
    );
  } catch (error) {
    console.error('Dashboard.ventasMes:', error);
    return next(error);
  }
}

async function produccionMes(req, res, next) {
  try {
    const finca_id = req.user?.finca_id;
    const inicioMes = getInicioMes();
    const finMes = getFinMes();

    const produccionPorDia = await Produccion.findAll({
      attributes: [
        'fecha',
        [fn('COUNT', col('id')), 'cantidad_registros'],
        [fn('SUM', col('cantidad')), 'total_producido']
      ],
      where: {
        finca_id,
        fecha: {
          [Op.between]: [inicioMes, finMes]
        }
      },
      group: ['fecha'],
      order: [['fecha', 'ASC']]
    });

    const produccionPorTipo = await Produccion.findAll({
      attributes: [
        'tipo',
        [fn('COUNT', col('id')), 'cantidad_registros'],
        [fn('SUM', col('cantidad')), 'total_producido']
      ],
      where: {
        finca_id,
        fecha: {
          [Op.between]: [inicioMes, finMes]
        }
      },
      group: ['tipo'],
      order: [['tipo', 'ASC']]
    });

    const totalRegistrosMes = await Produccion.count({
      where: {
        finca_id,
        fecha: {
          [Op.between]: [inicioMes, finMes]
        }
      }
    });

    const totalProduccionMes = await Produccion.sum('cantidad', {
      where: {
        finca_id,
        fecha: {
          [Op.between]: [inicioMes, finMes]
        }
      }
    });

    const promedioProduccion = totalRegistrosMes > 0
      ? Number(totalProduccionMes || 0) / totalRegistrosMes
      : 0;

    return ok(res, 'Métricas de producción del mes obtenidas correctamente', {
      periodo: {
        inicioMes,
        finMes
      },
      resumen: {
        totalRegistrosMes,
        totalProduccionMes: Number(totalProduccionMes || 0),
        promedioProduccion
      },
      produccionPorDia: produccionPorDia.map((p) => ({
        fecha: p.fecha,
        cantidadRegistros: Number(p.get('cantidad_registros') || 0),
        totalProducido: Number(p.get('total_producido') || 0)
      })),
      produccionPorTipo: produccionPorTipo.map((p) => ({
        tipo: p.tipo,
        cantidadRegistros: Number(p.get('cantidad_registros') || 0),
        totalProducido: Number(p.get('total_producido') || 0)
      }))
    }, 200);
  } catch (error) {
    console.error('Dashboard.produccionMes:', error);
    return next(error);
  }
}

async function stockBajo(req, res, next) {
  try {
    const finca_id = req.user?.finca_id;

    const productosActivos = await Producto.findAll({
      where: {
        finca_id,
        estado: 'Activo'
      },
      attributes: [
        'id',
        'nombre',
        'tipo',
        'categoria',
        'unidad',
        'cantidad_actual',
        'cantidad_min',
        'estado'
      ],
      order: [['nombre', 'ASC']]
    });

    const productosCriticos = productosActivos
      .filter((p) => Number(p.cantidad_actual) <= Number(p.cantidad_min))
      .map((p) => {
        const actual = Number(p.cantidad_actual || 0);
        const minimo = Number(p.cantidad_min || 0);

        let nivelAlerta = 'Normal';

        if (actual <= 0) {
          nivelAlerta = 'Agotado';
        } else if (actual <= minimo * 0.5) {
          nivelAlerta = 'Crítico';
        } else if (actual <= minimo) {
          nivelAlerta = 'Bajo';
        }

        return {
          id: p.id,
          nombre: p.nombre,
          tipo: p.tipo,
          categoria: p.categoria,
          unidad: p.unidad,
          cantidadActual: actual,
          cantidadMinima: minimo,
          estado: p.estado,
          nivelAlerta
        };
      });

    const totalProductosActivos = productosActivos.length;
    const totalStockBajo = productosCriticos.length;
    const totalAgotados = productosCriticos.filter((p) => p.cantidadActual <= 0).length;

    return ok(res, 'Productos con stock bajo obtenidos correctamente', {
      resumen: {
        totalProductosActivos,
        totalStockBajo,
        totalAgotados
      },
      productos: productosCriticos
    }, 200);
  } catch (error) {
    console.error('Dashboard.stockBajo:', error);
    return next(error);
  }
}

async function alertas(req, res, next) {
  try {
    const finca_id = req.user?.finca_id;
    const hoy = new Date();
    const en7Dias = new Date();
    en7Dias.setDate(hoy.getDate() + 7);

    const productosActivos = await Producto.findAll({
      where: {
        finca_id,
        estado: 'Activo'
      },
      attributes: [
        'id',
        'nombre',
        'cantidad_actual',
        'cantidad_min'
      ],
      order: [['cantidad_actual', 'ASC']]
    });

    const productosCriticos = productosActivos.filter(
      (p) => Number(p.cantidad_actual) <= Number(p.cantidad_min)
    );

    const eventosProximos = await EventoSanitario.count({
      where: {
        fecha: {
          [Op.between]: [hoy, en7Dias]
        }
      },
      include: [
        {
          model: Ganado,
          as: 'ganado',
          attributes: [],
          required: true,
          where: { finca_id }
        }
      ]
    });

    const alertas = [];

    if (productosCriticos.length > 0) {
      const nombres = productosCriticos
        .slice(0, 2)
        .map((p) => p.nombre)
        .join(' y ');

      alertas.push({
        tipo: 'warn',
        titulo: 'Stock bajo',
        desc: `${nombres} por debajo del mínimo.`,
        href: '/inventario'
      });
    }

    if (eventosProximos > 0) {
      alertas.push({
        tipo: 'info',
        titulo: 'Vacunaciones pendientes',
        desc: `${eventosProximos} eventos sanitarios próximos por atender.`,
        href: '/eventos'
      });
    }

    if (alertas.length === 0) {
      alertas.push({
        tipo: 'ok',
        titulo: 'Todo en orden',
        desc: 'No hay alertas activas por el momento.',
        href: '/dashboard'
      });
    }

    return ok(res, 'Alertas del dashboard obtenidas correctamente', alertas, 200);
  } catch (error) {
    console.error('Dashboard.alertas ERROR REAL:', error);
    return res.status(500).json({
      ok: false,
      mensaje: error.message || 'Error en el servidor',
      data: null,
      errores: null
    });
  }
}

module.exports = {
  resumen,
  ventasMes,
  produccionMes,
  stockBajo,
  alertas
};