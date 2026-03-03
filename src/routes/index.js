const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/ganado', require('./ganado.routes'));
router.use('/productos', require('./productos.routes'));
router.use('/ventas', require('./ventas.routes'));

module.exports = router;