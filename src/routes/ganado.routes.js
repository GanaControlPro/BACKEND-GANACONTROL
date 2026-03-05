const router = require('express').Router();
const { authJwt } = require('../middlewares/authJwt');
const { authorize } = require('../middlewares/authorize');
const { validate } = require('../validators');
const { crearGanadoSchema, actualizarGanadoSchema } = require('../validators/ganado.schema');
const c = require('../controllers/ganado.controller');

// Anti "argument handler must be a function"
const ensureFn = (fn, name) => {
  if (typeof fn !== 'function') throw new Error(`Handler inválido: ${name} no es función`);
  return fn;
};
const ensureMw = (mw, name) => {
  if (typeof mw !== 'function') throw new Error(`Middleware inválido: ${name} no es función`);
  return mw;
};

// Protege el módulo
router.use(ensureMw(authJwt, 'authJwt'));

// Health
router.get('/ping', (req, res) => res.json({ ok: true, modulo: 'ganado' }));

// Roles
const canRead = ['Administrador', 'Operario', 'Veterinario'];
const canWrite = ['Administrador', 'Operario'];
const canDelete = ['Administrador'];

// Rutas
router.get(
  '/',
  ensureMw(authorize(canRead), 'authorize(listar)'),
  ensureFn(c.listar, 'c.listar')
);

router.post(
  '/',
  ensureMw(authorize(canWrite), 'authorize(crear)'),
  ensureMw(validate(crearGanadoSchema), 'validate(crearGanadoSchema)'),
  ensureFn(c.crear, 'c.crear')
);

router.put(
  '/:id',
  ensureMw(authorize(canWrite), 'authorize(actualizar)'),
  ensureMw(validate(actualizarGanadoSchema), 'validate(actualizarGanadoSchema)'),
  ensureFn(c.actualizar, 'c.actualizar')
);

router.delete(
  '/:id',
  ensureMw(authorize(canDelete), 'authorize(eliminar)'),
  ensureFn(c.eliminar, 'c.eliminar')
);

module.exports = router;