const router = require('express').Router();
const { authJwt } = require('../middlewares/authJwt');
const c = require('../controllers/ganado.controller');

router.use(authJwt);
router.get('/', c.listar);
router.post('/', c.crear);
router.put('/:id', c.actualizar);
router.delete('/:id', c.eliminar);

module.exports = router;