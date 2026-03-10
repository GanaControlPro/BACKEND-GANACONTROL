const router = require('express').Router();
const { Rol } = require('../models');

router.get('/', async (req, res) => {
  const roles = await Rol.findAll();
  res.json({ ok: true, data: roles });
});

router.post('/', async (req, res) => {
  const rol = await Rol.create(req.body);
  res.status(201).json({ ok: true, data: rol });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const rol = await Rol.findByPk(id);
  if (!rol) {
    return res.status(404).json({ ok:false, mensaje:'Rol no encontrado' });
  }

  await rol.update(req.body);

  res.json({ ok:true, data: rol });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const rol = await Rol.findByPk(id);
  if (!rol) {
    return res.status(404).json({ ok:false, mensaje:'Rol no encontrado' });
  }

  await rol.destroy();

  res.json({ ok:true, mensaje:'Rol eliminado' });
});

module.exports = router;