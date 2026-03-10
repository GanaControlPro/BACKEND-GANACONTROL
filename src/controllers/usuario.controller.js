const service = require('../services/usuario.service');
const { ok, fail } = require('../utils/response');

const listar = async (req, res, next) => {
  try {
    const data = await service.listar();
    return ok(res, {
      mensaje: 'Listado de usuarios',
      data
    });
  } catch (e) {
    return next(e);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const data = await service.obtenerPorId(req.params.id);

    if (!data) {
      return fail(res, {
        mensaje: 'Usuario no encontrado',
        code: 404
      });
    }

    return ok(res, {
      mensaje: 'Usuario encontrado',
      data
    });
  } catch (e) {
    return next(e);
  }
};

const crear = async (req, res, next) => {
  try {
    const data = await service.crear(req.body);

    return ok(res, {
      mensaje: 'Usuario creado correctamente',
      data,
      code: 201
    });
  } catch (e) {
    return fail(res, {
      mensaje: e.message,
      code: 400
    });
  }
};

const actualizar = async (req, res, next) => {
  try {
    const data = await service.actualizar(req.params.id, req.body);

    if (!data) {
      return fail(res, {
        mensaje: 'Usuario no encontrado',
        code: 404
      });
    }

    return ok(res, {
      mensaje: 'Usuario actualizado',
      data
    });
  } catch (e) {
    return fail(res, {
      mensaje: e.message,
      code: 400
    });
  }
};

const eliminar = async (req, res, next) => {
  try {
    const data = await service.eliminar(req.params.id);

    if (!data) {
      return fail(res, {
        mensaje: 'Usuario no encontrado',
        code: 404
      });
    }

    return ok(res, {
      mensaje: 'Usuario eliminado',
      data: true
    });
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