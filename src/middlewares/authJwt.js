const jwt = require('jsonwebtoken');
const { fail } = require('../utils/response');

function authJwt(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return fail(res, { code: 401, mensaje: 'Token requerido' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Payload típico:
    // { id, finca_id, rol }
    req.user = payload;

    next();
  } catch (error) {

    if (error.name === 'TokenExpiredError') {
      return fail(res, { code: 401, mensaje: 'Token expirado' });
    }

    return fail(res, { code: 401, mensaje: 'Token inválido' });
  }
}

module.exports = { authJwt };