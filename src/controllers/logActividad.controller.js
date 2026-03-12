const { Op } = require('sequelize');
const { LogActividad, Usuario } = require('../models');
const { ok, fail } = require('../utils/response');

function parsePositiveInt(value, defaultValue) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : defaultValue;
}

async function listarLogs(req, res, next) {
  try {
    const page = parsePositiveInt(req.query.page, 1);
    const limit = parsePositiveInt(req.query.limit, 10);
    const offset = (page - 1) * limit;

    const { modulo, accion, fechaDesde, fechaHasta, usuario_id } = req.query;

    const where = {};

    if (modulo) {
      where.modulo = modulo;
    }

    if (accion) {
      where.accion = accion;
    }

    if (usuario_id) {
      where.usuario_id = Number(usuario_id);
    }

    if (fechaDesde || fechaHasta) {
      where.fecha = {};

      if (fechaDesde) {
        where.fecha[Op.gte] = new Date(`${fechaDesde}T00:00:00`);
      }

      if (fechaHasta) {
        where.fecha[Op.lte] = new Date(`${fechaHasta}T23:59:59`);
      }
    }

    const { count, rows } = await LogActividad.findAndCountAll({
      where,
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombres', 'apellidos', 'correo']
        }
      ],
      order: [['fecha', 'DESC']],
      limit,
      offset
    });

    return ok(res, 'Logs obtenidos correctamente', {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      items: rows
    }, 200);
  } catch (error) {
    console.error('LogActividad.listarLogs:', error);
    return next(error);
  }
}

async function obtenerLogPorId(req, res, next) {
  try {
    const { id } = req.params;

    const log = await LogActividad.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombres', 'apellidos', 'correo']
        }
      ]
    });

    if (!log) {
      return fail(res, 'Log no encontrado', null, 404);
    }

    return ok(res, 'Log obtenido correctamente', log, 200);
  } catch (error) {
    console.error('LogActividad.obtenerLogPorId:', error);
    return next(error);
  }
}

module.exports = {
  listarLogs,
  obtenerLogPorId
};