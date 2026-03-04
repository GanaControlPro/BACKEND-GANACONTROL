const { Potrero, Ganado } = require("../models");

class PotreroService {

  async crear(data) {
    return await Potrero.create(data);
  }

  async listar() {
    return await Potrero.findAll();
  }

  async obtenerPorId(id) {
    return await Potrero.findByPk(id);
  }

  async actualizar(id, data) {
    return await Potrero.update(data, { where: { id } });
  }

  async eliminar(id) {
    return await Potrero.destroy({ where: { id } });
  }

  // 🔥 Endpoint especial: mover ganado a potrero
  async moverGanado(ganadoId, potreroId) {
    return await Ganado.update(
      { potrero_id: potreroId },
      { where: { id: ganadoId } }
    );
  }
}

module.exports = new PotreroService();