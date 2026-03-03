const router = require('express').Router();
const { authJwt } = require('../middlewares/authJwt');
const c = require('../controllers/ventas.controller');

router.use(authJwt);
router.get('/', c.listar);
router.get('/:id', c.detalle);
router.post('/', c.crear);

module.exports = router;