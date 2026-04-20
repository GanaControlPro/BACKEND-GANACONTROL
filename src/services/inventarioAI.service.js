const axios = require("axios");

function resumirProductosParaIA(productos = []) {
  return productos.map((p) => ({
    id: p.id,
    nombre: p.nombre,
    tipo: p.tipo,
    unidad: p.unidad,
    cantidad_actual: Number(p.cantidad_actual || 0),
    cantidad_min: Number(p.cantidad_min || 0),
    precio_unitario: Number(p.precio_unitario || 0),
    proveedor: p.proveedor || null,
    ubicacion: p.ubicacion || null,
  }));
}

function construirPromptInventario(productos = []) {
  const lista = resumirProductosParaIA(productos);

  return `
Eres un analista experto en inventario ganadero.

Analiza este inventario y responde ÚNICAMENTE en formato JSON válido con esta estructura exacta:

{
  "resumen_general": "texto",
  "riesgos": ["texto 1", "texto 2"],
  "recomendaciones": ["texto 1", "texto 2"],
  "prioridades_compra": [
    {
      "nombre": "string",
      "motivo": "string",
      "prioridad": "alta|media|baja"
    }
  ]
}

Reglas:
- Sé breve, claro y accionable.
- Basa el análisis en cantidades, mínimos, valor económico y posibles riesgos operativos.
- Si no hay riesgos, devuelve un arreglo vacío en "riesgos".
- Si no hay prioridades de compra, devuelve un arreglo vacío.
- No agregues texto fuera del JSON.

Datos del inventario:
${JSON.stringify(lista, null, 2)}
`;
}

function prioridadPorProducto(tipo, actual, minimo) {
  const t = String(tipo || "").toLowerCase();

  if (actual <= 0) return "alta";
  if (actual <= minimo) {
    if (t === "alimento" || t === "medicamento") return "alta";
    return "media";
  }
  return "baja";
}

function analizarInventarioLocal(productos = [], motivo = "No se pudo usar IA externa") {
  const lista = resumirProductosParaIA(productos);

  const riesgos = [];
  const recomendaciones = [];
  const prioridades_compra = [];

  let totalProductos = lista.length;
  let agotados = 0;
  let bajoMinimo = 0;
  let valorComprometido = 0;

  for (const p of lista) {
    const actual = Number(p.cantidad_actual || 0);
    const minimo = Number(p.cantidad_min || 0);
    const precio = Number(p.precio_unitario || 0);
    const valorFaltante = Math.max(minimo - actual, 0) * precio;

    if (actual <= 0) {
      agotados++;
      riesgos.push(`${p.nombre} está agotado.`);
      prioridades_compra.push({
        nombre: p.nombre,
        motivo: `Producto agotado${p.tipo ? ` (${p.tipo})` : ""}.`,
        prioridad: "alta",
      });
      continue;
    }

    if (minimo > 0 && actual <= minimo) {
      bajoMinimo++;
      valorComprometido += valorFaltante;

      riesgos.push(
        `${p.nombre} está en o por debajo del stock mínimo (${actual} ${p.unidad} disponibles, mínimo ${minimo}).`
      );

      prioridades_compra.push({
        nombre: p.nombre,
        motivo: `Stock por debajo del mínimo. Disponible: ${actual} ${p.unidad}. Mínimo requerido: ${minimo}.`,
        prioridad: prioridadPorProducto(p.tipo, actual, minimo),
      });
    } else if (minimo > 0 && actual <= minimo * 1.25) {
      recomendaciones.push(
        `Monitorear ${p.nombre}: está cerca del stock mínimo (${actual} ${p.unidad} disponibles frente a mínimo ${minimo}).`
      );
    }

    if (precio > 0 && minimo > 0 && actual < minimo) {
      recomendaciones.push(
        `Evaluar reposición de ${p.nombre}; el costo estimado para llegar al mínimo es de ${valorFaltante.toLocaleString("es-CO")}.`
      );
    }
  }

  if (!riesgos.length) {
    recomendaciones.push("No se detectan riesgos críticos inmediatos en el inventario.");
  }

  if (!prioridades_compra.length) {
    recomendaciones.push("No hay productos con prioridad de compra inmediata.");
  }

  const resumen_general =
    totalProductos === 0
      ? "No hay productos suficientes para analizar el inventario."
      : agotados > 0 || bajoMinimo > 0
      ? `Se analizaron ${totalProductos} productos. Hay ${agotados} agotado(s) y ${bajoMinimo} producto(s) en o por debajo del stock mínimo.`
      : `Se analizaron ${totalProductos} productos y el inventario se encuentra estable según las reglas locales.`;

  return {
    resumen_general,
    riesgos,
    recomendaciones,
    prioridades_compra: prioridades_compra.sort((a, b) => {
      const orden = { alta: 0, media: 1, baja: 2 };
      return (orden[a.prioridad] ?? 99) - (orden[b.prioridad] ?? 99);
    }),
    meta: {
      modo: "local",
      usando_ia: false,
      motivo_fallback: motivo,
      detalle: valorComprometido > 0
        ? `Valor estimado comprometido para cubrir faltantes: ${valorComprometido.toLocaleString("es-CO")}.`
        : "No se estimó valor comprometido relevante.",
    },
  };
}

