function errorHandler(err, req, res, next) {
  // Joi
  if (err && err.isJoi) {
    return res.status(400).json({
      mensaje: 'Validación fallida',
      detalles: err.details?.map(d => d.message) || []
    });
  }

  // Sequelize
  if (err?.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ mensaje: 'Registro duplicado', detalles: err.errors?.map(e => e.message) });
  }

  console.error(err);
  return res.status(500).json({ mensaje: 'Error en el servidor' });
}

module.exports = { errorHandler };