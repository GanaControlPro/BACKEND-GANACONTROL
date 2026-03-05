const { Reproduccion, Ganado } = require('../models');

class ReproduccionService {

  async getAll(finca_id) {
    return await Reproduccion.findAll({
      where: { finca_id },
      include: [
        { model: Ganado, as: 'hembra' },
        { model: Ganado, as: 'macho' }
      ],
      order: [['fecha_servicio', 'DESC']]
    });
  }

  async getById(id, finca_id) {
    return await Reproduccion.findOne({
      where: { id, finca_id },
      include: [
        { model: Ganado, as: 'hembra' },
        { model: Ganado, as: 'macho' }
      ]
    });
  }

  async create(data, finca_id) {
    return await Reproduccion.create({
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

module.exports = new ReproduccionService();