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
    'Si no solicitaste este cambio, puedes ignorar este mensaje.',
    '',
    '— El equipo de GanaControl'
  ].join('\n');

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Recuperación de contraseña</title>
</head>
<body style="margin:0;padding:0;background-color:#e8ede4;font-family:'Georgia',serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#e8ede4;padding:40px 16px;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#1a3a1f;padding:36px 48px;text-align:center;">
              <div style="display:inline-block;width:60px;height:60px;background-color:#4a8c3f;border-radius:50%;line-height:60px;font-size:28px;color:#fff;text-align:center;margin-bottom:16px;border:2px solid #7ab86e;">
                &#x1F404;
              </div>
              <br/>
              <span style="font-family:'Georgia',serif;font-size:26px;font-weight:bold;color:#e8f5e4;letter-spacing:3px;text-transform:uppercase;">
                GanaControl
              </span>
              <br/>
              <span style="font-size:11px;color:#7ab86e;letter-spacing:5px;text-transform:uppercase;display:block;margin-top:5px;">
                Gestión Ganadera Inteligente
              </span>
            </td>
          </tr>

          <!-- Green gradient bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#2d6a27 0%,#7ab86e 50%,#2d6a27 100%);"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px 48px 36px;">
              <h1 style="margin:0 0 8px;font-family:'Georgia',serif;font-size:22px;color:#1a3a1f;font-weight:normal;letter-spacing:1px;">
                Recuperación de contraseña
              </h1>
              <div style="width:48px;height:2px;background-color:#4a8c3f;margin-bottom:28px;"></div>

              <p style="margin:0 0 16px;font-size:15px;color:#2c4a2e;line-height:1.7;">
                Hola <strong style="color:#1a3a1f;">${userName || 'usuario'}</strong>,
              </p>

              <p style="margin:0 0 32px;font-size:15px;color:#3d5c3f;line-height:1.7;">
                Recibimos una solicitud para restablecer la contraseña de tu cuenta en GanaControl.
                Si fuiste tú, haz clic en el siguiente botón para continuar:
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="border-radius:4px;background-color:#1a3a1f;">
                    <a href="${resetLink}"
                       style="display:inline-block;padding:14px 36px;font-family:'Georgia',serif;font-size:14px;letter-spacing:2px;text-transform:uppercase;color:#e8f5e4;text-decoration:none;font-weight:bold;">
                      Restablecer contraseña
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 6px;font-size:12px;color:#6a8c6c;line-height:1.5;">
                Si el botón no funciona, copia y pega este enlace en tu navegador:
              </p>
              <p style="margin:0 0 32px;word-break:break-all;">
                <a href="${resetLink}" style="font-size:12px;color:#4a8c3f;text-decoration:underline;">${resetLink}</a>
              </p>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr><td style="border-top:1px solid #d0e8d0;"></td></tr>
              </table>

              <!-- Security note -->
              <p style="margin:0;font-size:13px;color:#6a8c6c;line-height:1.7;">
                🔒 Si <strong>no solicitaste</strong> este cambio, puedes ignorar este mensaje. Tu contraseña permanecerá sin cambios.
                Este enlace expira en <strong>24 horas</strong>.
              </p>
            </td>
          </tr>

          <!-- Green gradient bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#2d6a27 0%,#7ab86e 50%,#2d6a27 100%);"></td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#1a3a1f;padding:28px 48px;text-align:center;">
              <p style="margin:0 0 6px;font-size:11px;color:#7ab86e;letter-spacing:2px;text-transform:uppercase;">
                GanaControl &mdash; Gestión Ganadera Inteligente
              </p>
              <p style="margin:0;font-size:11px;color:#4a6a4c;">
                Este es un mensaje automático, por favor no respondas a este correo.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

  return sendMail({ to, subject, text, html });
}

module.exports = {
  sendMail,
  sendResetPasswordMail
};