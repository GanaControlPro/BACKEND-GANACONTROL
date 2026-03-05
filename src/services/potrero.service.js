const { Potrero, Ganado } = require("../models");

class PotreroService {

  async crear(data) {
    const potrero = await Potrero.create(data);
    return potrero;
  }

  async listar() {
    const potreros = await Potrero.findAll();
    return potreros;
  }

  async obtenerPorId(id) {
    const potrero = await Potrero.findByPk(id);
    return potrero;
  }

  async actualizar(id, data) {
    const potrero = await Potrero.findByPk(id);
    if (!potrero) return null;

    await potrero.update(data);
    return potrero;
  }

  async eliminar(id) {
    const potrero = await Potrero.findByPk(id);
    if (!potrero) return null;

    await potrero.destroy();
    return { id };
  }

  // 🔥 mover ganado a potrero
  async moverGanado(ganadoId, potreroId) {

    const potrero = await Potrero.findByPk(potreroId);
    if (!potrero) return null;

    const ganado = await Ganado.findByPk(ganadoId);
    if (!ganado) return null;

    await ganado.update({
      potrero_id: potreroId
    });

    return ganado;
  }

}

module.exports = new PotreroService();