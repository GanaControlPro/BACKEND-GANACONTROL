// src/routes/reproduccion.routes.js
const router = require('express').Router();

const { authJwt } = require('../middlewares/authJwt');
const { authorize } = require('../middlewares/authorize');
const controller = require('../controllers/reproduccion.controller');

// Anti error: "argument handler must be a function"
const ensureFn = (fn, name) => {
  if (typeof fn !== 'function') {
    return (req, res) =>
      res.status(500).json({ ok: false, mensaje: `Handler inválido: ${name} no es función` });
  }
  return fn;
};

// Protege todo el módulo
router.use(authJwt);

// Health
router.get('/ping', (req, res) => res.json({ ok: true, modulo: 'reproduccion' }));

// Roles (ajusta si quieres)
const canRead = ['Administrador', 'Operario', 'Veterinario'];
const canWrite = ['Administrador', 'Operario'];
const canDelete = ['Administrador'];

// CRUD (según tu controller real)
router.get('/', authorize(canRead), ensureFn(controller.listar, 'reproduccionController.listar'));
router.post('/', authorize(canWrite), ensureFn(controller.crear, 'reproduccionController.crear'));
router.put('/:id', authorize(canWrite), ensureFn(controller.actualizar, 'reproduccionController.actualizar'));
router.delete('/:id', authorize(canDelete), ensureFn(controller.eliminar, 'reproduccionController.eliminar'));

module.exports = router;