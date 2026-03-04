const { crearVenta } = require('../services/ventas.service');
const { ok } = require('../utils/response');

async function crear(req, res, next) {
  try {
    const venta = await crearVenta({ finca_id: req.user.finca_id, ...req.body });
    return ok(res, { code: 201, mensaje: 'Venta creada', data: venta });
  } catch (e) { next(e); }
}

async function listar(req, res, next) {
  try {
    const { Venta } = require('../models');
    const rows = await Venta.findAll({ where: { finca_id: req.user.finca_id }, order: [['id','DESC']] });
    return ok(res, { data: rows });
  } catch (e) { next(e); }
}

async function detalle(req, res, next) {
  try {
    const { Venta, DetalleVentaGanado, DetalleVentaProducto } = require('../models');
    const id = Number(req.params.id);

    const venta = await Venta.findOne({ where: { id, finca_id: req.user.finca_id } });
    if (!venta) return require('../utils/response').fail(res, { code: 404, mensaje: 'No encontrada' });

    const ganado = await DetalleVentaGanado.findAll({ where: { venta_id: id } });
    const productos = await DetalleVentaProducto.findAll({ where: { venta_id: id } });

    return ok(res, { data: { venta, ganado, productos } });
  } catch (e) { next(e); }
}

module.exports = { crear, listar, detalle };