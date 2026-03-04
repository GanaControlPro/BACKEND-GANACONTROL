const jwt = require('jsonwebtoken');
const { fail } = require('../utils/response');

function authJwt(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) return fail(res, { code: 401, mensaje: 'Token requerido' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, finca_id, rol }
    return next();
  } catch {
    return fail(res, { code: 401, mensaje: 'Token inválido' });
  }
}

module.exports = { authJwt };