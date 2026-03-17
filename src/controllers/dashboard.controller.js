const { Op } = require('sequelize');
const {
  Usuario,
  Ganado,
  Producto,
  Potrero,
  Venta,
  Produccion,
  Sesion,
  EventoSanitario
} = require('../models');
const { ok } = require('../utils/response');

function getInicioMes() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
}

function getFinMes() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
}

async function resumen(req, res, next) {
  try {
    const inicioMes = getInicioMes();
    const finMes = getFinMes();

    const [
      totalUsuarios,
      totalGanado,
      totalProductos,
      totalPotreros,
      totalVentas,
      ventasMes,
      sesionesActivas,
      eventosSanitariosMes,
      produccionesMes
    ] = await Promise.all([
      Usuario.count({
        where: { activo: true }
      }),

      Ganado.count(),

      Producto.count(),

      Potrero.count(),

      Venta.count(),

      Venta.count({
        where: {
          fecha: {
            [Op.between]: [inicioMes, finMes]
          }
        }
      }),

      Sesion.count({
        where: { revocada: false }
      }),

      EventoSanitario.count({
        where: {
          fecha: {
            [Op.between]: [inicioMes, finMes]
          }
        }
      }),

      Produccion.findAll({
        attributes: ['cantidad'],
        where: {
          fecha: {
            [Op.between]: [inicioMes, finMes]
          }
        }
      })
    ]);

    const totalProduccionMes = produccionesMes.reduce((acc, item) => {
      return acc + Number(item.cantidad || 0);
    }, 0);

    return ok(res, 'Resumen del dashboard obtenido correctamente', {
      periodo: {
        inicioMes,
        finMes
      },
      resumen: {
        totalUsuarios,
        totalGanado,
        totalProductos,
        totalPotreros,
        totalVentas,
        ventasMes,
        sesionesActivas,
        eventosSanitariosMes,
        totalProduccionMes
      }
    }, 200);
  } catch (error) {
  console.error('Dashboard.resumen ERROR REAL:', error);
  return res.status(500).json({
    ok: false,
    mensaje: error.message,
    data: null,
    errores: null
  });
}
}

module.exports = {
  resumen
};