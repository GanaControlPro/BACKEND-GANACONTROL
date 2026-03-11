const router = require('express').Router();

const {
  login,
  me,
  refresh,
  logout,
  logoutAll,
  sessions,
  googleLogin,
  forgotPassword,
  resetPassword
} = require('../controllers/auth.controller');

const { validate } = require('../validators');
const {
  loginSchema,
  refreshSchema,
  logoutSchema,
  googleLoginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} = require('../validators/auth.schema');

const { authJwt } = require('../middlewares/authJwt');

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

router.get('/ping', (req, res) => {
  return res.json({
    ok: true,
    modulo: 'auth'
  });
});

router.post(
  '/login',
  ensureMw(validate(loginSchema), 'validate(loginSchema)'),
  ensureFn(login, 'login')
);

router.post(
  '/google',
  ensureMw(validate(googleLoginSchema), 'validate(googleLoginSchema)'),
  ensureFn(googleLogin, 'googleLogin')
);

router.get(
  '/me',
  ensureMw(authJwt, 'authJwt'),
  ensureFn(me, 'me')
);

router.post(
  '/refresh',
  ensureMw(validate(refreshSchema), 'validate(refreshSchema)'),
  ensureFn(refresh, 'refresh')
);

router.post(
  '/logout',
  ensureMw(validate(logoutSchema), 'validate(logoutSchema)'),
  ensureFn(logout, 'logout')
);

router.post(
  '/logout-all',
  ensureMw(authJwt, 'authJwt'),
  ensureFn(logoutAll, 'logoutAll')
);

router.get(
  '/sessions',
  ensureMw(authJwt, 'authJwt'),
  ensureFn(sessions, 'sessions')
);

router.post(
  '/forgot-password',
  ensureMw(validate(forgotPasswordSchema), 'validate(forgotPasswordSchema)'),
  ensureFn(forgotPassword, 'forgotPassword')
);

router.post(
  '/reset-password',
  ensureMw(validate(resetPasswordSchema), 'validate(resetPasswordSchema)'),
  ensureFn(resetPassword, 'resetPassword')
);

module.exports = router;