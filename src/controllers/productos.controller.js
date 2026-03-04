const { Producto, MovimientoProducto } = require('../models');
const { ok } = require('../utils/response');

async function listar(req, res, next) {
  try {
    const rows = await Producto.findAll({ where: { finca_id: req.user.finca_id } });
    return ok(res, { data: rows });
  } catch (e) { next(e); }
}

async function crear(req, res, next) {
  try {
    const row = await Producto.create({ ...req.body, finca_id: req.user.finca_id });
    return ok(res, { code: 201, mensaje: 'Producto creado', data: row });
  } catch (e) { next(e); }
}

async function movimiento(req, res, next) {
  try {
    const mov = await MovimientoProducto.create(req.body);
    return ok(res, { code: 201, mensaje: 'Movimiento creado', data: mov });
  } catch (e) { next(e); }
}

module.exports = { listar, crear, movimiento };