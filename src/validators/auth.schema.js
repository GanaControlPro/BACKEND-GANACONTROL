const Joi = require('joi');

/* ===============================
   LOGIN
================================ */
const loginSchema = Joi.object({
  correo: Joi.string()
    .email()
    .trim()
    .lowercase()
    .max(150)
    .required()
    .messages({
      'string.email': 'El correo debe tener un formato válido',
      'string.empty': 'El correo es obligatorio',
      'any.required': 'El correo es obligatorio',
      'string.max': 'El correo no puede superar los 150 caracteres'
    }),

  contrasena: Joi.string()
    .min(6)
    .max(100)
    .required()
    .messages({
      'string.empty': 'La contraseña es obligatoria',
      'string.min': 'La contraseña debe tener mínimo 6 caracteres',
      'string.max': 'La contraseña no puede superar 100 caracteres',
      'any.required': 'La contraseña es obligatoria'
    })
});

/* ===============================
   REFRESH TOKEN
================================ */
const refreshSchema = Joi.object({
  refreshToken: Joi.string()
    .required()
    .messages({
      'string.empty': 'El refresh token es obligatorio',
      'any.required': 'El refresh token es obligatorio'
    })
});


/* ===============================
   LOGOUT
================================ */
const logoutSchema = Joi.object({
  refreshToken: Joi.string()
    .required()
    .messages({
      'string.empty': 'El refresh token es obligatorio',
      'any.required': 'El refresh token es obligatorio'
    })
});


/* ===============================
   GOOGLE LOGIN
================================ */
const googleLoginSchema = Joi.object({
  idToken: Joi.string()
    .required()
    .messages({
      'string.empty': 'El token de Google es obligatorio',
      'any.required': 'El token de Google es obligatorio'
    })
});


/* ===============================
   FORGOT PASSWORD
================================ */
const forgotPasswordSchema = Joi.object({
  correo: Joi.string()
    .email()
    .trim()
    .lowercase()
    .max(150)
    .required()
    .messages({
      'string.email': 'El correo debe tener un formato válido',
      'string.empty': 'El correo es obligatorio',
      'any.required': 'El correo es obligatorio'
    })
});


/* ===============================
   RESET PASSWORD
================================ */
const resetPasswordSchema = Joi.object({
  token: Joi.string()
    .required()
    .messages({
      'string.empty': 'El token es obligatorio',
      'any.required': 'El token es obligatorio'
    }),

  nuevaContrasena: Joi.string()
    .min(6)
    .max(100)
    .required()
    .messages({
      'string.empty': 'La nueva contraseña es obligatoria',
      'string.min': 'La nueva contraseña debe tener mínimo 6 caracteres',
      'string.max': 'La nueva contraseña no puede superar 100 caracteres',
      'any.required': 'La nueva contraseña es obligatoria'
    })
});


/* ===============================
   EXPORTS
================================ */
module.exports = {
  loginSchema,
  refreshSchema,
  logoutSchema,
  googleLoginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
};