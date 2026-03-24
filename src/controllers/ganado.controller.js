const { Ganado } = require('../models');
const { ok, fail } = require('../utils/response');

function requireUser(req, res) {
  if (!req.user || !req.user.finca_id) {
    fail(res, {
      code: 401,
      mensaje: 'No autorizado: falta usuario/finca'
    });
    return false;
  }
  return true;
}

function normalizarPayload(req) {
  const payload = { ...req.body };

  if (req.file) {
    payload.foto_url = `/uploads/ganado/${req.file.filename}`;
  }

  if (payload.es_reproductor !== undefined) {
    payload.es_reproductor =
      payload.es_reproductor === true ||
      payload.es_reproductor === 'true' ||
      payload.es_reproductor === 1 ||
      payload.es_reproductor === '1';
  }

  if (payload.numero_partos !== undefined && payload.numero_partos !== '') {
    payload.numero_partos = Number(payload.numero_partos);
  }

  if (payload.peso_actual !== undefined && payload.peso_actual !== '') {
    payload.peso_actual = Number(payload.peso_actual);
  }

  return payload;
}

async function listar(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const rows = await Ganado.findAll({
      where: { finca_id: req.user.finca_id },
      order: [['id', 'DESC']]
    });

    return ok(res, {
      mensaje: 'Listado OK',
      data: rows
    });
  } catch (e) {
    console.error('Ganado.listar:', e);
    return next(e);
  }
}

async function obtenerPorId(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const { id } = req.params;

    if (!id) {
      return fail(res, {
        code: 400,
        mensaje: 'El parámetro id es obligatorio'
      });
    }

    const row = await Ganado.findOne({
      where: {
        id,
        finca_id: req.user.finca_id
      }
    });

    if (!row) {
      return fail(res, {
        code: 404,
        mensaje: 'Ganado no encontrado'
      });
    }

    return ok(res, {
      mensaje: 'Ganado encontrado',
      data: row
    });
  } catch (e) {
    console.error('Ganado.obtenerPorId:', e);
    return next(e);
  }
}

async function crear(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    if (!req.body || Object.keys(req.body).length === 0) {
      return fail(res, {
        code: 400,
        mensaje: 'El body es obligatorio'
      });
    }

    const payload = normalizarPayload(req);

    const row = await Ganado.create({
      ...payload,
      finca_id: req.user.finca_id
    });

    return ok(res, {
      code: 201,
      mensaje: 'Ganado creado',
      data: row
    });
  } catch (e) {
    console.error('Ganado.crear:', e);

    if (
      e?.name === 'SequelizeValidationError' ||
      e?.name === 'SequelizeUniqueConstraintError'
    ) {
      return fail(res, {
        code: 400,
        mensaje: e.message,
        errores: e.errors?.map((x) => ({
          campo: x.path,
          mensaje: x.message
        })) ?? []
      });
    }

    return next(e);
  }
}

async function actualizar(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const { id } = req.params;

    if (!id) {
      return fail(res, {
        code: 400,
        mensaje: 'El parámetro id es obligatorio'
      });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return fail(res, {
        code: 400,
        mensaje: 'El body es obligatorio'
      });
    }

    const payload = normalizarPayload(req);

    const [n] = await Ganado.update(payload, {
      where: {
        id,
        finca_id: req.user.finca_id
      }
    });

    if (!n) {
      return fail(res, {
        code: 404,
        mensaje: 'No encontrado'
      });
    }

    const row = await Ganado.findOne({
      where: {
        id,
        finca_id: req.user.finca_id
      }
    });

    return ok(res, {
      mensaje: 'Ganado actualizado',
      data: row
    });
  } catch (e) {
    console.error('Ganado.actualizar:', e);

    if (
      e?.name === 'SequelizeValidationError' ||
      e?.name === 'SequelizeUniqueConstraintError'
    ) {
      return fail(res, {
        code: 400,
        mensaje: e.message,
        errores: e.errors?.map((x) => ({
          campo: x.path,
          mensaje: x.message
        })) ?? []
      });
    }

    return next(e);
  }
}

async function eliminar(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const { id } = req.params;

    if (!id) {
      return fail(res, {
        code: 400,
        mensaje: 'El parámetro id es obligatorio'
      });
    }

    const n = await Ganado.destroy({
      where: {
        id,
        finca_id: req.user.finca_id
      }
    });

    if (!n) {
      return fail(res, {
        code: 404,
        mensaje: 'No encontrado'
      });
    }

    return ok(res, {
      mensaje: 'Ganado eliminado',
      data: { id: Number(id) }
    });
  } catch (e) {
    console.error('Ganado.eliminar:', e);
    return next(e);
  }
}

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};