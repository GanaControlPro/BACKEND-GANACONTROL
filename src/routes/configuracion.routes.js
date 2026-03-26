const router = require('express').Router();
const { authJwt } = require('../middlewares/authJwt');
const { can } = require('../middlewares/can');
const controller = require('../controllers/configuracion.controller');

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
  '/finca',
  ensureMw(authJwt, 'authJwt'),
  ensureFn(controller.obtenerFincaActual, 'controller.obtenerFincaActual')
);

router.put(
  '/finca',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('usuarios.editar'), "can('usuarios.editar')"),
  ensureFn(controller.actualizarFincaActual, 'controller.actualizarFincaActual')
);

router.get(
  '/perfil',
  ensureMw(authJwt, 'authJwt'),
  ensureFn(controller.obtenerPerfilActual, 'controller.obtenerPerfilActual')
);

router.put(
  '/perfil',
  ensureMw(authJwt, 'authJwt'),
  ensureFn(controller.actualizarPerfilActual, 'controller.actualizarPerfilActual')
);

router.get(
  '/sistema',
  ensureMw(authJwt, 'authJwt'),
  ensureFn(controller.obtenerEstadoSistema, 'controller.obtenerEstadoSistema')
);

module.exports = router;