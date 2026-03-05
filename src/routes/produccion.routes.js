const router = require('express').Router();

const { authJwt } = require('../middlewares/authJwt');
const { authorize } = require('../middlewares/authorize');
const produccionController = require('../controllers/produccion.controller');

// Anti error: "argument handler must be a function"
const ensureFn = (fn, name) => {
  if (typeof fn !== 'function') {
    throw new Error(`Handler inválido: ${name} no es función`);
  }
  return fn;
};

// Protege todo el módulo
router.use(authJwt);

// Health
router.get('/ping', (req, res) => res.json({ ok: true, modulo: 'produccion' }));

// Roles permitidos
const canRead = ['Administrador', 'Operario', 'Veterinario'];
const canWrite = ['Administrador', 'Operario'];
const canDelete = ['Administrador'];

// Rutas
router.get(
  '/',
  authorize(canRead),
  ensureFn(produccionController.listar, 'produccionController.listar')
);

router.post(
  '/',
  authorize(canWrite),
  ensureFn(produccionController.crear, 'produccionController.crear')
);

router.put(
  '/:id',
  authorize(canWrite),
  ensureFn(produccionController.actualizar, 'produccionController.actualizar')
);

router.delete(
  '/:id',
  authorize(canDelete),
  ensureFn(produccionController.eliminar, 'produccionController.eliminar')
);

module.exports = router;