const router = require("express").Router();
const { Rol, Permiso } = require("../models");
const { authJwt } = require("../middlewares/authJwt");
const { can } = require("../middlewares/can");

function formatearRol(rol) {
  return {
    id: rol.id,
    nombre: rol.nombre,
    descripcion: rol.descripcion || rol.desc || "",
    permisos: Array.isArray(rol.permisos)
      ? rol.permisos.map((p) => p.codigo).filter(Boolean)
      : [],
  };
}

router.get("/", authJwt, can("usuarios.ver"), async (req, res, next) => {
  try {
    const roles = await Rol.findAll({
      include: [
        {
          model: Permiso,
          as: "permisos",
          attributes: ["id", "codigo", "nombre", "descripcion"],
          through: { attributes: [] },
        },
      ],
      order: [["id", "ASC"]],
    });

    return res.json({
      ok: true,
      mensaje: "Listado de roles",
      data: roles.map(formatearRol),
      errores: null,
    });
  } catch (e) {
    next(e);
  }
});

router.post("/", authJwt, can("usuarios.crear"), async (req, res, next) => {
  try {
    const { nombre, descripcion, permisos } = req.body;

    const rol = await Rol.create({
      nombre,
      descripcion,
    });

    if (Array.isArray(permisos)) {
      const permisosEncontrados = await Permiso.findAll({
        where: {
          codigo: permisos,
        },
        attributes: ["id"],
      });

      const ids = permisosEncontrados.map((p) => p.id);
      await rol.setPermisos(ids);
    }

    const creado = await Rol.findByPk(rol.id, {
      include: [
        {
          model: Permiso,
          as: "permisos",
          attributes: ["id", "codigo", "nombre", "descripcion"],
          through: { attributes: [] },
        },
      ],
    });

    return res.status(201).json({
      ok: true,
      mensaje: "Rol creado",
      data: formatearRol(creado),
      errores: null,
    });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", authJwt, can("usuarios.editar"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, permisos } = req.body;

    const rol = await Rol.findByPk(id);

    if (!rol) {
      return res.status(404).json({
        ok: false,
        mensaje: "Rol no encontrado",
        data: null,
        errores: null,
      });
    }

    await rol.update({
      ...(nombre !== undefined ? { nombre } : {}),
      ...(descripcion !== undefined ? { descripcion } : {}),
    });

    if (Array.isArray(permisos)) {
      const permisosEncontrados = await Permiso.findAll({
        where: {
          codigo: permisos,
        },
        attributes: ["id"],
      });

      const ids = permisosEncontrados.map((p) => p.id);

      await rol.setPermisos(ids);
    }

    const actualizado = await Rol.findByPk(id, {
      include: [
        {
          model: Permiso,
          as: "permisos",
          attributes: ["id", "codigo", "nombre", "descripcion"],
          through: { attributes: [] },
        },
      ],
    });

    return res.json({
      ok: true,
      mensaje: "Rol actualizado",
      data: formatearRol(actualizado),
      errores: null,
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", authJwt, can("usuarios.eliminar"), async (req, res, next) => {
  try {
    const { id } = req.params;

    const rol = await Rol.findByPk(id);

    if (!rol) {
      return res.status(404).json({
        ok: false,
        mensaje: "Rol no encontrado",
        data: null,
        errores: null,
      });
    }

    await rol.destroy();

    return res.json({
      ok: true,
      mensaje: "Rol eliminado",
      data: true,
      errores: null,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;