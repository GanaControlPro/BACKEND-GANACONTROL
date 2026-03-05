// src/routes/ventas.routes.js
const router = require('express').Router();

const { authJwt } = require('../middlewares/authJwt');
const { authorize } = require('../middlewares/authorize');
const { validate } = require('../validators');
const { crearVentaSchema } = require('../validators/ventas.schema');
const c = require('../controllers/ventas.controller');

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
router.get('/ping', (req, res) => res.json({ ok: true, modulo: 'ventas' }));

// ventas: Admin y Contador
const canVentas = ['Administrador', 'Contador'];

router.get('/', authorize(canVentas), ensureFn(c.listar, 'ventasController.listar'));
router.get('/:id', authorize(canVentas), ensureFn(c.detalle, 'ventasController.detalle'));
router.post(
  '/',
  authorize(canVentas),
  validate(crearVentaSchema),
  ensureFn(c.crear, 'ventasController.crear')
);

module.exports = router;