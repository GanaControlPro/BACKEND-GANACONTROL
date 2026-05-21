const bcrypt = require("bcryptjs");
const { Usuario, Rol, Permiso, Sesion } = require("../models");
const { verifyGoogleIdToken } = require("../services/google.service");
const crypto = require("crypto");
const { registrarActividad } = require("../services/logActividad.service");
const { sendResetPasswordMail } = require("../services/mail.service");
const { ok, fail } = require("../utils/response");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashToken,
  getRefreshExpiresAt,
} = require("../utils/token");

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function getRequestMeta(req) {
  return {
    ip: req.ip || req.headers["x-forwarded-for"] || null,
    userAgent: req.get("user-agent") || null,
    dispositivo: req.get("user-agent") || "Desconocido",
  };
}

function obtenerPermisosUsuario(user) {
  return Array.isArray(user?.rol?.permisos)
    ? user.rol.permisos.map((p) => p.codigo).filter(Boolean)
    : [];
}

function buildUserPayload(user) {
  return {
    id: user.id,
    finca_id: user.finca_id,
    rol_id: user.rol_id,
    rol: user.rol?.nombre || user.rol || null,
    permisos: obtenerPermisosUsuario(user),
  };
}

function buildUserResponse(user) {
  return {
    id: user.id,
    finca_id: user.finca_id,
    rol_id: user.rol_id,
    rol: user.rol?.nombre || user.rol || null,
    nombres: user.nombres,
    apellidos: user.apellidos,
    correo: user.correo,
    activo: user.activo,
    proveedor_auth: user.proveedor_auth,
    email_verificado: user.email_verificado,
    foto_url: user.foto_url,
    ultimo_login: user.ultimo_login,
    permisos: obtenerPermisosUsuario(user),
  };
}

const includeRolPermisos = [
  {
    model: Rol,
    as: "rol",
    attributes: ["id", "nombre"],
    include: [
      {
        model: Permiso,
        as: "permisos",
        attributes: ["id", "codigo", "nombre", "descripcion"],
        through: { attributes: [] },
      },
    ],
  },
];

function ensureSesionModel() {
  if (!Sesion) {
    throw new Error("El modelo Sesion no está disponible en ../models");
  }
}

function handleControllerError(res, scope, error) {
  console.error(`${scope}:`, error);

  const message = error?.message || "Error en el servidor";
  const status = error?.statusCode || 500;

  return fail(res, message, null, status);
}

function splitName(fullName = "") {
  const clean = String(fullName).trim();

  if (!clean) {
    return { nombres: "Usuario Google", apellidos: "" };
  }

  const parts = clean.split(/\s+/);

  if (parts.length === 1) {
    return { nombres: parts[0], apellidos: "" };
  }

  return {
    nombres: parts.slice(0, 2).join(" "),
    apellidos: parts.slice(2).join(" "),
  };
}

function generateResetToken() {
  return crypto.randomBytes(32).toString("hex");
}

function hashResetToken(token) {
  return crypto.createHash("sha256").update(String(token)).digest("hex");
}

function getResetTokenExpiresAt() {
  const fecha = new Date();
  fecha.setMinutes(fecha.getMinutes() + 30);
  return fecha;
}

async function findActiveUserByEmail(correo) {
  return Usuario.findOne({
    where: {
      correo: normalizeEmail(correo),
      activo: true,
    },
    include: includeRolPermisos,
  });
}

async function findActiveUserById(id) {
  return Usuario.findOne({
    where: {
      id,
      activo: true,
    },
    include: includeRolPermisos,
  });
}

async function findUserByGoogleId(googleId) {
  return Usuario.findOne({
    where: {
      google_id: googleId,
      activo: true,
    },
    include: includeRolPermisos,
  });
}

async function findUserByEmailAnyStatus(correo) {
  return Usuario.findOne({
    where: {
      correo: normalizeEmail(correo),
    },
    include: includeRolPermisos,
  });
}

async function createSessionForUser(user, req) {
  ensureSesionModel();

  const meta = getRequestMeta(req);

  return Sesion.create({
    usuario_id: user.id,
    refresh_token_hash: "pendiente",
    ip: meta.ip,
    user_agent: meta.userAgent,
    dispositivo: meta.dispositivo,
    ultimo_uso: new Date(),
    expira_en: getRefreshExpiresAt(),
    revocada: false,
  });
}

