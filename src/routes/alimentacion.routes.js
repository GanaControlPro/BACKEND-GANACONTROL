const router = require('express').Router();

const { authJwt } = require('../middlewares/authJwt');
const { authorize } = require('../middlewares/authorize');
const controller = require('../controllers/alimentacion.controller');

const ensureFn = (fn, name) => {
  if (typeof fn !== 'function') {
    throw new Error(`Handler inválido: ${name} no es función`);
  }
  return fn;
};

const ensureMw = (mw, name) => {
  if (typeof mw !== 'function') {
    throw new Error(`Middleware inválido: ${name} no es función`);
  }
  return mw;
};

router.use(ensureMw(authJwt, 'authJwt'));

router.get('/ping', (req, res) => {
  res.json({ ok: true, modulo: 'alimentacion' });
});

router.get(
  '/',
  ensureMw(authorize(['Administrador', 'Operario', 'Veterinario']), 'authorize(listar)'),
  ensureFn(controller.listar, 'controller.listar')
);

router.post(
  '/',
  ensureMw(authorize(['Administrador', 'Operario']), 'authorize(crear)'),
  ensureFn(controller.crear, 'controller.crear')
);

router.put(
  '/:id',
  ensureMw(authorize(['Administrador', 'Operario']), 'authorize(actualizar)'),
  ensureFn(controller.actualizar, 'controller.actualizar')
);

router.delete(
  '/:id',
  ensureMw(authorize(['Administrador']), 'authorize(eliminar)'),
  ensureFn(controller.eliminar, 'controller.eliminar')
);

module.exports = router;