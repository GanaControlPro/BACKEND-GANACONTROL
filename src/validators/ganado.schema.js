const Joi = require('joi');

const crearGanadoSchema = Joi.object({
  codigo: Joi.string().max(50).required(),
  nombre: Joi.string().max(100).allow(null, ''),
  sexo: Joi.string().valid('Macho', 'Hembra').required(),
  categoria: Joi.string().valid('Ternero','Novillo','Vaca','Toro','Otro').required(),
  raza: Joi.string().max(100).allow(null, ''),
  fecha_nacimiento: Joi.string().allow(null, ''),
  peso_actual: Joi.number().precision(2).allow(null),
  estado_general: Joi.string().valid('Activo','Inactivo').optional(),
  estado_biologico: Joi.string().valid('Vivo','Muerto').optional(),
  estado_comercial: Joi.string().valid('Disponible','Vendido','Descartado').optional(),
  potrero_id: Joi.number().integer().allow(null),
  madre_id: Joi.number().integer().allow(null),
  padre_id: Joi.number().integer().allow(null),
  observaciones: Joi.string().allow(null, '')
});

const actualizarGanadoSchema = crearGanadoSchema.fork(['codigo','sexo','categoria'], (f) => f.optional());

module.exports = { crearGanadoSchema, actualizarGanadoSchema };