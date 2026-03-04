const router = require('express').Router();
const { authJwt } = require('../middlewares/authJwt');
const { authorize } = require('../middlewares/authorize');
const { validate } = require('../validators');
const { crearGanadoSchema, actualizarGanadoSchema } = require('../validators/ganado.schema');
const c = require('../controllers/ganado.controller');

router.use(authJwt);

// ejemplo: Admin y Operario pueden manejar ganado
router.get('/', authorize(['Administrador','Operario','Veterinario']), c.listar);
router.post('/', authorize(['Administrador','Operario']), validate(crearGanadoSchema), c.crear);
router.put('/:id', authorize(['Administrador','Operario']), validate(actualizarGanadoSchema), c.actualizar);
router.delete('/:id', authorize(['Administrador']), c.eliminar);

module.exports = router;