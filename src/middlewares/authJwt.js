const { fail } = require('../utils/response');
const { verifyAccessToken } = require('../utils/token');

function authJwt(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return fail(res, 'Token requerido', null, 401);
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return fail(res, 'Token expirado', null, 401);
    }

    return fail(res, 'Token inválido', null, 401);
  }
}

module.exports = { authJwt };