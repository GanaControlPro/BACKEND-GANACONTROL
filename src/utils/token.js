const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function getAccessConfig() {
  const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_ACCESS_EXPIRES || '15m';

  if (!secret || String(secret).trim().length < 10) {
    throw new Error('JWT_ACCESS_SECRET no configurado correctamente');
  }

  return { secret, expiresIn };
}

function getRefreshConfig() {
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_REFRESH_EXPIRES || '7d';

  if (!secret || String(secret).trim().length < 10) {
    throw new Error('JWT_REFRESH_SECRET no configurado correctamente');
  }

  return { secret, expiresIn };
}

function signAccessToken(usuario) {
  const { secret, expiresIn } = getAccessConfig();

  return jwt.sign(
    {
      id: usuario.id,
      finca_id: usuario.finca_id,
      rol: usuario.rol,
      tipo: 'access'
    },
    secret,
    { expiresIn }
  );
}

function signRefreshToken(usuario, sesionId) {
  const { secret, expiresIn } = getRefreshConfig();

  return jwt.sign(
    {
      id: usuario.id,
      sesionId,
      tipo: 'refresh'
    },
    secret,
    { expiresIn }
  );
}

function verifyAccessToken(token) {
  const { secret } = getAccessConfig();
  return jwt.verify(token, secret);
}

function verifyRefreshToken(token) {
  const { secret } = getRefreshConfig();
  return jwt.verify(token, secret);
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function getRefreshExpiresAt() {
  const days = Number(process.env.JWT_REFRESH_DAYS || 7);
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + days);
  return fecha;
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  hashToken,
  getRefreshExpiresAt
};