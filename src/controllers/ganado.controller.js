const { Ganado } = require('../models');
const { ok, fail } = require('../utils/response');

async function listar(req, res, next) {
  try {
    const rows = await Ganado.findAll({ where: { finca_id: req.user.finca_id } });
    return ok(res, { data: rows });
  } catch (e) { next(e); }
}

async function crear(req, res, next) {
  try {
    const row = await Ganado.create({ ...req.body, finca_id: req.user.finca_id });
    return ok(res, { code: 201, mensaje: 'Ganado creado', data: row });
  } catch (e) { next(e); }
}

async function actualizar(req, res, next) {
  try {
    const { id } = req.params;
    const [n] = await Ganado.update(req.body, { where: { id, finca_id: req.user.finca_id } });
    if (!n) return fail(res, { code: 404, mensaje: 'No encontrado' });
    const row = await Ganado.findByPk(id);
    return ok(res, { mensaje: 'Ganado actualizado', data: row });
  } catch (e) { next(e); }
}

async function eliminar(req, res, next) {
  try {
    const { id } = req.params;
    const n = await Ganado.destroy({ where: { id, finca_id: req.user.finca_id } });
    if (!n) return fail(res, { code: 404, mensaje: 'No encontrado' });
    return ok(res, { mensaje: 'Ganado eliminado', data: { id: Number(id) } });
  } catch (e) { next(e); }
}

module.exports = { listar, crear, actualizar, eliminar };