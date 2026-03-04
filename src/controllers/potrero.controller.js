const potreroService = require("../services/potrero.service");

class PotreroController {

  async crear(req, res) {
    const data = await potreroService.crear(req.body);
    res.json(data);
  }

  async listar(req, res) {
    const data = await potreroService.listar();
    res.json(data);
  }

  async obtener(req, res) {
    const data = await potreroService.obtenerPorId(req.params.id);
    res.json(data);
  }

  async actualizar(req, res) {
    await potreroService.actualizar(req.params.id, req.body);
    res.json({ message: "Actualizado correctamente" });
  }

  async eliminar(req, res) {
    await potreroService.eliminar(req.params.id);
    res.json({ message: "Eliminado correctamente" });
  }

  async moverGanado(req, res) {
    const { ganadoId, potreroId } = req.body;
    await potreroService.moverGanado(ganadoId, potreroId);
    res.json({ message: "Ganado movido correctamente" });
  }
}

module.exports = new PotreroController();