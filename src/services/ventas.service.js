const { sequelize, Venta, DetalleVentaGanado, DetalleVentaProducto } = require('../models');

async function crearVenta({ finca_id, cliente, fecha, ganadoItems = [], productoItems = [], produccionItems = [] }) {
  return sequelize.transaction(async (t) => {
    const venta = await Venta.create({ finca_id, cliente, fecha }, { transaction: t });

    let total = 0;

    for (const it of ganadoItems) {
      await DetalleVentaGanado.create(
        { venta_id: venta.id, ganado_id: it.ganado_id, precio: it.precio },
        { transaction: t }
      );
      total += Number(it.precio || 0);
    }

    for (const it of productoItems) {
      const subtotal = Number(it.cantidad || 0) * Number(it.precio_unitario || 0);
      await DetalleVentaProducto.create(
        { venta_id: venta.id, producto_id: it.producto_id, cantidad: it.cantidad, precio_unitario: it.precio_unitario, subtotal },
        { transaction: t }
      );
      total += subtotal;
    }

    for (const it of produccionItems) {
      const subtotal = Number(it.cantidad || 0) * Number(it.precio_unitario || 0);
      await DetalleVentaProducto.create(
        { venta_id: venta.id, produccion_id: it.produccion_id, cantidad: it.cantidad, precio_unitario: it.precio_unitario, subtotal },
        { transaction: t }
      );
      total += subtotal;
    }

    await Venta.update({ total }, { where: { id: venta.id }, transaction: t });

    // recarga para que traiga numero_factura generado por trigger
    const final = await Venta.findByPk(venta.id, { transaction: t });
    return final;
  });
}

module.exports = { crearVenta };