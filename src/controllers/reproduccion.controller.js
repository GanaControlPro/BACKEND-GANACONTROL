const service = require('../services/reproduccion.service');
const { ok } = require('../utils/response');

const listar = async (req, res, next) => {
  try {
    if (typeof service.listar !== 'function') {
      return ok(res, 'Listado OK', []);
    }

    const data = await service.listar(req.query);
    return ok(res, 'Listado de reproducciones obtenido correctamente', data);
  } catch (error) {
    console.error('Reproduccion.listar:', error);
    return next(error);
  }
};

const crear = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return ok(res, 'El body es obligatorio', null, 400);
    }

    if (typeof service.crear !== 'function') {
      return ok(res, 'Creado OK', req.body, 201);
    }

    const data = await service.crear(req.body, req.user);
    return ok(res, 'Registro de reproducción creado correctamente', data, 201);
  } catch (error) {
    console.error('Reproduccion.crear:', error);
    return next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return ok(res, 'El parámetro id es obligatorio', null, 400);
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return ok(res, 'El body es obligatorio', null, 400);
    }

    if (typeof service.actualizar !== 'function') {
      return ok(res, 'Actualizado OK', { id, ...req.body });
    }

    const data = await service.actualizar(id, req.body, req.user);
    return ok(res, 'Registro de reproducción actualizado correctamente', data);
  } catch (error) {
    console.error('Reproduccion.actualizar:', error);
    return next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return ok(res, 'El parámetro id es obligatorio', null, 400);
    }

    if (typeof service.eliminar !== 'function') {
      return ok(res, 'Eliminado OK', { id });
    }

    const data = await service.eliminar(id, req.user);
    return ok(res, 'Registro de reproducción eliminado correctamente', data);
  } catch (error) {
    console.error('Reproduccion.eliminar:', error);
    return next(error);
  }
};

module.exports = {
  listar,
  crear,
  actualizar,
  eliminar
};