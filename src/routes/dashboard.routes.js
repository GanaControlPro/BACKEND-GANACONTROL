const router = require('express').Router();
const { resumen } = require('../controllers/dashboard.controller');
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
  '/resumen',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('dashboard.ver'), "can('dashboard.ver')"),
  ensureFn(resumen, 'resumen')
);

module.exports = router;