const { Produccion } = require("../models");
const { Op } = require("sequelize");

class ProduccionService {

  async crear(data) {
    return await Produccion.create(data);
  }

  async listar(filtros) {
    const where = {};

    if (filtros.ganado_id) {
      where.ganado_id = filtros.ganado_id;
    }

    if (filtros.fecha_inicio && filtros.fecha_fin) {
      where.fecha = {
        [Op.between]: [filtros.fecha_inicio, filtros.fecha_fin]
      };
    }

    return await Produccion.findAll({ where });
  }

  async obtenerPorId(id) {
    return await Produccion.findByPk(id);
  }

  async actualizar(id, data) {
    return await Produccion.update(data, { where: { id } });
  }

  async eliminar(id) {
    return await Produccion.destroy({ where: { id } });
  }
}

module.exports = new ProduccionService();