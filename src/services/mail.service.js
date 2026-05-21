const nodemailer = require("nodemailer");

const LOGO_URL =
  "https://raw.githubusercontent.com/Jair-Arias/GANACONTROL/main/img/cow.png";

function getTransporter() {
  if (
    !process.env.MAIL_HOST ||
    !process.env.MAIL_PORT ||
    !process.env.MAIL_USER ||
    !process.env.MAIL_PASS
  ) {
    throw new Error("Configuración de correo incompleta");
  }

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: String(process.env.MAIL_SECURE) === "true",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

function normalizarResetLink(resetLink) {
  const link = String(resetLink || "").trim();

  if (!link) return "";

  if (link.includes("/#/reset-password")) {
    return link;
  }

  if (link.includes("/reset-password")) {
    return link.replace("/reset-password", "/#/reset-password");
  }

  return link;
}

async function sendMail({ to, subject, html, text }) {
  const transporter = getTransporter();

  return transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to,
    subject,
    text,
    html,
  });
}

async function sendResetPasswordMail({ to, resetLink, userName }) {
  const subject = "Recuperación de contraseña - GanaControl";
  const safeResetLink = normalizarResetLink(resetLink);

  console.log("📩 LINK FINAL EN CORREO:", safeResetLink);

  const text = [
    `Hola ${userName || "usuario"},`,
    "",
    "Recibimos una solicitud para restablecer tu contraseña en GanaControl.",
    `Abre este enlace: ${safeResetLink}`,
    "",
    "Si no solicitaste este cambio, puedes ignorar este mensaje.",
    "Este enlace expira en 30 minutos.",
    "",
    "— El equipo de GanaControl",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Recuperación de contraseña - GanaControl</title>
</head>

<body style="margin:0;padding:0;background-color:#e8ede4;font-family:Georgia,serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e8ede4;padding:40px 16px;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.12);">

          <tr>
            <td style="background-color:#16361b;padding:38px 48px;text-align:center;">
              <div style="margin-bottom:16px;">
                <img
                  src="${LOGO_URL}"
                  alt="GanaControl"
                  width="64"
                  height="64"
                  style="display:inline-block;width:64px;height:64px;border-radius:50%;border:2px solid #d6b84c;object-fit:cover;background-color:#4a8c3f;"
                />
              </div>

              <div style="font-size:28px;font-weight:bold;color:#f5f1d8;letter-spacing:3px;text-transform:uppercase;line-height:1.2;">
                GanaControl
              </div>

              <div style="font-size:11px;color:#d6b84c;letter-spacing:5px;text-transform:uppercase;margin-top:8px;line-height:1.4;">
                Gestión Ganadera Inteligente
              </div>
            </td>
          </tr>

          <tr>
            <td style="height:5px;background:linear-gradient(90deg,#1f6b38 0%,#d6b84c 50%,#1f6b38 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <tr>
            <td style="padding:48px 48px 38px;">
              <h1 style="margin:0 0 8px;font-size:24px;color:#1a3a1f;font-weight:normal;letter-spacing:1px;line-height:1.3;">
                Recuperación de contraseña
              </h1>

              <div style="width:56px;height:3px;background-color:#d6b84c;margin-bottom:28px;"></div>

              <p style="margin:0 0 16px;font-size:15px;color:#2c4a2e;line-height:1.7;">
                Hola <strong style="color:#1a3a1f;">${userName || "usuario"}</strong>,
              </p>

              <p style="margin:0 0 30px;font-size:15px;color:#3d5c3f;line-height:1.8;">
                Recibimos una solicitud para restablecer la contraseña de tu cuenta en
                <strong style="color:#1a3a1f;"> GanaControl</strong>. Si fuiste tú, haz clic en el siguiente botón para continuar con el proceso de forma segura:
              </p>

              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="border-radius:8px;background:linear-gradient(135deg,#1f6b38,#d6b84c);box-shadow:0 6px 18px rgba(31,107,56,0.24);">
                    <a
                      href="${safeResetLink}"
                      target="_blank"
                      rel="noopener noreferrer"
                      style="display:inline-block;padding:15px 38px;font-size:14px;letter-spacing:2px;text-transform:uppercase;color:#ffffff;text-decoration:none;font-weight:bold;"
                    >
                      Restablecer contraseña
                    </a>
                  </td>
                </tr>
              </table>

              <div style="background-color:#f4f8f1;border:1px solid #d0e8d0;border-radius:8px;padding:16px 18px;margin-bottom:28px;">
                <p style="margin:0 0 8px;font-size:12px;color:#6a8c6c;line-height:1.5;">
                  Si el botón no funciona, copia y pega este enlace en tu navegador:
                </p>

                <p style="margin:0;word-break:break-all;">
                  <a
                    href="${safeResetLink}"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="font-size:12px;color:#1f6b38;text-decoration:underline;"
                  >
                    ${safeResetLink}
                  </a>
                </p>
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="border-top:1px solid #d0e8d0;"></td>
                </tr>
              </table>

              <p style="margin:0;font-size:13px;color:#6a8c6c;line-height:1.8;">
                🔒 Si <strong>no solicitaste</strong> este cambio, puedes ignorar este mensaje.
                Tu contraseña permanecerá sin cambios. Este enlace expira en
                <strong>30 minutos</strong>.
              </p>
            </td>
          </tr>

          <tr>
            <td style="height:5px;background:linear-gradient(90deg,#1f6b38 0%,#d6b84c 50%,#1f6b38 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <tr>
            <td style="background-color:#16361b;padding:28px 48px;text-align:center;">
              <p style="margin:0 0 6px;font-size:11px;color:#d6b84c;letter-spacing:2px;text-transform:uppercase;line-height:1.5;">
                GanaControl &mdash; Gestión Ganadera Inteligente
              </p>
              <p style="margin:0;font-size:11px;color:#8aa58b;line-height:1.5;">
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

  return sendMail({
    to,
    subject,
    text,
    html,
  });
}

module.exports = {
  sendMail,
  sendResetPasswordMail,
};