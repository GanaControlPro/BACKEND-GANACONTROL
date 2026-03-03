const Joi = require('joi');
const { crearVenta } = require('../services/ventas.service');
const { Venta, DetalleVentaGanado, DetalleVentaProducto } = require('../models');

const schema = Joi.object({
  cliente: Joi.string().max(150).required(),
  fecha: Joi.string().required(),
  ganadoItems: Joi.array().items(Joi.object({
    ganado_id: Joi.number().integer().required(),
    precio: Joi.number().required()
  })).default([]),
  productoItems: Joi.array().items(Joi.object({
    producto_id: Joi.number().integer().required(),
    cantidad: Joi.number().required(),
    precio_unitario: Joi.number().required()
  })).default([]),
  produccionItems: Joi.array().items(Joi.object({
    produccion_id: Joi.number().integer().required(),
    cantidad: Joi.number().required(),
    precio_unitario: Joi.number().required()
  })).default([])
});

async function crear(req, res, next) {
  try {
    const body = await schema.validateAsync(req.body, { abortEarly: false });
    const venta = await crearVenta({ finca_id: req.user.finca_id, ...body });
    res.status(201).json(venta);
  } catch (e) { next(e); }
}

async function listar(req, res, next) {
  try {
    const rows = await Venta.findAll({ where: { finca_id: req.user.finca_id }, order: [['id', 'DESC']] });
    res.json(rows);
  } catch (e) { next(e); }
}

async function detalle(req, res, next) {
  try {
    const id = Number(req.params.id);
    const venta = await Venta.findOne({ where: { id, finca_id: req.user.finca_id } });
    if (!venta) return res.status(404).json({ mensaje: 'No encontrada' });

    const ganado = await DetalleVentaGanado.findAll({ where: { venta_id: id } });
    const productos = await DetalleVentaProducto.findAll({ where: { venta_id: id } });

    res.json({ venta, ganado, productos });
  } catch (e) { next(e); }
}

module.exports = { crear, listar, detalle };