const { Alimentacion } = require('../models');

const listar = async (req, res) => {
  try {
    const registros = await Alimentacion.findAll();
    return res.json(registros);
  } catch (error) {
    console.error('Alimentacion.listar:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const crear = async (req, res) => {
  try {
    // Validación mínima para evitar 500 por body vacío
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ mensaje: 'El body es obligatorio' });
    }

    const registro = await Alimentacion.create(req.body);
    return res.status(201).json(registro);
  } catch (error) {
    console.error('Alimentacion.crear:', error);

    // Errores típicos de Sequelize (validación / constraints)
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ mensaje: error.message, errores: error.errors });
    }

    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const actualizar = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ mensaje: 'El parámetro id es obligatorio' });
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ mensaje: 'El body es obligatorio' });
    }

    const registro = await Alimentacion.findByPk(id);
    if (!registro) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }

    await registro.update(req.body);
    return res.json(registro);
  } catch (error) {
    console.error('Alimentacion.actualizar:', error);

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ mensaje: error.message, errores: error.errors });
    }

    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ mensaje: 'El parámetro id es obligatorio' });

    const registro = await Alimentacion.findByPk(id);
    if (!registro) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }

    await registro.destroy();
    return res.json({ mensaje: 'Registro eliminado' });
  } catch (error) {
    console.error('Alimentacion.eliminar:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { listar, crear, actualizar, eliminar };