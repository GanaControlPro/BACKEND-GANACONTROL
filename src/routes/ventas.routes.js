const router = require('express').Router();
const { authJwt } = require('../middlewares/authJwt');
const { authorize } = require('../middlewares/authorize');
const { validate } = require('../validators');
const { crearVentaSchema } = require('../validators/ventas.schema');
const c = require('../controllers/ventas.controller');

router.use(authJwt);

// ventas: Admin y Contador
router.get('/', authorize(['Administrador','Contador']), c.listar);
router.get('/:id', authorize(['Administrador','Contador']), c.detalle);
router.post('/', authorize(['Administrador','Contador']), validate(crearVentaSchema), c.crear);

module.exports = router;