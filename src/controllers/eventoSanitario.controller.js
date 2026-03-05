// src/controllers/eventoSanitario.controller.js
let service;
try {
  service = require('../services/eventoSanitario.service');
} catch (e) {
  service = {}; // si no existe aún, no tumba el server
}

const { ok, fail } = require('../utils/response');

function requireUser(req, res) {
  if (!req.user || !req.user.finca_id) {
    fail(res, { code: 401, mensaje: 'No autorizado: falta usuario/finca' });
    return false;
  }
  return true;
}

async function listar(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    if (typeof service.listar !== 'function') {
      return ok(res, {
        mensaje: 'Listado OK (mock: service.listar no implementado)',
        data: [],
      });
    }

    const data = await service.listar(req.user);
    return ok(res, { mensaje: 'Listado OK', data });
  } catch (e) {
    console.error('EventoSanitario.listar:', e);
    return next(e);
  }
}

async function crear(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    if (!req.body || Object.keys(req.body).length === 0) {
      return fail(res, { code: 400, mensaje: 'El body es obligatorio' });
    }

    if (typeof service.crear !== 'function') {
      return ok(res, {
        code: 201,
        mensaje: 'Creado OK (mock: service.crear no implementado)',
        data: { id: Date.now(), finca_id: req.user.finca_id, ...req.body },
      });
    }

    const data = await service.crear(req.body, req.user);
    return ok(res, { code: 201, mensaje: 'Creado OK', data });
  } catch (e) {
    console.error('EventoSanitario.crear:', e);

    if (e?.name === 'SequelizeValidationError' || e?.name === 'SequelizeUniqueConstraintError') {
      return fail(res, {
        code: 400,
        mensaje: e.message,
        errores: e.errors?.map((x) => ({ campo: x.path, mensaje: x.message })) ?? [],
      });
    }

    return next(e);
  }
}

async function actualizar(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const { id } = req.params;
    if (!id) return fail(res, { code: 400, mensaje: 'El id es obligatorio' });

    if (!req.body || Object.keys(req.body).length === 0) {
      return fail(res, { code: 400, mensaje: 'El body es obligatorio' });
    }

    if (typeof service.actualizar !== 'function') {
      return ok(res, {
        mensaje: 'Actualizado OK (mock: service.actualizar no implementado)',
        data: { id: Number(id), finca_id: req.user.finca_id, ...req.body },
      });
    }

    const data = await service.actualizar(id, req.body, req.user);
    return ok(res, { mensaje: 'Actualizado OK', data });
  } catch (e) {
    console.error('EventoSanitario.actualizar:', e);

    if (e?.name === 'SequelizeValidationError' || e?.name === 'SequelizeUniqueConstraintError') {
      return fail(res, {
        code: 400,
        mensaje: e.message,
        errores: e.errors?.map((x) => ({ campo: x.path, mensaje: x.message })) ?? [],
      });
    }

    return next(e);
  }
}

async function eliminar(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const { id } = req.params;
    if (!id) return fail(res, { code: 400, mensaje: 'El id es obligatorio' });

    if (typeof service.eliminar !== 'function') {
      return ok(res, {
        mensaje: 'Eliminado OK (mock: service.eliminar no implementado)',
        data: { id: Number(id) },
      });
    }

    const data = await service.eliminar(id, req.user);
    return ok(res, { mensaje: 'Eliminado OK', data });
  } catch (e) {
    console.error('EventoSanitario.eliminar:', e);
    return next(e);
  }
}

module.exports = { listar, crear, actualizar, eliminar };