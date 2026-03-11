const { LogActividad } = require('../models');

async function registrarActividad({
  usuarioId = null,
  modulo,
  accion,
  descripcion = null,
  req = null
}) {
  try {
    await LogActividad.create({
      usuario_id: usuarioId,
      modulo,
      accion,
      descripcion,
      ip: req?.ip || req?.headers['x-forwarded-for'] || null,
      user_agent: req?.get?.('user-agent') || null,
      metodo_http: req?.method || null,
      ruta: req?.originalUrl || null
    });
  } catch (error) {
    console.error('Error registrando actividad:', error.message);
  }
}

module.exports = {
  registrarActividad
};