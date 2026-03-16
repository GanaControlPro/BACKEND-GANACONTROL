const { fail } = require('../utils/response');

function can(codigoPermiso) {
  return (req, res, next) => {
    if (!req.user) {
      return fail(res, 'No autorizado', null, 401);
    }

    const permisos = req.user.permisos || [];

    if (!permisos.includes(codigoPermiso)) {
      return fail(
        res,
        `No tienes el permiso requerido: ${codigoPermiso}`,
        null,
        403
      );
    }

    next();
  };
}

module.exports = { can };