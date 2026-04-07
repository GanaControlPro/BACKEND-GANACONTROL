const router = require('express').Router();
const { resumen, ventasMes, produccionMes, stockBajo, alertas } = require('../controllers/dashboard.controller');
const { authJwt } = require('../middlewares/authJwt');
const { can } = require('../middlewares/can');

const ensureFn = (fn, name) => {
  if (typeof fn !== 'function') {
    throw new Error(`Handler inválido: ${name} no es función`);
  }
  return fn;
};

const ensureMw = (mw, name) => {
  if (typeof mw !== 'function') {
    throw new Error(`Middleware inválido: ${name} no es función`);
  }
  return mw;
};

router.get(
  '/resumen',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('dashboard.ver'), "can('dashboard.ver')"),
  ensureFn(resumen, 'resumen')
);

router.get(
  '/ventas-mes',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('dashboard.ver'), "can('dashboard.ver')"),
  ensureFn(ventasMes, 'ventasMes')
);

router.get(
  '/produccion-mes',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('dashboard.ver'), "can('dashboard.ver')"),
  ensureFn(produccionMes, 'produccionMes')
);

router.get(
  '/stock-bajo',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('dashboard.ver'), "can('dashboard.ver')"),
  ensureFn(stockBajo, 'stockBajo')
);

router.get(
  '/alertas',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('dashboard.ver'), "can('dashboard.ver')"),
  ensureFn(alertas, 'alertas')
);

module.exports = router;