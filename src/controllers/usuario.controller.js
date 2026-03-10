const service = require('../services/usuario.service');
const { ok, fail } = require('../utils/response');

const listar = async (req, res, next) => {
  try {
    const data = await service.listar();
    return ok(res, 'Listado de usuarios', data);
  } catch (e) {
    return next(e);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const data = await service.obtenerPorId(req.params.id);

    if (!data) {
      return fail(res, 'Usuario no encontrado', null, 404);
    }

    return ok(res, 'Usuario encontrado', data);
  } catch (e) {
    return next(e);
  }
};

const crear = async (req, res, next) => {
  try {
    const data = await service.crear(req.body);
    return ok(res, 'Usuario creado correctamente', data, 201);
  } catch (e) {
    return fail(res, e.message || 'No se pudo crear el usuario', null, 400);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const data = await service.actualizar(req.params.id, req.body);

    if (!data) {
      return fail(res, 'Usuario no encontrado', null, 404);
    }

    return ok(res, 'Usuario actualizado', data);
  } catch (e) {
    return fail(res, e.message || 'No se pudo actualizar el usuario', null, 400);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const data = await service.eliminar(req.params.id);

    if (!data) {
      return fail(res, 'Usuario no encontrado', null, 404);
    }

    return ok(res, 'Usuario eliminado', true);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};