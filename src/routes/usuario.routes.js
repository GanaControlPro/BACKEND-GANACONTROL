const router = require('express').Router();
const { authJwt } = require('../middlewares/authJwt');
const { can } = require('../middlewares/can');
const usuarioController = require('../controllers/usuario.controller');

// Anti error "argument handler must be a function"
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

// Health
router.get('/ping', (req, res) => res.json({ ok: true, modulo: 'usuarios' }));

router.get(
  '/',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('usuarios.ver'), "can('usuarios.ver')"),
  ensureFn(usuarioController.listar, 'usuarioController.listar')
);

router.get(
  '/:id',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('usuarios.ver'), "can('usuarios.ver')"),
  ensureFn(usuarioController.obtenerPorId, 'usuarioController.obtenerPorId')
);

router.post(
  '/',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('usuarios.crear'), "can('usuarios.crear')"),
  ensureFn(usuarioController.crear, 'usuarioController.crear')
);

router.put(
  '/:id',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('usuarios.editar'), "can('usuarios.editar')"),
  ensureFn(usuarioController.actualizar, 'usuarioController.actualizar')
);

router.delete(
  '/:id',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('usuarios.eliminar'), "can('usuarios.eliminar')"),
  ensureFn(usuarioController.eliminar, 'usuarioController.eliminar')
);

module.exports = router;