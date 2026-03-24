const Joi = require('joi');

const estadosReproductivosInvalidosParaMacho = ['Preñada', 'Lactando'];

const baseGanadoSchema = Joi.object({
  codigo: Joi.string().max(50).required(),
  nombre: Joi.string().max(100).allow(null, ''),

  sexo: Joi.string().valid('Macho', 'Hembra').required(),

  categoria: Joi.string()
    .valid('Ternero', 'Novillo', 'Vaca', 'Toro', 'Otro')
    .required(),

  raza: Joi.string().max(100).allow(null, ''),
  fecha_nacimiento: Joi.date().allow(null, ''),
  peso_actual: Joi.number().precision(2).min(0).allow(null),

  foto_url: Joi.string().max(255).allow(null, ''),

  estado_general: Joi.string().valid('Activo', 'Inactivo').optional(),
  estado_biologico: Joi.string().valid('Vivo', 'Muerto').optional(),
  estado_comercial: Joi.string().valid('Disponible', 'Vendido', 'Descartado').optional(),

  estado_salud: Joi.string()
    .valid('Sano', 'En observacion', 'Enfermo', 'En tratamiento', 'Recuperacion')
    .optional(),

  estado_reproductivo: Joi.string()
    .valid('No aplica', 'Vacia', 'Servida', 'Preñada', 'Proxima al parto', 'Lactando', 'Seca')
    .optional(),

  fecha_ultimo_parto: Joi.date().allow(null, ''),
  fecha_probable_parto: Joi.date().allow(null, ''),
  numero_partos: Joi.number().integer().min(0).optional(),

  potrero_id: Joi.number().integer().allow(null),
  madre_id: Joi.number().integer().allow(null),
  padre_id: Joi.number().integer().allow(null),

  origen: Joi.string()
    .valid('Nacimiento en finca', 'Compra', 'Traslado', 'Otro')
    .optional(),

  fecha_ingreso: Joi.date().allow(null, ''),

  estado_productivo: Joi.string()
    .valid('Cria', 'Levante', 'Ceba', 'Lechero', 'Reproduccion', 'Descarte')
    .allow(null, ''),

  es_reproductor: Joi.boolean().optional(),

  observaciones: Joi.string().allow(null, '')
}).custom((value, helpers) => {
  if (
    value.sexo === 'Macho' &&
    estadosReproductivosInvalidosParaMacho.includes(value.estado_reproductivo)
  ) {
    return helpers.error('any.invalid', {
      message: 'Un animal macho no puede tener estado reproductivo Preñada o Lactando'
    });
  }

  return value;
});

const crearGanadoSchema = baseGanadoSchema;

const actualizarGanadoSchema = baseGanadoSchema.fork(
  ['codigo', 'sexo', 'categoria'],
  (field) => field.optional()
);

module.exports = {
  crearGanadoSchema,
  actualizarGanadoSchema
};