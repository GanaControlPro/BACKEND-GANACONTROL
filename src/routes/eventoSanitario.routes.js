// src/routes/eventoSanitario.routes.js
const router = require('express').Router();
const controller = require('../controllers/eventoSanitario.controller');
const { authJwt } = require('../middlewares/authJwt');
const { authorize } = require('../middlewares/authorize');

const ensureFn = (fn, name) => {
  if (typeof fn !== 'function') {
    return (req, res) =>
      res.status(500).json({ ok: false, mensaje: `Handler inválido: ${name} no es función` });
  }
  return fn;
};

router.use(authJwt);

router.get('/ping', (req, res) => res.json({ ok: true, modulo: 'eventoSanitario' }));

const canRead = ['Administrador', 'Operario', 'Veterinario'];
const canWrite = ['Administrador', 'Operario', 'Veterinario'];
const canDelete = ['Administrador'];

router.get('/kpis', authorize(canRead), ensureFn(controller.kpis, 'eventoSanitarioController.kpis'));
router.get('/proximos', authorize(canRead), ensureFn(controller.proximos, 'eventoSanitarioController.proximos'));
router.get('/estatus', authorize(canRead), ensureFn(controller.estatus, 'eventoSanitarioController.estatus'));
router.get('/resumen', authorize(canRead), ensureFn(controller.resumen, 'eventoSanitarioController.resumen'));
router.get('/', authorize(canRead), ensureFn(controller.listar, 'eventoSanitarioController.listar'));
router.get('/:id', authorize(canRead), ensureFn(controller.obtener, 'eventoSanitarioController.obtener'));
router.post('/', authorize(canWrite), ensureFn(controller.crear, 'eventoSanitarioController.crear'));
router.put('/:id', authorize(canWrite), ensureFn(controller.actualizar, 'eventoSanitarioController.actualizar'));
router.delete('/:id', authorize(canDelete), ensureFn(controller.eliminar, 'eventoSanitarioController.eliminar'));

module.exports = router;