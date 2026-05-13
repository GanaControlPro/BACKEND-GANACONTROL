const { fail } = require("../utils/response");
const { verifyAccessToken } = require("../utils/token");
const { Usuario, Rol, Permiso } = require("../models");

async function authJwt(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return fail(res, "Token requerido", null, 401);
  }

  try {
    const payload = verifyAccessToken(token);

    if (!payload?.id) {
      return fail(res, "Token inválido", null, 401);
    }

    const usuario = await Usuario.findOne({
      where: {
        id: payload.id,
        activo: true,
      },
      attributes: [
        "id",
        "finca_id",
        "rol_id",
        "nombres",
        "apellidos",
        "correo",
        "activo",
      ],
      include: [
        {
          model: Rol,
          as: "rol",
          attributes: ["id", "nombre"],
          include: [
            {
              model: Permiso,
              as: "permisos",
              attributes: ["id", "codigo", "nombre"],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    if (!usuario) {
      return fail(res, "Usuario no autorizado", null, 401);
    }

    const permisos = Array.isArray(usuario?.rol?.permisos)
      ? usuario.rol.permisos.map((p) => p.codigo).filter(Boolean)
      : [];

    req.user = {
      id: usuario.id,
      finca_id: usuario.finca_id,
      rol_id: usuario.rol_id,
      rol: usuario.rol?.nombre || null,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      permisos,
    };

    return next();
  } catch (error) {
    console.error("Error en authJwt:", error.message);

    if (error.name === "TokenExpiredError") {
      return fail(res, "Token expirado", null, 401);
    }

    return fail(res, "Token inválido", null, 401);
  }
}

module.exports = { authJwt };