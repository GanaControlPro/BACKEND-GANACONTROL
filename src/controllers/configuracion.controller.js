const { Usuario, Finca, Rol } = require('../models');
const bcrypt = require('bcryptjs');
const { ok, fail } = require('../utils/response');

const obtenerFincaActual = async (req, res, next) => {
  try {
    const finca = await Finca.findByPk(req.user.finca_id);

    if (!finca) {
      return fail(res, 'Finca no encontrada', null, 404);
    }

    return ok(res, 'Información de la finca', finca);
  } catch (e) {
    return next(e);
  }
};

const actualizarFincaActual = async (req, res, next) => {
  try {
    const finca = await Finca.findByPk(req.user.finca_id);

    if (!finca) {
      return fail(res, 'Finca no encontrada', null, 404);
    }

    await finca.update(req.body);

    return ok(res, 'Finca actualizada correctamente', finca);
  } catch (e) {
    return next(e);
  }
};

const obtenerPerfilActual = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id, {
      attributes: { exclude: ['contrasena'] },
      include: [
        { model: Rol, as: 'rol' },
        { model: Finca, as: 'finca' }
      ]
    });

    if (!usuario) {
      return fail(res, 'Usuario no encontrado', null, 404);
    }

    return ok(res, 'Perfil actual', usuario);
  } catch (e) {
    return next(e);
  }
};

const actualizarPerfilActual = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id);

    if (!usuario) {
      return fail(res, 'Usuario no encontrado', null, 404);
    }

    const { nombre, correo, contrasena } = req.body;

    if (correo && correo !== usuario.correo) {
      const existeCorreo = await Usuario.findOne({ where: { correo } });
      if (existeCorreo) {
        return fail(res, 'El correo ya está registrado', null, 400);
      }
    }

    const payload = {};

    if (nombre !== undefined) payload.nombre = nombre;
    if (correo !== undefined) payload.correo = correo;
    if (contrasena) payload.contrasena = await bcrypt.hash(contrasena, 10);

    await usuario.update(payload);

    const actualizado = await Usuario.findByPk(req.user.id, {
      attributes: { exclude: ['contrasena'] },
      include: [
        { model: Rol, as: 'rol' },
        { model: Finca, as: 'finca' }
      ]
    });

    return ok(res, 'Perfil actualizado correctamente', actualizado);
  } catch (e) {
    return next(e);
  }
};

const obtenerEstadoSistema = async (req, res, next) => {
  try {
    const data = [
      { clave: 'Versión', valor: '1.0.0' },
      { clave: 'Base de Datos', valor: 'MariaDB / MySQL' },
      { clave: 'Entorno', valor: process.env.NODE_ENV || 'development' },
      { clave: 'JWT', valor: 'Activo' }
    ];

    return ok(res, 'Estado del sistema', data);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  obtenerFincaActual,
  actualizarFincaActual,
  obtenerPerfilActual,
  actualizarPerfilActual,
  obtenerEstadoSistema
};