async function issueTokensForSession(user, sesion) {
  const payload = buildUserPayload(user);

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload, sesion.id);

  await sesion.update({
    refresh_token_hash: hashToken(refreshToken),
    ultimo_uso: new Date(),
    expira_en: getRefreshExpiresAt(),
  });

  return { accessToken, refreshToken };
}

async function revokeSessionById(sesionId) {
  ensureSesionModel();

  const sesion = await Sesion.findByPk(sesionId);

  if (!sesion) {
    return null;
  }

  await sesion.update({
    revocada: true,
    ultimo_uso: new Date(),
  });

  return sesion;
}

async function validateRefreshTokenAndSession(refreshToken) {
  ensureSesionModel();

  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    return {
      ok: false,
      status: 401,
      message: "Refresh token inválido o expirado",
    };
  }

  const sesion = await Sesion.findByPk(payload.sesionId);

  if (!sesion) {
    return {
      ok: false,
      status: 401,
      message: "Sesión no encontrada",
    };
  }

  if (sesion.revocada) {
    return {
      ok: false,
      status: 401,
      message: "Sesión revocada",
    };
  }

  if (new Date(sesion.expira_en) < new Date()) {
    return {
      ok: false,
      status: 401,
      message: "Sesión expirada",
    };
  }

  const hashGuardado = sesion.refresh_token_hash;
  const hashRecibido = hashToken(refreshToken);

  if (hashGuardado !== hashRecibido) {
    return {
      ok: false,
      status: 401,
      message: "Refresh token inválido",
    };
  }

  return {
    ok: true,
    payload,
    sesion,
  };
}

async function login(req, res) {
  try {
    ensureSesionModel();

    const { correo, contrasena } = req.body || {};

    if (!correo || !contrasena) {
      return fail(res, "correo y contrasena son obligatorios", null, 400);
    }

    const user = await findActiveUserByEmail(correo);

    if (!user) {
      return fail(res, "Credenciales inválidas", null, 401);
    }

    const okPass = await bcrypt.compare(
      String(contrasena),
      String(user.contrasena)
    );

    if (!okPass) {
      return fail(res, "Credenciales inválidas", null, 401);
    }

    const sesion = await createSessionForUser(user, req);
    const { accessToken, refreshToken } = await issueTokensForSession(
      user,
      sesion
    );

    await user.update({
      ultimo_login: new Date(),
    });

    await registrarActividad({
      usuarioId: user.id,
      modulo: "AUTH",
      accion: "LOGIN",
      descripcion: `Inicio de sesión exitoso para ${user.correo}`,
      req,
    });

    return ok(
      res,
      "Login exitoso",
      {
        accessToken,
        refreshToken,
        usuario: buildUserResponse(user),
      },
      200
    );
  } catch (error) {
    return handleControllerError(res, "Auth.login", error);
  }
}

async function me(req, res) {
  try {
    if (!req.user?.id) {
      return fail(res, "No autorizado", null, 401);
    }

    const user = await findActiveUserById(req.user.id);

    if (!user) {
      return fail(res, "Usuario no encontrado", null, 404);
    }

    return ok(res, "Usuario autenticado", buildUserResponse(user), 200);
  } catch (error) {
    return handleControllerError(res, "Auth.me", error);
  }
}

async function refresh(req, res) {
  try {
    ensureSesionModel();

    const { refreshToken } = req.body || {};

    if (!refreshToken) {
      return fail(res, "Refresh token requerido", null, 400);
    }

    const validation = await validateRefreshTokenAndSession(refreshToken);

    if (!validation.ok) {
      return fail(res, validation.message, null, validation.status);
    }

    const { payload, sesion } = validation;

    const user = await findActiveUserById(payload.id);

    if (!user) {
      return fail(res, "Usuario no válido", null, 401);
    }

    const tokens = await issueTokensForSession(user, sesion);

    return ok(
      res,
      "Token renovado",
      {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        usuario: buildUserResponse(user),
      },
      200
    );
  } catch (error) {
    return handleControllerError(res, "Auth.refresh", error);
  }
}

