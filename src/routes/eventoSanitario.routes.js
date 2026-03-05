// src/routes/eventoSanitario.routes.js
const router = require('express').Router();
const controller = require('../controllers/eventoSanitario.controller');
const { authJwt } = require('../middlewares/authJwt');
const { authorize } = require('../middlewares/authorize');

// Anti "argument handler must be a function" (solo para controllers)
const ensureFn = (fn, name) => {
  if (typeof fn !== 'function') {
    // no tumbes el server: responde 500
    return (req, res) =>
      res.status(500).json({ ok: false, mensaje: `Handler inválido: ${name} no es función` });
  }
  return fn;
};

// Protege el módulo
router.use(authJwt);

// Health
router.get('/ping', (req, res) => res.json({ ok: true, modulo: 'eventoSanitario' }));

// Roles
const canRead = ['Administrador', 'Operario', 'Veterinario'];
const canWrite = ['Administrador', 'Operario', 'Veterinario'];
const canDelete = ['Administrador'];

// CRUD (nombres reales de tu controller: listar/crear/actualizar/eliminar)
router.get('/', authorize(canRead), ensureFn(controller.listar, 'eventoSanitarioController.listar'));
router.post('/', authorize(canWrite), ensureFn(controller.crear, 'eventoSanitarioController.crear'));
router.put('/:id', authorize(canWrite), ensureFn(controller.actualizar, 'eventoSanitarioController.actualizar'));
router.delete('/:id', authorize(canDelete), ensureFn(controller.eliminar, 'eventoSanitarioController.eliminar'));

// Opcional: obtener por id, SOLO si existe con ese nombre
if (typeof controller.obtener === 'function') {
  router.get('/:id', authorize(canRead), ensureFn(controller.obtener, 'eventoSanitarioController.obtener'));
}

module.exports = router;