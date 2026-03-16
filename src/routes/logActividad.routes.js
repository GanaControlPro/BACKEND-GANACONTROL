const router = require('express').Router();
const {
  listarLogs,
  obtenerLogPorId
} = require('../controllers/logActividad.controller');
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

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Listar todos los logs de actividad
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de logs de actividad
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado por permisos
 */
router.get(
  '/',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('logs.ver'), "can('logs.ver')"),
  ensureFn(listarLogs, 'listarLogs')
);

/**
 * @swagger
 * /logs/{id}:
 *   get:
 *     summary: Obtener un log de actividad por ID
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del log de actividad
 *     responses:
 *       200:
 *         description: Log encontrado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado por permisos
 *       404:
 *         description: Log no encontrado
 */
router.get(
  '/:id',
  ensureMw(authJwt, 'authJwt'),
  ensureMw(can('logs.ver'), "can('logs.ver')"),
  ensureFn(obtenerLogPorId, 'obtenerLogPorId')
);

module.exports = router;