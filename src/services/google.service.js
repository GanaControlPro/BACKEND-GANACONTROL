const { OAuth2Client } = require('google-auth-library');

function getGoogleClient() {
  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error('GOOGLE_CLIENT_ID no está configurado');
  }

  return new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
}

async function verifyGoogleIdToken(idToken) {
  if (!idToken || String(idToken).trim() === '') {
    throw new Error('idToken de Google no proporcionado');
  }

  const client = getGoogleClient();

  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error('No fue posible obtener el payload del token de Google');
  }

  return {
    googleId: payload.sub,
    correo: payload.email,
    emailVerificado: !!payload.email_verified,
    nombres: payload.name || '',
    fotoUrl: payload.picture || null
  };
}

module.exports = {
  verifyGoogleIdToken
};