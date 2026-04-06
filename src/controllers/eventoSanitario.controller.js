// src/controllers/eventoSanitario.controller.js
const service = require('../services/eventoSanitario.service');
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

    const data = await service.listar(req.user);
    return ok(res, { mensaje: 'Listado OK', data });
  } catch (e) {
    console.error('EventoSanitario.listar ERROR =>', e);
    console.error('Mensaje =>', e?.message);
    console.error('Stack =>', e?.stack);
    return next(e);
  }
}

async function obtener(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const { id } = req.params;
    if (!id) return fail(res, { code: 400, mensaje: 'El id es obligatorio' });

    const data = await service.obtener(id, req.user);

    if (!data) {
      return fail(res, { code: 404, mensaje: 'Evento sanitario no encontrado' });
    }

    return ok(res, { mensaje: 'Consulta OK', data });
  } catch (e) {
    console.error('EventoSanitario.obtener ERROR =>', e);
    console.error('Mensaje =>', e?.message);
    console.error('Stack =>', e?.stack);
    return next(e);
  }
}

async function crear(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    if (!req.body || Object.keys(req.body).length === 0) {
      return fail(res, { code: 400, mensaje: 'El body es obligatorio' });
    }

    const data = await service.crear(req.body, req.user);
    return ok(res, { code: 201, mensaje: 'Creado OK', data });
  } catch (e) {
    console.error('EventoSanitario.crear ERROR =>', e);
    console.error('Mensaje =>', e?.message);
    console.error('Stack =>', e?.stack);

    if (e?.name === 'SequelizeValidationError' || e?.name === 'SequelizeUniqueConstraintError') {
      return fail(res, {
        code: 400,
        mensaje: e.message,
        errores: e.errors?.map((x) => ({ campo: x.path, mensaje: x.message })) ?? [],
      });
    }

    if (e?.status) {
      return fail(res, { code: e.status, mensaje: e.message });
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

    const data = await service.actualizar(id, req.body, req.user);

    if (!data) {
      return fail(res, { code: 404, mensaje: 'Evento sanitario no encontrado' });
    }

    return ok(res, { mensaje: 'Actualizado OK', data });
  } catch (e) {
    console.error('EventoSanitario.actualizar ERROR =>', e);
    console.error('Mensaje =>', e?.message);
    console.error('Stack =>', e?.stack);

    if (e?.name === 'SequelizeValidationError' || e?.name === 'SequelizeUniqueConstraintError') {
      return fail(res, {
        code: 400,
        mensaje: e.message,
        errores: e.errors?.map((x) => ({ campo: x.path, mensaje: x.message })) ?? [],
      });
    }

    if (e?.status) {
      return fail(res, { code: e.status, mensaje: e.message });
    }

    return next(e);
  }
}

async function eliminar(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const { id } = req.params;
    if (!id) return fail(res, { code: 400, mensaje: 'El id es obligatorio' });

    const data = await service.eliminar(id, req.user);

    if (!data) {
      return fail(res, { code: 404, mensaje: 'Evento sanitario no encontrado' });
    }

    return ok(res, { mensaje: 'Eliminado OK', data });
  } catch (e) {
    console.error('EventoSanitario.eliminar ERROR =>', e);
    console.error('Mensaje =>', e?.message);
    console.error('Stack =>', e?.stack);
    return next(e);
  }
}

async function kpis(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const data = await service.obtenerKpis(req.user);
    return ok(res, { mensaje: 'KPIs OK', data });
  } catch (e) {
    console.error('EventoSanitario.kpis ERROR =>', e);
    return next(e);
  }
}

async function proximos(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const data = await service.obtenerProximos(req.user);
    return ok(res, { mensaje: 'Próximos eventos OK', data });
  } catch (e) {
    console.error('EventoSanitario.proximos ERROR =>', e);
    return next(e);
  }
}

async function estatus(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const data = await service.obtenerEstatus(req.user);
    return ok(res, { mensaje: 'Estatus OK', data });
  } catch (e) {
    console.error('EventoSanitario.estatus ERROR =>', e);
    return next(e);
  }
}

async function resumen(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const data = await service.obtenerResumen(req.user);
    return ok(res, { mensaje: 'Resumen OK', data });
  } catch (e) {
    console.error('EventoSanitario.resumen ERROR =>', e);
    return next(e);
  }
}

module.exports = {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar,
  kpis,
  proximos,
  estatus,
  resumen
};