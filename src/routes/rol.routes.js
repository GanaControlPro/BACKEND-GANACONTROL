const router = require('express').Router();
const { Rol, Permiso } = require('../models');
const { authJwt } = require('../middlewares/authJwt');
const { can } = require('../middlewares/can');

router.get('/', authJwt, can('usuarios.ver'), async (req, res, next) => {
  try {
    const roles = await Rol.findAll({
      include: [
        {
          model: Permiso,
          as: 'permisos',
          through: { attributes: [] }
        }
      ]
    });

    return res.json({ ok: true, mensaje: 'Listado de roles', data: roles, errores: null });
  } catch (e) {
    next(e);
  }
});

router.post('/', authJwt, can('usuarios.crear'), async (req, res, next) => {
  try {
    const rol = await Rol.create(req.body);
    return res.status(201).json({ ok: true, mensaje: 'Rol creado', data: rol, errores: null });
  } catch (e) {
    next(e);
  }
});

router.put('/:id', authJwt, can('usuarios.editar'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const rol = await Rol.findByPk(id);
    if (!rol) {
      return res.status(404).json({ ok: false, mensaje: 'Rol no encontrado', data: null, errores: null });
    }

    await rol.update(req.body);

    const actualizado = await Rol.findByPk(id, {
      include: [
        {
          model: Permiso,
          as: 'permisos',
          through: { attributes: [] }
        }
      ]
    });

    return res.json({ ok: true, mensaje: 'Rol actualizado', data: actualizado, errores: null });
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', authJwt, can('usuarios.eliminar'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const rol = await Rol.findByPk(id);
    if (!rol) {
      return res.status(404).json({ ok: false, mensaje: 'Rol no encontrado', data: null, errores: null });
    }

    await rol.destroy();

    return res.json({ ok: true, mensaje: 'Rol eliminado', data: true, errores: null });
  } catch (e) {
    next(e);
  }
});

module.exports = router;