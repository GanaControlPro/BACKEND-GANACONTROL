const { Reproduccion, Ganado } = require("../models");
const { Op } = require("sequelize");

const includeGanado = [
  {
    model: Ganado,
    as: "vaca",
    attributes: ["id", "codigo", "nombre", "raza", "categoria"],
  },
  {
    model: Ganado,
    as: "toro",
    attributes: ["id", "codigo", "nombre", "raza", "categoria"],
  },
];

class ReproduccionService {
  async listar(query = {}) {
    const where = {};

    if (query?.estado) {
      where.estado = query.estado;
    }

    if (query?.tipo_servicio) {
      where.tipo_servicio = query.tipo_servicio;
    }

    if (query?.vaca_id) {
      where.vaca_id = Number(query.vaca_id);
    }

    if (query?.toro_id) {
      where.toro_id = Number(query.toro_id);
    }

    if (query?.desde && query?.hasta) {
      where.fecha_servicio = {
        [Op.between]: [query.desde, query.hasta],
      };
    } else if (query?.desde) {
      where.fecha_servicio = {
        [Op.gte]: query.desde,
      };
    } else if (query?.hasta) {
      where.fecha_servicio = {
        [Op.lte]: query.hasta,
      };
    }

    return await Reproduccion.findAll({
      where,
      include: includeGanado,
      order: [["fecha_servicio", "DESC"], ["id", "DESC"]],
    });
  }

  async obtenerPorId(id) {
    const registro = await Reproduccion.findByPk(id, {
      include: includeGanado,
    });

    if (!registro) {
      const error = new Error("Registro de reproducción no encontrado");
      error.status = 404;
      throw error;
    }

    return registro;
  }

  async crear(body) {
    const payload = { ...body };

    if (payload.toro_id === "" || payload.toro_id === undefined) {
      payload.toro_id = null;
    }

    if (
      payload.proveedor_genetico === "" ||
      payload.proveedor_genetico === undefined
    ) {
      payload.proveedor_genetico = null;
    }

    if (
      payload.fecha_parto === "" ||
      payload.fecha_parto === undefined
    ) {
      payload.fecha_parto = null;
    }

    if (
      payload.fecha_probable_parto === "" ||
      payload.fecha_probable_parto === undefined
    ) {
      payload.fecha_probable_parto = null;
    }

    if (
      payload.cria_codigo === "" ||
      payload.cria_codigo === undefined
    ) {
      payload.cria_codigo = null;
    }

    const creado = await Reproduccion.create(payload);

    return await Reproduccion.findByPk(creado.id, {
      include: includeGanado,
    });
  }

  async actualizar(id, body) {
    const registro = await Reproduccion.findByPk(id);

    if (!registro) {
      const error = new Error("Registro de reproducción no encontrado");
      error.status = 404;
      throw error;
    }

    const payload = { ...body };

    if (payload.toro_id === "") {
      payload.toro_id = null;
    }

    if (payload.proveedor_genetico === "") {
      payload.proveedor_genetico = null;
    }

    if (payload.fecha_parto === "") {
      payload.fecha_parto = null;
    }

    if (payload.fecha_probable_parto === "") {
      payload.fecha_probable_parto = null;
    }

    if (payload.cria_codigo === "") {
      payload.cria_codigo = null;
    }

    await registro.update(payload);

    return await Reproduccion.findByPk(id, {
      include: includeGanado,
    });
  }

  async eliminar(id) {
    const registro = await Reproduccion.findByPk(id);

    if (!registro) {
      const error = new Error("Registro de reproducción no encontrado");
      error.status = 404;
      throw error;
    }

    await registro.destroy();

    return { id: Number(id) };
  }
}

module.exports = new ReproduccionService();