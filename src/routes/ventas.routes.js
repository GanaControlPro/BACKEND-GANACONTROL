const router = require('express').Router();
const c = require('../controllers/ventas.controller');
const { authJwt } = require('../middlewares/authJwt');
const { can } = require('../middlewares/can');

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

router.get(
  '/kpis',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('ventas.ver'), "can('ventas.ver')"),
  ensureFn(c.kpis, 'ventasController.kpis')
);

router.get(
  '/resumen-hero',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('ventas.ver'), "can('ventas.ver')"),
  ensureFn(c.resumenHero, 'ventasController.resumenHero')
);

router.get(
  '/crecimiento',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('ventas.ver'), "can('ventas.ver')"),
  ensureFn(c.crecimiento, 'ventasController.crecimiento')
);

router.get(
  '/',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('ventas.ver'), "can('ventas.ver')"),
  ensureFn(c.listar, 'ventasController.listar')
);

router.get(
  '/:id',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('ventas.ver'), "can('ventas.ver')"),
  ensureFn(c.obtenerPorId, 'ventasController.obtenerPorId')
);

router.post(
  '/',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('ventas.crear'), "can('ventas.crear')"),
  ensureFn(c.crear, 'ventasController.crear')
);

router.put(
  '/:id',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('ventas.editar'), "can('ventas.editar')"),
  ensureFn(c.actualizar, 'ventasController.actualizar')
);

router.delete(
  '/:id',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('ventas.eliminar'), "can('ventas.eliminar')"),
  ensureFn(c.eliminar, 'ventasController.eliminar')
);

module.exports = router;