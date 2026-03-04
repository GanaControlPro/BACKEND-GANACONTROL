const { fail } = require('../utils/response');

function authorize(rolesPermitidos = []) {
  return (req, res, next) => {
    const rol = req.user?.rol;

    if (!rol) return fail(res, { code: 401, mensaje: 'No autenticado' });

    if (rolesPermitidos.length === 0) return next(); // si no pasas roles, no restringe

    if (!rolesPermitidos.includes(rol)) {
      return fail(res, { code: 403, mensaje: 'No autorizado para esta acción' });
    }

    return next();
  };
}

module.exports = { authorize };