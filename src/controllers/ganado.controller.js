const { Ganado } = require("../models");
const { ok, fail } = require("../utils/response");

const requireUser = (req, res) => {
  if (!req.user || !req.user.finca_id) {
    fail(res, "No autorizado: falta usuario o finca", ["Usuario no autenticado o sin finca asignada"], 401);
    return false;
  }
  return true;
};

const normalizarPayload = (req) => {
  const payload = { ...req.body };

  if (req.file) {
    payload.foto_url = `/uploads/ganado/${req.file.filename}`;
  }

  if (payload.es_reproductor !== undefined) {
    payload.es_reproductor =
      payload.es_reproductor === true ||
      payload.es_reproductor === "true" ||
      payload.es_reproductor === 1 ||
      payload.es_reproductor === "1";
  }

  if (payload.numero_partos !== undefined && payload.numero_partos !== "") {
    payload.numero_partos = Number(payload.numero_partos);
  }

  if (payload.peso_actual !== undefined && payload.peso_actual !== "") {
    payload.peso_actual = Number(payload.peso_actual);
  }

  return payload;
};

const manejarErrorSequelize = (error, res) => {
  if (
    error?.name === "SequelizeValidationError" ||
    error?.name === "SequelizeUniqueConstraintError"
  ) {
    return fail(
      res,
      "Validación fallida",
      error.errors?.map((x) => ({
        campo: x.path,
        mensaje: x.message,
      })) || [],
      400
    );
  }

  return null;
};

const listar = async (req, res, next) => {
  try {
    if (!requireUser(req, res)) return;

    const data = await Ganado.findAll({
      where: { finca_id: req.user.finca_id },
      order: [["id", "DESC"]],
    });

    return ok(res, "Listado de ganado obtenido correctamente", data);
  } catch (error) {
    console.error("Ganado.listar:", error);
    return next(error);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    if (!requireUser(req, res)) return;

    const { id } = req.params;

    if (!id) {
      return fail(res, "El parámetro id es obligatorio", ["id requerido"], 400);
    }

    const data = await Ganado.findOne({
      where: {
        id,
        finca_id: req.user.finca_id,
      },
    });

    if (!data) {
      return fail(res, "Ganado no encontrado", ["No existe un registro con ese id en la finca del usuario"], 404);
    }

    return ok(res, "Registro de ganado obtenido correctamente", data);
  } catch (error) {
    console.error("Ganado.obtenerPorId:", error);
    return next(error);
  }
};

const crear = async (req, res, next) => {
  try {
    if (!requireUser(req, res)) return;

    const bodyVacio =
      !req.body || Object.keys(req.body).length === 0;

    const sinArchivo = !req.file;

    if (bodyVacio && sinArchivo) {
      return fail(res, "El body es obligatorio", ["Debe enviar datos"], 400);
    }

    const payload = normalizarPayload(req);

    const data = await Ganado.create({
      ...payload,
      finca_id: req.user.finca_id,
    });

    return ok(res, "Registro de ganado creado correctamente", data, 201);
  } catch (error) {
    console.error("Ganado.crear:", error);

    const errorControlado = manejarErrorSequelize(error, res);
    if (errorControlado) return errorControlado;

    return next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {
    if (!requireUser(req, res)) return;

    const { id } = req.params;

    if (!id) {
      return fail(res, "El parámetro id es obligatorio", ["id requerido"], 400);
    }

    const bodyVacio =
      !req.body || Object.keys(req.body).length === 0;

    const sinArchivo = !req.file;

    if (bodyVacio && sinArchivo) {
      return fail(res, "El body es obligatorio", ["Debe enviar datos"], 400);
    }

    const existente = await Ganado.findOne({
      where: {
        id,
        finca_id: req.user.finca_id,
      },
    });

    if (!existente) {
      return fail(res, "Ganado no encontrado", ["No existe un registro con ese id en la finca del usuario"], 404);
    }

    const payload = normalizarPayload(req);

    await existente.update(payload);

    return ok(res, "Registro de ganado actualizado correctamente", existente);
  } catch (error) {
    console.error("Ganado.actualizar:", error);

    const errorControlado = manejarErrorSequelize(error, res);
    if (errorControlado) return errorControlado;

    return next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    if (!requireUser(req, res)) return;

    const { id } = req.params;

    if (!id) {
      return fail(res, "El parámetro id es obligatorio", ["id requerido"], 400);
    }

    const existente = await Ganado.findOne({
      where: {
        id,
        finca_id: req.user.finca_id,
      },
    });

    if (!existente) {
      return fail(res, "Ganado no encontrado", ["No existe un registro con ese id en la finca del usuario"], 404);
    }

    await existente.destroy();

    return ok(res, "Registro de ganado eliminado correctamente", {
      id: Number(id),
    });
  } catch (error) {
    console.error("Ganado.eliminar:", error);
    return next(error);
  }
};

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};