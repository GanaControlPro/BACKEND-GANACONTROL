const { fail } = require('../utils/response');
const { verifyAccessToken } = require('../utils/token');
const { Usuario, Rol, Permiso } = require('../models');

async function authJwt(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return fail(res, 'Token requerido', null, 401);
  }

  try {
    const payload = verifyAccessToken(token);

    const user = await Usuario.findOne({
      where: {
        id: payload.id,
        activo: true
      },
      include: [
        {
          model: Rol,
          as: 'rol',
          include: [
            {
              model: Permiso,
              as: 'permisos',
              through: { attributes: [] }
            }
          ]
        }
      ]
    });

    if (!user) {
      return fail(res, 'Usuario no autorizado', null, 401);
    }

    req.user = {
      id: user.id,
      finca_id: user.finca_id,
      rol: user.rol ? user.rol.nombre : null,
      rol_id: user.rol_id,
      permisos: user.rol && user.rol.permisos
        ? user.rol.permisos.map((p) => p.codigo)
        : []
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return fail(res, 'Token expirado', null, 401);
    }

    return fail(res, 'Token inválido', null, 401);
  }
}

module.exports = { authJwt };