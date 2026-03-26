const { Alimentacion } = require('../models');

class AlimentacionService {
  async getAll(finca_id) {
    return await Alimentacion.findAll({
      where: { finca_id },
      include: [
        {
          association: 'ganado',
          attributes: ['id', 'codigo', 'nombre', 'raza']
        },
        {
          association: 'producto',
          attributes: ['id', 'nombre', 'tipo'],
          required: false
        }
      ],
      order: [['fecha', 'DESC'], ['id', 'DESC']]
    });
  }

  async getById(id, finca_id) {
    return await Alimentacion.findOne({
      where: { id, finca_id },
      include: [
        {
          association: 'ganado',
          attributes: ['id', 'codigo', 'nombre', 'raza']
        },
        {
          association: 'producto',
          attributes: ['id', 'nombre', 'tipo'],
          required: false
        }
      ]
    });
  }

  async create(data, finca_id) {
    const creado = await Alimentacion.create({
      ...data,
      finca_id
    });

    return await this.getById(creado.id, finca_id);
  }

  async update(id, data, finca_id) {
    const registro = await Alimentacion.findOne({
      where: { id, finca_id }
    });

    if (!registro) return null;

    await registro.update(data);

    return await this.getById(id, finca_id);
  }

  async remove(id, finca_id) {
    const registro = await Alimentacion.findOne({
      where: { id, finca_id }
    });

    if (!registro) return null;

    await registro.destroy();
    return true;
  }
}

module.exports = new AlimentacionService();