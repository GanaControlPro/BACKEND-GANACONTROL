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

const {
  loginLimiter,
  refreshLimiter,
  forgotPasswordLimiter,
  resetPasswordLimiter,
  googleLoginLimiter
} = require('../middlewares/authLimiter');

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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Validación fallida
 *       401:
 *         description: Credenciales inválidas
 */
router.post(
  '/login',
  ensureMw(loginLimiter, 'loginLimiter'),
  ensureMw(validate(loginSchema), 'validate(loginSchema)'),
  ensureFn(login, 'login')
);

router.post(
  '/google',
  ensureMw(googleLoginLimiter, 'googleLoginLimiter'),
  ensureMw(validate(googleLoginSchema), 'validate(googleLoginSchema)'),
  ensureFn(googleLogin, 'googleLogin')
);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtener usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       401:
 *         description: No autorizado
 */
router.get(
  '/me',
  ensureMw(authJwt, 'authJwt'),
  ensureFn(me, 'me')
);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Renovar tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshRequest'
 *     responses:
 *       200:
 *         description: Token renovado
 *       401:
 *         description: Refresh token inválido
 */
router.post(
  '/refresh',
  ensureMw(refreshLimiter, 'refreshLimiter'),
  ensureMw(validate(refreshSchema), 'validate(refreshSchema)'),
  ensureFn(refresh, 'refresh')
);

router.post(
  '/logout',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(validate(logoutSchema), 'validate(logoutSchema)'),
  ensureFn(logout, 'logout')
);

/**
 * @swagger
 * /auth/logout-all:
 *   post:
 *     summary: Cerrar todas las sesiones del usuario
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Todas las sesiones fueron cerradas
 *       401:
 *         description: No autorizado
 */
router.post(
  '/logout-all',
  ensureMw(authJwt, 'authJwt'),
  ensureFn(logoutAll, 'logoutAll')
);

/**
 * @swagger
 * /auth/sessions:
 *   get:
 *     summary: Listar sesiones activas del usuario
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sesiones activas
 *       401:
 *         description: No autorizado
 */
router.get(
  '/sessions',
  ensureMw(authJwt, 'authJwt'),
  ensureFn(sessions, 'sessions')
);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       200:
 *         description: Solicitud procesada
 */
router.post(
  '/forgot-password',
  ensureMw(forgotPasswordLimiter, 'forgotPasswordLimiter'),
  ensureMw(validate(forgotPasswordSchema), 'validate(forgotPasswordSchema)'),
  ensureFn(forgotPassword, 'forgotPassword')
);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Restablecer contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Token inválido o expirado
 */
router.post(
  '/reset-password',
  ensureMw(resetPasswordLimiter, 'resetPasswordLimiter'),
  ensureMw(validate(resetPasswordSchema), 'validate(resetPasswordSchema)'),
  ensureFn(resetPassword, 'resetPassword')
);

module.exports = router;