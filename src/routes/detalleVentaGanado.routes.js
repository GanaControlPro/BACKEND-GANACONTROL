const express = require('express');
const router = express.Router();

const controller = require('../controllers/detalleVentaGanado.controller');
const { authJwt } = require('../middlewares/authJwt');
const { can } = require('../middlewares/can');

router.use(authJwt);

router.get('/', can('ventas.ver'), controller.getAll);
router.get('/:id', can('ventas.ver'), controller.getById);
router.post('/', can('ventas.crear'), controller.create);
router.put('/:id', can('ventas.editar'), controller.update);
router.delete('/:id', can('ventas.eliminar'), controller.remove);

module.exports = router;