const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Rol } = require('../models');
const { ok, fail } = require('../utils/response');

async function login(req, res, next) {
  try {
    const { correo, contrasena } = req.body;

    const user = await Usuario.findOne({
      where: { correo, activo: true },
      include: [{ model: Rol }]
    });

    if (!user) return fail(res, { code: 401, mensaje: 'Credenciales inválidas' });

    const okPass = await bcrypt.compare(contrasena, user.contrasena);
    if (!okPass) return fail(res, { code: 401, mensaje: 'Credenciales inválidas' });

    const payload = { id: user.id, finca_id: user.finca_id, rol: user.Rol?.nombre || null };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

    return ok(res, {
      mensaje: 'Login exitoso',
      data: {
        token,
        usuario: {
          id: user.id,
          finca_id: user.finca_id,
          rol: payload.rol,
          nombres: user.nombres,
          correo: user.correo
        }
      }
    });
  } catch (e) { next(e); }
}

async function me(req, res) {
  return ok(res, { mensaje: 'OK', data: req.user });
}

module.exports = { login, me };