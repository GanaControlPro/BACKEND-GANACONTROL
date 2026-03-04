const Joi = require('joi');

const crearProductoSchema = Joi.object({
  tipo: Joi.string().valid('Alimento','Medicamento','Insumo','Herramienta','Equipo','Otro').required(),
  nombre: Joi.string().max(150).required(),
  categoria: Joi.string().max(100).allow(null, ''),
  unidad: Joi.string().max(30).allow(null, ''),
  cantidad_actual: Joi.number().precision(2).optional(),
  cantidad_min: Joi.number().precision(2).optional(),
  estado: Joi.string().valid('Operativo','En_Reparacion','Dañado','Baja').optional(),
  activo: Joi.boolean().optional()
});

const movimientoProductoSchema = Joi.object({
  producto_id: Joi.number().integer().required(),
  tipo: Joi.string().valid('ENTRADA','SALIDA','AJUSTE').required(),
  cantidad: Joi.number().positive().required()
});

module.exports = { crearProductoSchema, movimientoProductoSchema };