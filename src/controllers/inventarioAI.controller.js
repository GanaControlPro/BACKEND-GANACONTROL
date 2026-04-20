const { Producto } = require("../models");
const { ok, fail } = require("../utils/response");
const { analizarInventarioConIA } = require("../services/inventarioAI.service");

function requireUser(req, res) {
  if (!req.user || !req.user.finca_id) {
    fail(res, {
      code: 401,
      mensaje: "No autorizado: falta usuario/finca",
    });
    return false;
  }
  return true;
}

async function analizar(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const productos = await Producto.findAll({
      where: { finca_id: req.user.finca_id },
      order: [["id", "DESC"]],
    });

    if (!productos.length) {
      return ok(res, {
        mensaje: "Análisis IA generado",
        data: {
          resumen_general: "No hay productos registrados en el inventario.",
          riesgos: [],
          recomendaciones: [
            "Registra productos para poder generar análisis predictivo.",
          ],
          prioridades_compra: [],
        },
      });
    }

    const analisis = await analizarInventarioConIA(
      productos.map((p) => (p.toJSON ? p.toJSON() : p))
    );

    return ok(res, {
      mensaje: "Análisis IA generado",
      data: analisis,
    });
  } catch (e) {
    console.error("InventarioIA.analizar:", e);

    return fail(res, {
      code: 500,
      mensaje: "No se pudo generar el análisis con IA",
      errores: [{ mensaje: e.message || "Error interno" }],
    });
  }
}

module.exports = {
  analizar,
};