async function logout(req, res) {
  try {
    ensureSesionModel();

    const { refreshToken } = req.body || {};

    if (!refreshToken) {
      return fail(res, "Refresh token requerido", null, 400);
    }

    let payload;

    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      return fail(res, "Refresh token inválido", null, 401);
    }

    const sesion = await revokeSessionById(payload.sesionId);

    if (!sesion) {
      return fail(res, "Sesión no encontrada", null, 404);
    }

    await registrarActividad({
      usuarioId: req.user?.id || null,
      modulo: "AUTH",
      accion: "LOGOUT",
      descripcion: "Cierre de sesión de la sesión actual",
      req,
    });

    return ok(res, "Logout exitoso", null, 200);
  } catch (error) {
    return handleControllerError(res, "Auth.logout", error);
  }
}

async function logoutAll(req, res) {
  try {
    ensureSesionModel();

    if (!req.user?.id) {
      return fail(res, "No autorizado", null, 401);
    }

    const [cantidad] = await Sesion.update(
      {
        revocada: true,
        ultimo_uso: new Date(),
      },
      {
        where: {
          usuario_id: req.user.id,
          revocada: false,
        },
      }
    );

    await registrarActividad({
      usuarioId: req.user.id,
      modulo: "AUTH",
      accion: "LOGOUT_ALL",
      descripcion: `Cierre de todas las sesiones. Total revocadas: ${cantidad}`,
      req,
    });

    return ok(
      res,
      "Todas las sesiones fueron cerradas",
      {
        sesiones_revocadas: cantidad,
      },
      200
    );
  } catch (error) {
    return handleControllerError(res, "Auth.logoutAll", error);
  }
}

async function sessions(req, res) {
  try {
    ensureSesionModel();

    if (!req.user?.id) {
      return fail(res, "No autorizado", null, 401);
    }

    const lista = await Sesion.findAll({
      where: {
        usuario_id: req.user.id,
        revocada: false,
      },
      order: [["ultimo_uso", "DESC"]],
    });

    return ok(
      res,
      "Sesiones activas",
      lista.map((s) => ({
        id: s.id,
        ip: s.ip,
        user_agent: s.user_agent,
        dispositivo: s.dispositivo,
        ultimo_uso: s.ultimo_uso,
        expira_en: s.expira_en,
        revocada: s.revocada,
        creado_en: s.creado_en,
      })),
      200
    );
  } catch (error) {
    return handleControllerError(res, "Auth.sessions", error);
  }
}

async function googleLogin(req, res) {
  try {
    ensureSesionModel();

    const { idToken } = req.body || {};

    if (!idToken) {
      return fail(res, "El idToken de Google es obligatorio", null, 400);
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      return fail(res, "GOOGLE_CLIENT_ID no está configurado", null, 500);
    }

    const googleData = await verifyGoogleIdToken(idToken);

    if (!googleData || !googleData.correo) {
      return fail(
        res,
        "No fue posible obtener el correo desde Google",
        null,
        400
      );
    }

    let user = await findUserByGoogleId(googleData.googleId);

    if (!user) {
      user = await findUserByEmailAnyStatus(googleData.correo);

      if (user) {
        await user.update({
          google_id: googleData.googleId,
          proveedor_auth:
            user.proveedor_auth === "local" ? "local_google" : "google",
          email_verificado: googleData.emailVerificado,
          foto_url: googleData.fotoUrl,
          activo: true,
          ultimo_login: new Date(),
        });

        user = await findActiveUserById(user.id);
      } else {
        const nombreSeparado = splitName(googleData.nombres);
        const randomPasswordHash = await bcrypt.hash(
          `google_${googleData.googleId}_${Date.now()}`,
          10
        );

        user = await Usuario.create({
          finca_id: 1,
          rol_id: 1,
          nombres: nombreSeparado.nombres,
          apellidos: nombreSeparado.apellidos,
          correo: normalizeEmail(googleData.correo),
          contrasena: randomPasswordHash,
          google_id: googleData.googleId,
          proveedor_auth: "google",
          email_verificado: googleData.emailVerificado,
          foto_url: googleData.fotoUrl,
          activo: true,
          ultimo_login: new Date(),
        });

        user = await findActiveUserById(user.id);
      }
    } else {
      await user.update({
        email_verificado: googleData.emailVerificado,
        foto_url: googleData.fotoUrl,
        ultimo_login: new Date(),
      });

      user = await findActiveUserById(user.id);
    }

    if (!user) {
      return fail(res, "No fue posible iniciar sesión con Google", null, 500);
    }

    const sesion = await createSessionForUser(user, req);
    const { accessToken, refreshToken } = await issueTokensForSession(
      user,
      sesion
    );

    return ok(
      res,
      "Login con Google exitoso",
      {
        accessToken,
        refreshToken,
        usuario: buildUserResponse(user),
      },
      200
    );
  } catch (error) {
    return handleControllerError(res, "Auth.googleLogin", error);
  }
}

