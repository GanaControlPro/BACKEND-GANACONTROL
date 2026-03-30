const { Venta } = require('../models');
const { Op } = require('sequelize');
const {
  obtenerCrecimiento,
  obtenerLiquidacion,
  obtenerTransacciones,
} = require('../services/ventas.service');

exports.kpis = async (req, res) => {
  try {
    const finca_id = req.user?.finca_id;

    if (!finca_id) {
      return res.status(401).json({
        ok: false,
        mensaje: 'No autorizado',
        errores: [],
      });
    }

    const hoy = new Date();
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

    const [totalVentas, totalVentasMes, cantidadVentas] = await Promise.all([
      Venta.sum('total', { where: { finca_id } }),
      Venta.sum('total', {
        where: {
          finca_id,
          fecha: { [Op.gte]: inicioMes },
        },
      }),
      Venta.count({ where: { finca_id } }),
    ]);

    return res.json({
      ok: true,
      data: {
        totalVentas: Number(totalVentas || 0),
        totalVentasMes: Number(totalVentasMes || 0),
        cantidadVentas: Number(cantidadVentas || 0),
      },
    });
  } catch (e) {
    console.error('Error en kpis:', e);
    return res.status(500).json({
      ok: false,
      mensaje: e.message || 'Error obteniendo KPIs',
      errores: [],
    });
  }
};

exports.crecimiento = async (req, res) => {
  try {
    const finca_id = req.user?.finca_id;

    if (!finca_id) {
      return res.status(401).json({
        ok: false,
        mensaje: 'No autorizado',
        errores: [],
      });
    }

    const periodo = req.query.periodo || 'Semana';
    const data = await obtenerCrecimiento(finca_id, periodo);

    return res.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error('Error obteniendo crecimiento:', error);
    return res.status(500).json({
      ok: false,
      mensaje: 'Error obteniendo crecimiento',
      errores: [],
    });
  }
};

exports.liquidacion = async (req, res) => {
  try {
    const finca_id = req.user?.finca_id;

    if (!finca_id) {
      return res.status(401).json({
        ok: false,
        mensaje: 'No autorizado',
        errores: [],
      });
    }

    const data = await obtenerLiquidacion(finca_id);

    return res.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error('Error en liquidacion:', error);
    return res.status(500).json({
      ok: false,
      mensaje: 'Error obteniendo liquidación',
      errores: [],
    });
  }
};

exports.transacciones = async (req, res) => {
  try {
    const finca_id = req.user?.finca_id;

    if (!finca_id) {
      return res.status(401).json({
        ok: false,
        mensaje: 'No autorizado',
        errores: [],
      });
    }

    const busqueda = req.query.busqueda || '';
    const estado = req.query.estado || '';

    const data = await obtenerTransacciones(finca_id, busqueda, estado);

    return res.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error('Error en transacciones:', error);
    return res.status(500).json({
      ok: false,
      mensaje: 'Error obteniendo transacciones',
      errores: [],
    });
  }
};