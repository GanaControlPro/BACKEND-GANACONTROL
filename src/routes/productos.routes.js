// src/routes/productos.routes.js
const router = require('express').Router();
const { authJwt } = require('../middlewares/authJwt');
const { authorize } = require('../middlewares/authorize');
const { validate } = require('../validators');
const { crearProductoSchema, movimientoProductoSchema } = require('../validators/productos.schema');
const c = require('../controllers/productos.controller');

// Anti error: "argument handler must be a function"
const ensureFn = (fn, name) => {
  if (typeof fn !== 'function') {
    return (req, res) =>
      res.status(500).json({ ok: false, mensaje: `Handler inválido: ${name} no es función` });
  }
  return fn;
};

router.use(authJwt);

// Health
router.get('/ping', (req, res) => res.json({ ok: true, modulo: 'productos' }));

// Roles (ajusta a tu gusto)
// const canRead = ['Administrador', 'Operario', 'Veterinario'];
const canRead = ['Administrador', 'Operario'];
const canWrite = ['Administrador', 'Operario'];

router.get('/', authorize(canRead), ensureFn(c.listar, 'productosController.listar'));

router.post(
  '/',
  authorize(canWrite),
  validate(crearProductoSchema),
  ensureFn(c.crear, 'productosController.crear')
);

router.post(
  '/movimientos',
  authorize(canWrite),
  validate(movimientoProductoSchema),
  ensureFn(c.movimiento, 'productosController.movimiento')
);

module.exports = router;