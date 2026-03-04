const Joi = require('joi');

const loginSchema = Joi.object({
  correo: Joi.string().email().required(),
  contrasena: Joi.string().min(4).max(100).required()
});

module.exports = { loginSchema };
