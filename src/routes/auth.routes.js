const router = require('express').Router();
const { login, me } = require('../controllers/auth.controller');
const { validate } = require('../validators');
const { loginSchema } = require('../validators/auth.schema');
const { authJwt } = require('../middlewares/authJwt');

router.post('/login', validate(loginSchema), login);
router.get('/me', authJwt, me);

module.exports = router;