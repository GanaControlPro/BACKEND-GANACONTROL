const service = require('../services/potrero.service');
const { ok } = require('../utils/response');

const listar = async (req, res, next) => {
  try {

    const data = await service.listar();

    return ok(res, {
      mensaje: 'Listado OK',
      data
    });

  } catch (e) {
    return next(e);
  }
};

const crear = async (req, res, next) => {
  try {

    if (!req.body || Object.keys(req.body).length === 0) {
      return ok(res, {
        mensaje: 'El body es obligatorio',
        code: 400
      });
    }

    const data = await service.crear(req.body);

    return ok(res, {
      mensaje: 'Creado OK',
      data,
      code: 201
    });

  } catch (e) {
    return next(e);
  }
};

const actualizar = async (req, res, next) => {
  try {

    const { id } = req.params;

    if (!id) {
      return ok(res, {
        mensaje: 'El id es obligatorio',
        code: 400
      });
    }

    const data = await service.actualizar(id, req.body);

    return ok(res, {
      mensaje: 'Actualizado OK',
      data
    });

  } catch (e) {
    return next(e);
  }
};

const eliminar = async (req, res, next) => {
  try {

    const { id } = req.params;

    if (!id) {
      return ok(res, {
        mensaje: 'El id es obligatorio',
        code: 400
      });
    }

    const data = await service.eliminar(id);

    return ok(res, {
      mensaje: 'Eliminado OK',
      data
    });

  } catch (e) {
    return next(e);
  }
};

module.exports = { listar, crear, actualizar, eliminar };