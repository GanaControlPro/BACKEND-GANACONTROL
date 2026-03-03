const { Ganado } = require('../models');

async function listar(req, res, next) {
  try {
    const rows = await Ganado.findAll({ where: { finca_id: req.user.finca_id } });
    res.json(rows);
  } catch (e) { next(e); }
}

async function crear(req, res, next) {
  try {
    const data = { ...req.body, finca_id: req.user.finca_id };
    const row = await Ganado.create(data);
    res.status(201).json(row);
  } catch (e) { next(e); }
}

async function actualizar(req, res, next) {
  try {
    const { id } = req.params;
    const [n] = await Ganado.update(req.body, { where: { id, finca_id: req.user.finca_id } });
    if (!n) return res.status(404).json({ mensaje: 'No encontrado' });
    const row = await Ganado.findByPk(id);
    res.json(row);
  } catch (e) { next(e); }
}

async function eliminar(req, res, next) {
  try {
    const { id } = req.params;
    const n = await Ganado.destroy({ where: { id, finca_id: req.user.finca_id } });
    if (!n) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json({ ok: true });
  } catch (e) { next(e); }
}

module.exports = { listar, crear, actualizar, eliminar };