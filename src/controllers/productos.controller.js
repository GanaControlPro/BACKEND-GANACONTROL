const { Producto, MovimientoProducto } = require('../models');

async function listar(req, res, next) {
  try {
    const rows = await Producto.findAll({ where: { finca_id: req.user.finca_id } });
    res.json(rows);
  } catch (e) { next(e); }
}

async function crear(req, res, next) {
  try {
    const row = await Producto.create({ ...req.body, finca_id: req.user.finca_id });
    res.status(201).json(row);
  } catch (e) { next(e); }
}

async function movimiento(req, res, next) {
  try {
    const { producto_id, tipo, cantidad } = req.body;
    // el trigger actualiza cantidad_actual
    const mov = await MovimientoProducto.create({ producto_id, tipo, cantidad });
    res.status(201).json(mov);
  } catch (e) { next(e); }
}

module.exports = { listar, crear, movimiento };