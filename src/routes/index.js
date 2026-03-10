const router = require('express').Router();

// Health general de la API
router.get('/ping', (req, res) => res.json({ ok: true, api: 'ganacontrol' }));

router.use('/auth', require('./auth.routes'));
router.use('/roles', require('./rol.routes'));
router.use('/usuarios', require('./usuario.routes'));
router.use('/ganado', require('./ganado.routes'));
router.use('/productos', require('./productos.routes'));
router.use('/ventas', require('./ventas.routes'));
router.use('/potreros', require('./potrero.routes'));
router.use('/produccion', require('./produccion.routes'));
router.use('/alimentacion', require('./alimentacion.routes'));
router.use('/eventos-sanitarios', require('./eventoSanitario.routes'));
router.use('/reproduccion', require('./reproduccion.routes'));
router.use('/detalle-venta-ganado', require('./detalleVentaGanado.routes'));
router.use('/detalle-venta-producto', require('./detalleVentaProducto.routes'));

module.exports = router;