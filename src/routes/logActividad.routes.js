const router = require('express').Router();
const {
  listarLogs,
  obtenerLogPorId
} = require('../controllers/logActividad.controller');
const { authJwt } = require('../middlewares/authJwt');
const { authorize } = require('../middlewares/authorize');

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
  '/',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(authorize('Administrador'), 'authorize(Administrador)'),
  ensureFn(listarLogs, 'listarLogs')
);

router.get(
  '/:id',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(authorize('Administrador'), 'authorize(Administrador)'),
  ensureFn(obtenerLogPorId, 'obtenerLogPorId')
);

module.exports = router;