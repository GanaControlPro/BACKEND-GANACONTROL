const { crearVenta } = require('../services/ventas.service');
const { ok, fail } = require('../utils/response');
const { Venta, DetalleVentaGanado, DetalleVentaProducto } = require('../models');

function requireUser(req, res) {
  if (!req.user || !req.user.finca_id) {
    fail(res, { code: 401, mensaje: 'No autorizado: falta usuario/finca' });
    return false;
  }
  return true;
}

async function crear(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    if (!req.body || Object.keys(req.body).length === 0) {
      return fail(res, { code: 400, mensaje: 'El body es obligatorio' });
    }

    const venta = await crearVenta({
      finca_id: req.user.finca_id,
      ...req.body,
    });

    return ok(res, { code: 201, mensaje: 'Venta creada', data: venta });
  } catch (e) {
    console.error('Ventas.crear:', e);

    // Si el service lanza errores controlados (ej: stock insuficiente / ganado no existe)
    // puedes lanzar e.status / e.code desde el service. Esto lo respeta:
    const code = e?.status || e?.code;
    if (code && Number(code) >= 400 && Number(code) < 600) {
      return fail(res, { code: Number(code), mensaje: e.message || 'Error' });
    }

    return next(e);
  }
}

async function listar(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const rows = await Venta.findAll({
      where: { finca_id: req.user.finca_id },
      order: [['id', 'DESC']],
    });

    return ok(res, { mensaje: 'Listado OK', data: rows });
  } catch (e) {
    console.error('Ventas.listar:', e);
    return next(e);
  }
}

async function detalle(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const id = Number(req.params.id);
    if (!id || Number.isNaN(id)) {
      return fail(res, { code: 400, mensaje: 'El parámetro id es inválido' });
    }

    const venta = await Venta.findOne({
      where: { id, finca_id: req.user.finca_id },
    });

    if (!venta) return fail(res, { code: 404, mensaje: 'No encontrada' });

    // OJO: si tus tablas de detalle tienen finca_id, agrégalo también para máxima seguridad:
    // where: { venta_id: id, finca_id: req.user.finca_id }
    const ganado = await DetalleVentaGanado.findAll({ where: { venta_id: id } });
    const productos = await DetalleVentaProducto.findAll({ where: { venta_id: id } });

    return ok(res, {
      mensaje: 'Detalle OK',
      data: { venta, ganado, productos },
    });
  } catch (e) {
    console.error('Ventas.detalle:', e);
    return next(e);
  }
}

module.exports = { crear, listar, detalle };