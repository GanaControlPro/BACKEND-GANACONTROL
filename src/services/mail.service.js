const nodemailer = require('nodemailer');

function getTransporter() {
  if (!process.env.MAIL_HOST || !process.env.MAIL_PORT || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error('Configuración de correo incompleta');
  }

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: String(process.env.MAIL_SECURE) === 'true',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
}

async function sendMail({ to, subject, html, text }) {
  const transporter = getTransporter();

  return transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to,
    subject,
    text,
    html
  });
}

async function sendResetPasswordMail({ to, resetLink, userName }) {
  const subject = 'Recuperación de contraseña - GanaControl';

  const text = [
    `Hola ${userName || 'usuario'},`,
    '',
    'Recibimos una solicitud para restablecer tu contraseña.',
    `Abre este enlace: ${resetLink}`,
    '',
    'Si no solicitaste este cambio, puedes ignorar este mensaje.'
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Recuperación de contraseña</h2>
      <p>Hola ${userName || 'usuario'},</p>
      <p>Recibimos una solicitud para restablecer tu contraseña.</p>
      <p>
        <a href="${resetLink}" style="display:inline-block;padding:10px 16px;text-decoration:none;border-radius:6px;border:1px solid #ccc;">
          Restablecer contraseña
        </a>
      </p>
      <p>Si el botón no funciona, usa este enlace:</p>
      <p>${resetLink}</p>
      <p>Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
    </div>
  `;

  return sendMail({
    to,
    subject,
    text,
    html
  });
}

module.exports = {
  sendMail,
  sendResetPasswordMail
};