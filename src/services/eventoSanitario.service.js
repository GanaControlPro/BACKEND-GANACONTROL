const { EventoSanitario } = require('../models');

class EventoSanitarioService {

  async getAll(finca_id) {
    return await EventoSanitario.findAll({
      where: { finca_id },
      order: [['fecha', 'DESC']]
    });
  }

  async getById(id, finca_id) {
    return await EventoSanitario.findOne({
      where: { id, finca_id }
    });
  }

  async create(data, finca_id) {
    return await EventoSanitario.create({
      ...data,
      finca_id
    });
  }

  async update(id, data, finca_id) {
    const registro = await this.getById(id, finca_id);
    if (!registro) return null;

    await registro.update(data);
    return registro;
  }

  async remove(id, finca_id) {
    const registro = await this.getById(id, finca_id);
    if (!registro) return null;

    await registro.destroy();
    return true;
  }
}

module.exports = new EventoSanitarioService();