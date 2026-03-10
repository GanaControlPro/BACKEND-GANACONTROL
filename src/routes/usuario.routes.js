const router = require('express').Router();
const { authJwt } = require('../middlewares/authJwt');
const { authorize } = require('../middlewares/authorize');
const usuarioController = require('../controllers/usuario.controller');

// Anti error "argument handler must be a function"
const ensureFn = (fn, name) => {
  if (typeof fn !== 'function') {
    throw new Error(`Handler inválido: ${name} no es función`);
  }
  return fn;
};

// Protege todo el módulo
router.use(authJwt);

// Health
router.get('/ping', (req, res) => res.json({ ok: true, modulo: 'usuarios' }));

// Roles
const canRead = ['Administrador'];
const canWrite = ['Administrador'];
const canDelete = ['Administrador'];

// CRUD
router.get(
  '/',
  authorize(canRead),
  ensureFn(usuarioController.listar, 'usuarioController.listar')
);

router.get(
  '/:id',
  authorize(canRead),
  ensureFn(usuarioController.obtenerPorId, 'usuarioController.obtenerPorId')
);

router.post(
  '/',
  authorize(canWrite),
  ensureFn(usuarioController.crear, 'usuarioController.crear')
);

router.put(
  '/:id',
  authorize(canWrite),
  ensureFn(usuarioController.actualizar, 'usuarioController.actualizar')
);

router.delete(
  '/:id',
  authorize(canDelete),
  ensureFn(usuarioController.eliminar, 'usuarioController.eliminar')
);

module.exports = router;