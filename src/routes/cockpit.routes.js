const router = require('express').Router();
const c = require('../controllers/cockpit.controller');
const { authJwt } = require('../middlewares/authJwt');

router.get('/kpis', authJwt, c.kpis);
router.get('/crecimiento', authJwt, c.crecimiento);
router.get('/liquidacion', authJwt, c.liquidacion);
router.get('/transacciones', authJwt, c.transacciones);

module.exports = router;