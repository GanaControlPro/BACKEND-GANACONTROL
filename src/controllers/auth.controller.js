const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Rol } = require('../models');

async function login(req, res, next) {
  try {
    const { correo, contrasena } = req.body;

    const user = await Usuario.findOne({
      where: { correo, activo: true },
      include: [{ model: Rol }]
    });

    if (!user) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    const ok = await bcrypt.compare(contrasena, user.contrasena);
    if (!ok) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    const payload = {
      id: user.id,
      finca_id: user.finca_id,
      rol: user.Rol?.nombre || null
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

    return res.json({
      token,
      usuario: {
        id: user.id,
        finca_id: user.finca_id,
        rol: payload.rol,
        nombres: user.nombres,
        correo: user.correo
      }
    });
  } catch (e) { next(e); }
}

module.exports = { login };