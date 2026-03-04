const { fail } = require('../utils/response');

function errorHandler(err, req, res, next) {
  // Joi validation errors
  if (err && err.isJoi) {
    const errores = err.details?.map(d => ({
      campo: d.path?.join('.') || null,
      mensaje: d.message
    })) || [];
    return fail(res, { code: 400, mensaje: 'Validación fallida', errores });
  }

  // Sequelize unique constraint
  if (err?.name === 'SequelizeUniqueConstraintError') {
    const errores = err.errors?.map(e => ({
      campo: e.path || null,
      mensaje: e.message
    })) || [];
    return fail(res, { code: 409, mensaje: 'Registro duplicado', errores });
  }

  // Sequelize foreign key constraint (FK)
  if (err?.name === 'SequelizeForeignKeyConstraintError') {
    return fail(res, { code: 409, mensaje: 'Conflicto de relación (FK)', errores: [{ mensaje: err.message }] });
  }

  // Sequelize validation errors
  if (err?.name === 'SequelizeValidationError') {
    const errores = err.errors?.map(e => ({
      campo: e.path || null,
      mensaje: e.message
    })) || [];
    return fail(res, { code: 400, mensaje: 'Validación de modelo fallida', errores });
  }

  console.error('❌ Error:', err);
  return fail(res, { code: 500, mensaje: 'Error en el servidor', errores: [{ mensaje: 'Internal Server Error' }] });
}

module.exports = { errorHandler };