const { EventoSanitario, Ganado, Usuario, Producto, sequelize } = require('../models');
const { Op } = require('sequelize');

class EventoSanitarioService {
  async listar(user) {
    return await EventoSanitario.findAll({
      include: [
        {
          model: Ganado,
          as: 'ganado',
          attributes: ['id', 'codigo', 'nombre', 'finca_id'],
          where: { finca_id: user.finca_id }
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombres', 'apellidos', 'correo'],
          required: false
        },
        {
          model: Producto,
          as: 'producto',
          attributes: ['id', 'nombre', 'tipo'],
          required: false
        }
      ],
      order: [['fecha', 'DESC']]
    });
  }

  async obtener(id, user) {
    return await EventoSanitario.findOne({
      where: { id },
      include: [
        {
          model: Ganado,
          as: 'ganado',
          attributes: ['id', 'codigo', 'nombre', 'finca_id'],
          where: { finca_id: user.finca_id }
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombres', 'apellidos', 'correo'],
          required: false
        },
        {
          model: Producto,
          as: 'producto',
          attributes: ['id', 'nombre', 'tipo'],
          required: false
        }
      ]
    });
  }

  async crear(data, user) {
    const ganado = await Ganado.findOne({
      where: {
        id: data.ganado_id,
        finca_id: user.finca_id
      }
    });

    if (!ganado) {
      const error = new Error('El ganado no existe o no pertenece a la finca del usuario');
      error.status = 404;
      throw error;
    }

    const nuevo = await EventoSanitario.create({
      ...data,
      usuario_id: data.usuario_id || user.id
    });

    return await this.obtener(nuevo.id, user);
  }

  async actualizar(id, data, user) {
    const registro = await this.obtener(id, user);
    if (!registro) return null;

    if (data.ganado_id) {
      const ganado = await Ganado.findOne({
        where: {
          id: data.ganado_id,
          finca_id: user.finca_id
        }
      });

      if (!ganado) {
        const error = new Error('El ganado no existe o no pertenece a la finca del usuario');
        error.status = 404;
        throw error;
      }
    }

    await registro.update(data);
    return await this.obtener(id, user);
  }

  async eliminar(id, user) {
    const registro = await this.obtener(id, user);
    if (!registro) return null;

    await registro.destroy();
    return { id: Number(id) };
  }

  async obtenerKpis(user) {
    const eventos = await EventoSanitario.findAll({
      include: [
        {
          model: Ganado,
          as: 'ganado',
          attributes: ['id', 'finca_id'],
          where: { finca_id: user.finca_id }
        }
      ]
    });

    const totalEventos = eventos.length;
    const vacunaciones = eventos.filter(e => e.tipo === 'Vacunacion').length;
    const tratamientos = eventos.filter(e => e.tipo === 'Tratamiento').length;
    const diagnosticos = eventos.filter(
      e => e.tipo === 'Diagnostico' || e.tipo === 'Revision'
    ).length;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const pendientes = eventos.filter((e) => {
      if (!e.proxima_fecha) return false;
      const fecha = new Date(e.proxima_fecha);
      fecha.setHours(0, 0, 0, 0);
      return fecha < hoy;
    }).length;

    const costoTotal = eventos.reduce(
      (acc, e) => acc + Number(e.costo || 0),
      0
    );

    return {
      totalEventos,
      vacunaciones,
      tratamientos,
      diagnosticos,
      pendientes,
      costoTotal
    };
  }

