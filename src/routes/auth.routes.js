const router = require('express').Router();
const { login, me } = require('../controllers/auth.controller');
const { validate } = require('../validators');
const { loginSchema } = require('../validators/auth.schema');
const { authJwt } = require('../middlewares/authJwt');

// Helpers anti "argument handler must be a function"
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

router.get('/ping', (req, res) => res.json({ ok: true, modulo: 'auth' }));

router.post(
  '/login',
  ensureMw(validate(loginSchema), 'validate(loginSchema)'),
  ensureFn(login, 'login')
);

router.get(
  '/me',
  ensureMw(authJwt, 'authJwt'),
  ensureFn(me, 'me')
);

module.exports = router;