const router = require('express').Router();
const { authJwt } = require('../middlewares/authJwt');
const c = require('../controllers/productos.controller');

router.use(authJwt);
router.get('/', c.listar);
router.post('/', c.crear);
router.post('/movimientos', c.movimiento);

module.exports = router;