  async obtenerProximos(user) {
  const hoy = new Date().toISOString().split('T')[0];

  const eventos = await EventoSanitario.findAll({
    where: {
      proxima_fecha: {
        [Op.ne]: null,
        [Op.gte]: hoy
      }
    },
    include: [
      {
        model: Ganado,
        as: 'ganado',
        attributes: ['id', 'codigo', 'nombre', 'finca_id'],
        where: { finca_id: user.finca_id }
      },
      {
        model: Usuario,
        as: 'usuario',
        attributes: ['id', 'nombres', 'apellidos', 'correo'],
        required: false
      },
      {
        model: Producto,
        as: 'producto',
        attributes: ['id', 'nombre', 'tipo'],
        required: false
      }
    ],
    order: [['proxima_fecha', 'ASC']],
    limit: 5
  });

  return eventos.map((e) => ({
    id: e.id,
    ganado_id: e.ganado_id,
    animalCod: e.ganado?.codigo || `#${e.ganado_id}`,
    animalNombre: e.ganado?.nombre || '',
    titulo: e.producto?.nombre || e.descripcion || e.tipo,
    tipo: e.tipo,
    fecha: e.proxima_fecha,
    proxima_fecha: e.proxima_fecha
  }));
}

  async obtenerEstatus(user) {
    const totalAnimalesActivos = await Ganado.count({
      where: {
        finca_id: user.finca_id,
        estado_general: 'Activo'
      }
    });

    const vacunados = await EventoSanitario.findAll({
      where: { tipo: 'Vacunacion' },
      include: [
        {
          model: Ganado,
          as: 'ganado',
          attributes: ['id'],
          where: { finca_id: user.finca_id }
        }
      ]
    });

    const animalesVacunadosUnicos = new Set(
      vacunados.map(v => v.ganado_id)
    ).size;

    const seguimientos = await EventoSanitario.findAll({
      where: {
        proxima_fecha: { [Op.ne]: null }
      },
      include: [
        {
          model: Ganado,
          as: 'ganado',
          attributes: ['id'],
          where: { finca_id: user.finca_id }
        }
      ]
    });

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    let alDia = 0;
    let pendientes = 0;

    for (const item of seguimientos) {
      const fecha = new Date(item.proxima_fecha);
      fecha.setHours(0, 0, 0, 0);

      if (fecha >= hoy) alDia++;
      else pendientes++;
    }

    const pctVacunacion = totalAnimalesActivos > 0
      ? Math.round((animalesVacunadosUnicos / totalAnimalesActivos) * 100)
      : 0;

    const totalSeguimientos = seguimientos.length || 1;
    const pctSeguimientos = Math.round((alDia / totalSeguimientos) * 100);
    const pctPendientes = Math.round((pendientes / totalSeguimientos) * 100);

    return [
      { label: 'Vacunación al día', pct: pctVacunacion },
      { label: 'Seguimientos al día', pct: pctSeguimientos },
      { label: 'Pendientes sanitarios', pct: pctPendientes }
    ];
  }

  async obtenerResumen(user) {
    const [
      eventos,
      ganado,
      proximos
    ] = await Promise.all([
      this.listar(user),
      Ganado.findAll({
        where: {
          finca_id: user.finca_id,
          estado_general: 'Activo'
        }
      }),
      this.obtenerProximos(user)
    ]);

    const animalesActivos = ganado.length;

    const animalesVacunadosUnicos = new Set(
      eventos
        .filter(e => e.tipo === 'Vacunacion' && e.ganado_id)
        .map(e => e.ganado_id)
    ).size;

    const porcentajeVacunados = animalesActivos > 0
      ? Math.round((animalesVacunadosUnicos / animalesActivos) * 100)
      : 0;

    const vetsActivos = new Set(
      eventos
        .map(e => {
          const n = [e.usuario?.nombres, e.usuario?.apellidos].filter(Boolean).join(' ');
          return n || null;
        })
        .filter(Boolean)
    ).size;

    const hoyStr = new Date().toISOString().split('T')[0];

    const tratamientosHoy = eventos.filter(
      e => e.tipo === 'Tratamiento' && e.fecha === hoyStr
    ).length;

    const alertasActivas = eventos.filter((e) => {
      if (!e.proxima_fecha) return false;
      return e.proxima_fecha > hoyStr;
    }).length;

    return {
      animalesActivos,
      porcentajeVacunados,
      vetsActivos,
      alertasActivas,
      tratamientosHoy
    };
  }
}

module.exports = new EventoSanitarioService();