function normalizarRespuestaIA(parsed) {
  return {
    resumen_general: parsed?.resumen_general || "Análisis generado con IA.",
    riesgos: Array.isArray(parsed?.riesgos) ? parsed.riesgos : [],
    recomendaciones: Array.isArray(parsed?.recomendaciones) ? parsed.recomendaciones : [],
    prioridades_compra: Array.isArray(parsed?.prioridades_compra) ? parsed.prioridades_compra : [],
    meta: {
      modo: "ia",
      usando_ia: true,
      motivo_fallback: null,
      detalle: "Análisis generado con OpenAI.",
    },
  };
}

async function analizarInventarioConOpenAI(productos = []) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  if (!apiKey) {
    throw new Error("Falta OPENAI_API_KEY en variables de entorno");
  }

  const prompt = construirPromptInventario(productos);

  const response = await axios.post(
    "https://api.openai.com/v1/responses",
    {
      model,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: "Eres un asistente experto en inventario ganadero y gestión de abastecimiento.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: prompt,
            },
          ],
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      timeout: 30000,
    }
  );

  const content =
    response?.data?.output_text?.trim?.() ||
    response?.data?.output?.[0]?.content?.[0]?.text?.trim?.();

  if (!content) {
    throw new Error("La IA no devolvió contenido");
  }

  try {
    return normalizarRespuestaIA(JSON.parse(content));
  } catch {
    return normalizarRespuestaIA({
      resumen_general: content,
      riesgos: [],
      recomendaciones: [],
      prioridades_compra: [],
    });
  }
}

function obtenerMotivoFallback(error) {
  const status = error?.response?.status;
  const apiMessage = error?.response?.data?.error?.message;
  const apiCode = error?.response?.data?.error?.code;

  if (status === 429 && apiCode === "insufficient_quota") {
    return "Se agotaron las cuotas disponibles de OpenAI.";
  }

  if (status === 429) {
    return "OpenAI rechazó la solicitud por límite de uso o demasiadas solicitudes.";
  }

  if (status === 401) {
    return "La clave de OpenAI es inválida o no autorizada.";
  }

  if (status === 403) {
    return "La cuenta o el proyecto de OpenAI no tiene permisos para usar este recurso.";
  }

  if (status === 404) {
    return "El endpoint o el modelo configurado en OpenAI no fue encontrado.";
  }

  if (status >= 500) {
    return "OpenAI presentó un error interno.";
  }

  if (apiMessage) {
    return apiMessage;
  }

  if (error?.code === "ECONNABORTED") {
    return "La solicitud a OpenAI excedió el tiempo de espera.";
  }

  if (error?.message) {
    return error.message;
  }

  return "No se pudo usar IA externa.";
}

async function analizarInventarioConIA(productos = []) {
  try {
    return await analizarInventarioConOpenAI(productos);
  } catch (error) {
    console.error("OpenAI status:", error?.response?.status);
    console.error("OpenAI data:", JSON.stringify(error?.response?.data, null, 2));

    const motivo = obtenerMotivoFallback(error);
    return analizarInventarioLocal(productos, motivo);
  }
}

module.exports = {
  analizarInventarioConIA,
};