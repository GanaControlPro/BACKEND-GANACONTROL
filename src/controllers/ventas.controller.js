const {
  crearVenta,
  actualizarVentaCompleta,
  obtenerKPIs,
  obtenerTransaccionPorId,
  eliminarVenta,
  obtenerResumenHero,
  obtenerCrecimiento,
} = require('../services/ventas.service');

const { ok, fail } = require('../utils/response');
const { Venta } = require('../models');

function requireUser(req, res) {
  if (!req.user || !req.user.finca_id) {
    fail(res, {
      code: 401,
      mensaje: 'No autorizado: falta usuario/finca',
    });
    return false;
  }
  return true;
}

function validarId(id) {
  const num = Number(id);
  return num && !Number.isNaN(num) ? num : null;
}

async function crear(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    if (!req.body || Object.keys(req.body).length === 0) {
      return fail(res, {
        code: 400,
        mensaje: 'El body es obligatorio',
      });
    }

    const venta = await crearVenta({
      finca_id: req.user.finca_id,
      ...req.body,
    });

    return ok(res, {
      code: 201,
      mensaje: 'Venta creada correctamente',
      data: venta,
    });
  } catch (e) {
    console.error('Ventas.crear:', e);

    const code = e?.status || e?.code;
    if (code && Number(code) >= 400 && Number(code) < 600) {
      return fail(res, {
        code: Number(code),
        mensaje: e.message || 'Error al crear la venta',
        errores: e.errores || [],
      });
    }

    return next(e);
  }
}

async function listar(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const rows = await Venta.findAll({
      where: { finca_id: req.user.finca_id },
      order: [['fecha', 'DESC'], ['id', 'DESC']],
    });

    return ok(res, {
      mensaje: 'Listado OK',
      data: rows,
    });
  } catch (e) {
    console.error('Ventas.listar:', e);
    return next(e);
  }
}

async function detalle(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const id = validarId(req.params.id);
    if (!id) {
      return fail(res, {
        code: 400,
        mensaje: 'El parámetro id es inválido',
      });
    }

    const venta = await obtenerTransaccionPorId(id, req.user.finca_id);

    if (!venta) {
      return fail(res, {
        code: 404,
        mensaje: 'Venta no encontrada',
      });
    }

    return ok(res, {
      mensaje: 'Detalle OK',
      data: venta,
    });
  } catch (e) {
    console.error('Ventas.detalle:', e);
    return next(e);
  }
}

const obtenerPorId = detalle;

async function actualizar(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const id = validarId(req.params.id);
    if (!id) {
      return fail(res, {
        code: 400,
        mensaje: 'El parámetro id es inválido',
      });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return fail(res, {
        code: 400,
        mensaje: 'El body es obligatorio',
      });
    }

    const ventaActualizada = await actualizarVentaCompleta(
      id,
      req.user.finca_id,
      req.body
    );

    return ok(res, {
      mensaje: 'Venta actualizada correctamente',
      data: ventaActualizada,
    });
  } catch (e) {
    console.error('Ventas.actualizar:', e);

    const code = e?.status || e?.code;
    if (code && Number(code) >= 400 && Number(code) < 600) {
      return fail(res, {
        code: Number(code),
        mensaje: e.message || 'Error al actualizar la venta',
        errores: e.errores || [],
      });
    }

    return next(e);
  }
}

async function eliminar(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const id = validarId(req.params.id);
    if (!id) {
      return fail(res, {
        code: 400,
        mensaje: 'El parámetro id es inválido',
      });
    }

    const deleted = await eliminarVenta(id, req.user.finca_id);

    if (!deleted) {
      return fail(res, {
        code: 404,
        mensaje: 'Venta no encontrada',
      });
    }

    return ok(res, {
      mensaje: 'Venta eliminada correctamente',
      data: { id },
    });
  } catch (e) {
    console.error('Ventas.eliminar:', e);
    return next(e);
  }
}

async function kpis(req, res) {
  try {
    if (!requireUser(req, res)) return;

    const finca_id = req.user.finca_id;
    const data = await obtenerKPIs(finca_id);

    return res.json({
      ok: true,
      data,
    });
  } catch (e) {
    console.error('Ventas.kpis:', e);

    return res.status(500).json({
      ok: false,
      mensaje: 'Error obteniendo KPIs',
      errores: [],
    });
  }
}

async function resumenHero(req, res) {
  try {
    if (!requireUser(req, res)) return;

    const data = await obtenerResumenHero(req.user.finca_id);

    return res.json({
      ok: true,
      data,
    });
  } catch (e) {
    console.error('Ventas.resumenHero:', e);

    return res.status(500).json({
      ok: false,
      mensaje: 'Error obteniendo resumen hero',
      errores: [],
    });
  }
}

async function crecimiento(req, res) {
  try {
    if (!requireUser(req, res)) return;

    const finca_id = req.user.finca_id;
    const periodosValidos = ['Semana', 'Mes', 'Año'];
    const periodo = periodosValidos.includes(req.query.periodo)
      ? req.query.periodo
      : 'Semana';

    const data = await obtenerCrecimiento(finca_id, periodo);

    return res.json({
      ok: true,
      data,
    });
  } catch (e) {
    console.error('Ventas.crecimiento:', e);

    return res.status(500).json({
      ok: false,
      mensaje: 'Error obteniendo crecimiento',
      errores: [],
    });
  }
}

module.exports = {
  crear,
  listar,
  detalle,
  obtenerPorId,
  actualizar,
  eliminar,
  kpis,
  resumenHero,
  crecimiento,
};