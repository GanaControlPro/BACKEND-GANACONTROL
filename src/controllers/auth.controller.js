const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Rol } = require('../models');
const { ok, fail } = require('../utils/response');

function getJwtConfig() {
  const secret = process.env.JWT_SECRET;
  if (!secret || String(secret).trim().length < 10) {
    return { secret: null, expiresIn: null };
  }
  return {
    secret,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  };
}

async function login(req, res, next) {
  try {
    const { correo, contrasena } = req.body || {};

    if (!correo || !contrasena) {
      return fail(res, { code: 400, mensaje: 'correo y contrasena son obligatorios' });
    }

    const user = await Usuario.findOne({
      where: { correo: String(correo).trim().toLowerCase(), activo: true },
      include: [{ model: Rol, as: 'rol' }],
    });

    if (!user) {
      return fail(res, { code: 401, mensaje: 'Credenciales inválidas' });
    }

    const okPass = await bcrypt.compare(String(contrasena), String(user.contrasena));
    if (!okPass) {
      return fail(res, { code: 401, mensaje: 'Credenciales inválidas' });
    }

    const rolNombre = user.rol?.nombre || null;

    const payload = {
      id: user.id,
      finca_id: user.finca_id,
      rol: rolNombre,
    };

    const { secret, expiresIn } = getJwtConfig();
    if (!secret) {
      return fail(res, {
        code: 500,
        mensaje: 'JWT_SECRET no está configurado correctamente en el servidor',
      });
    }

    const token = jwt.sign(payload, secret, { expiresIn });

    return ok(res, {
      mensaje: 'Login exitoso',
      data: {
        token,
        expiresIn,
        usuario: {
          id: user.id,
          finca_id: user.finca_id,
          rol: rolNombre,
          nombres: user.nombres,
          correo: user.correo,
        },
      },
    });
  } catch (e) {
    console.error('Auth.login:', e);
    return next(e);
  }
}

async function me(req, res) {
  if (!req.user) {
    return fail(res, { code: 401, mensaje: 'No autorizado' });
  }

  return ok(res, { mensaje: 'OK', data: req.user });
}

module.exports = { login, me };