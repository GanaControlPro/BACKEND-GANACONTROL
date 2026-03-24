const router = require('express').Router();
const { authJwt } = require('../middlewares/authJwt');
const { can } = require('../middlewares/can');
const { validate } = require('../validators');
const { crearGanadoSchema, actualizarGanadoSchema } = require('../validators/ganado.schema');
const uploadGanado = require('../middlewares/uploadGanado');
const c = require('../controllers/ganado.controller');

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

router.get('/ping', (req, res) => res.json({ ok: true, modulo: 'ganado' }));

router.get(
  '/',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('ganado.ver'), "can('ganado.ver')"),
  ensureFn(c.listar, 'c.listar')
);

router.get(
  '/:id',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('ganado.ver'), "can('ganado.ver')"),
  ensureFn(c.obtenerPorId, 'c.obtenerPorId')
);

router.post(
  '/',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('ganado.crear'), "can('ganado.crear')"),
  uploadGanado.single('foto'),
  ensureMw(validate(crearGanadoSchema), 'validate(crearGanadoSchema)'),
  ensureFn(c.crear, 'c.crear')
);

router.put(
  '/:id',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('ganado.editar'), "can('ganado.editar')"),
  uploadGanado.single('foto'),
  ensureMw(validate(actualizarGanadoSchema), 'validate(actualizarGanadoSchema)'),
  ensureFn(c.actualizar, 'c.actualizar')
);

router.delete(
  '/:id',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('ganado.eliminar'), "can('ganado.eliminar')"),
  ensureFn(c.eliminar, 'c.eliminar')
);

module.exports = router;