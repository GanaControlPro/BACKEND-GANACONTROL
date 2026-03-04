const Joi = require('joi');

const crearVentaSchema = Joi.object({
  cliente: Joi.string().max(150).required(),
  fecha: Joi.string().required(),

  ganadoItems: Joi.array().items(Joi.object({
    ganado_id: Joi.number().integer().required(),
    precio: Joi.number().positive().required()
  })).default([]),

  productoItems: Joi.array().items(Joi.object({
    producto_id: Joi.number().integer().required(),
    cantidad: Joi.number().positive().required(),
    precio_unitario: Joi.number().positive().required()
  })).default([]),

  produccionItems: Joi.array().items(Joi.object({
    produccion_id: Joi.number().integer().required(),
    cantidad: Joi.number().positive().required(),
    precio_unitario: Joi.number().positive().required()
  })).default([])
}).custom((value, helpers) => {
  const totalItems = (value.ganadoItems?.length || 0) + (value.productoItems?.length || 0) + (value.produccionItems?.length || 0);
  if (totalItems === 0) return helpers.error('any.custom', { message: 'Debe enviar al menos un item de venta' });
  return value;
}, 'items check');

module.exports = { crearVentaSchema };