async function forgotPassword(req, res) {
  try {
    const { correo } = req.body || {};

    if (!correo) {
      return fail(res, "El correo es obligatorio", null, 400);
    }

    const user = await Usuario.findOne({
      where: { correo: normalizeEmail(correo) },
    });

    if (!user) {
      return ok(
        res,
        "Si el correo existe, se enviaron instrucciones para recuperar la contraseña",
        null,
        200
      );
    }

    const resetToken = generateResetToken();
    const resetTokenHash = hashResetToken(resetToken);
    const resetTokenExpires = getResetTokenExpiresAt();

    await user.update({
      token_recuperacion_hash: resetTokenHash,
      token_recuperacion_expira: resetTokenExpires,
    });

    console.log("VERSION RESET LINK HASH 2026");

    const frontendUrl = process.env.FRONTEND_URL || "https://michaell010.github.io/frontend-2";

    const resetLink = `${frontendUrl}/#/reset-password?token=${encodeURIComponent(resetToken)}`;

    try {
      await sendResetPasswordMail({
        to: user.correo,
        resetLink,
        userName: user.nombres,
      });
    } catch (mailError) {
      console.error("Error SMTP forgotPassword:", mailError);
      return fail(
        res,
        "No se pudo enviar el correo de recuperación",
        null,
        500
      );
    }

    await registrarActividad({
      usuarioId: user?.id || null,
      modulo: "AUTH",
      accion: "FORGOT_PASSWORD",
      descripcion: `Solicitud de recuperación de contraseña para ${normalizeEmail(
        correo
      )}`,
      req,
    });

    return ok(
      res,
      "Si el correo existe, se enviaron instrucciones para recuperar la contraseña",
      null,
      200
    );
  } catch (error) {
    return handleControllerError(res, "Auth.forgotPassword", error);
  }
}

async function resetPassword(req, res) {
  try {
    ensureSesionModel();

    const { token, nuevaContrasena } = req.body || {};

    if (!token || !nuevaContrasena) {
      return fail(res, "Token y nueva contraseña son obligatorios", null, 400);
    }

    if (String(nuevaContrasena).length < 8) {
      return fail(
        res,
        "La nueva contraseña debe tener mínimo 8 caracteres",
        null,
        400
      );
    }

    const tokenHash = hashResetToken(token);

    const user = await Usuario.findOne({
      where: {
        token_recuperacion_hash: tokenHash,
        activo: true,
      },
    });

    if (!user) {
      return fail(res, "Token inválido o no encontrado", null, 400);
    }

    if (
      !user.token_recuperacion_expira ||
      new Date(user.token_recuperacion_expira) < new Date()
    ) {
      return fail(res, "El token ha expirado", null, 400);
    }

    const nuevaContrasenaHash = await bcrypt.hash(
      String(nuevaContrasena),
      10
    );

    await user.update({
      contrasena: nuevaContrasenaHash,
      token_recuperacion_hash: null,
      token_recuperacion_expira: null,
      ultimo_login: null,
    });

    await Sesion.update(
      {
        revocada: true,
        ultimo_uso: new Date(),
      },
      {
        where: {
          usuario_id: user.id,
          revocada: false,
        },
      }
    );

    await registrarActividad({
      usuarioId: user.id,
      modulo: "AUTH",
      accion: "RESET_PASSWORD",
      descripcion: "Restablecimiento de contraseña exitoso",
      req,
    });

    return ok(res, "Contraseña actualizada correctamente", null, 200);
  } catch (error) {
    return handleControllerError(res, "Auth.resetPassword", error);
  }
}

module.exports = {
  login,
  me,
  refresh,
  logout,
  logoutAll,
  sessions,
  googleLogin,
  forgotPassword,
  resetPassword,
};