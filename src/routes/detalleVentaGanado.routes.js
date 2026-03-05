const express = require('express');
const router = express.Router();

const controller = require('../controllers/detalleVentaGanado.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// proteger todas las rutas con autenticación
router.use(authMiddleware);

// ===== CRUD DETALLE VENTA GANADO =====

// obtener todos los detalles
router.get('/', controller.getAll);

// obtener un detalle por id
router.get('/:id', controller.getById);

// crear nuevo detalle
router.post('/', controller.create);

// actualizar detalle
router.put('/:id', controller.update);

// eliminar detalle
router.delete('/:id', controller.remove);

module.exports = router;