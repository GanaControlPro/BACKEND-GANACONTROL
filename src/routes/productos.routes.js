const router = require('express').Router();
const { authJwt } = require('../middlewares/authJwt');
const { authorize } = require('../middlewares/authorize');
const { validate } = require('../validators');
const { crearProductoSchema, movimientoProductoSchema } = require('../validators/productos.schema');
const c = require('../controllers/productos.controller');

router.use(authJwt);

// ejemplo: inventario lo llevan Admin/Operario
router.get('/', authorize(['Administrador','Operario']), c.listar);
router.post('/', authorize(['Administrador','Operario']), validate(crearProductoSchema), c.crear);
router.post('/movimientos', authorize(['Administrador','Operario']), validate(movimientoProductoSchema), c.movimiento);

module.exports = router;