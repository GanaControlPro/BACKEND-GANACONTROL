const rateLimit = require('express-rate-limit');

function buildLimiter({ windowMs, max, message }) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      ok: false,
      mensaje: message,
      data: null,
      errores: null
    }
  });
}

const loginLimiter = buildLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 5,
  message: 'Demasiados intentos de inicio de sesión. Intenta de nuevo en 5 minutos.'
});

const refreshLimiter = buildLimiter({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: 'Demasiadas solicitudes de renovación de token. Intenta más tarde.'
});

const forgotPasswordLimiter = buildLimiter({
  windowMs: 30 * 60 * 1000,
  max: 3,
  message: 'Demasiadas solicitudes de recuperación de contraseña. Intenta más tarde.'
});

const resetPasswordLimiter = buildLimiter({
  windowMs: 30 * 60 * 1000,
  max: 5,
  message: 'Demasiados intentos de restablecimiento de contraseña. Intenta más tarde.'
});

const googleLoginLimiter = buildLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Demasiados intentos de inicio de sesión con Google. Intenta más tarde.'
});

module.exports = {
  loginLimiter,
  refreshLimiter,
  forgotPasswordLimiter,
  resetPasswordLimiter,
  googleLoginLimiter
};