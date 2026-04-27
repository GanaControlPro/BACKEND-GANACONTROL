const router = require('express').Router();
const { authJwt } = require('../middlewares/authJwt');
const { can } = require('../middlewares/can');
const { validate } = require('../validators');
const {
  crearProductoSchema,
  movimientoProductoSchema
} = require('../validators/productos.schema');
const c = require('../controllers/productos.controller');

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

router.get('/ping', (req, res) => res.json({ ok: true, modulo: 'productos' }));

// 🔥 NUEVA RUTA PARA SALUD
router.get(
  '/salud',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('productos.ver'), "can('productos.ver')"),
  ensureFn(c.listarParaSalud, 'productosController.listarParaSalud')
);

router.get(
  '/',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('productos.ver'), "can('productos.ver')"),
  ensureFn(c.listar, 'productosController.listar')
);

router.get(
  '/:id',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('productos.ver'), "can('productos.ver')"),
  ensureFn(c.obtenerPorId, 'productosController.obtenerPorId')
);

router.post(
  '/',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('productos.crear'), "can('productos.crear')"),
  ensureMw(validate(crearProductoSchema), 'validate(crearProductoSchema)'),
  ensureFn(c.crear, 'productosController.crear')
);

router.put(
  '/:id',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('productos.editar'), "can('productos.editar')"),
  ensureFn(c.actualizar, 'productosController.actualizar')
);

router.delete(
  '/:id',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('productos.eliminar'), "can('productos.eliminar')"),
  ensureFn(c.eliminar, 'productosController.eliminar')
);

router.post(
  '/movimientos',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('productos.editar'), "can('productos.editar')"),
  ensureMw(validate(movimientoProductoSchema), 'validate(movimientoProductoSchema)'),
  ensureFn(c.movimiento, 'productosController.movimiento')
);

module.exports = router;