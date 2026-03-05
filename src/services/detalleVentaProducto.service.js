const { DetalleVentaProducto, Producto, Produccion, Venta, DetalleVentaGanado } = require('../models');

class DetalleVentaProductoService {

  async getAll() {
    return await DetalleVentaProducto.findAll({
      include: [
        { model: Producto, as: 'producto' },
        { model: Produccion, as: 'produccion' },
        { model: Venta, as: 'venta' }
      ],
      order: [['id', 'DESC']]
    });
  }

  async getById(id) {
    return await DetalleVentaProducto.findByPk(id, {
      include: [
        { model: Producto, as: 'producto' },
        { model: Produccion, as: 'produccion' },
        { model: Venta, as: 'venta' }
      ]
    });
  }

  async create(data) {
    const venta_id = Number(data.venta_id);
    const producto_id = data.producto_id ? Number(data.producto_id) : null;
    const produccion_id = data.produccion_id ? Number(data.produccion_id) : null;

    if (!venta_id) {
      const error = new Error("venta_id es obligatorio");
      error.status = 400;
      throw error;
    }

    // Regla de negocio: debe venir producto_id o produccion_id (pero no ambos)
    if ((!producto_id && !produccion_id) || (producto_id && produccion_id)) {
      const error = new Error("Debe enviar producto_id o produccion_id (solo uno)");
      error.status = 400;
      throw error;
    }

    const venta = await Venta.findByPk(venta_id);
    if (!venta) {
      const error = new Error("La venta no existe");
      error.status = 404;
      throw error;
    }

    if (producto_id) {
      const producto = await Producto.findByPk(producto_id);
      if (!producto) {
        const error = new Error("El producto no existe");
        error.status = 404;
        throw error;
      }
    }

    if (produccion_id) {
      const produccion = await Produccion.findByPk(produccion_id);
      if (!produccion) {
        const error = new Error("La producción no existe");
        error.status = 404;
        throw error;
      }
    }

    const cantidad = data.cantidad !== undefined && data.cantidad !== null ? Number(data.cantidad) : null;
    const precio_unitario = data.precio_unitario !== undefined && data.precio_unitario !== null ? Number(data.precio_unitario) : null;

    // subtotal: si no viene, lo calculamos; si viene, lo respetamos pero igual validamos números
    let subtotal = data.subtotal !== undefined && data.subtotal !== null ? Number(data.subtotal) : null;

    if (subtotal === null) {
      if (cantidad === null || precio_unitario === null) {
        const error = new Error("Si no envías subtotal, debes enviar cantidad y precio_unitario");
        error.status = 400;
        throw error;
      }
      subtotal = Number((cantidad * precio_unitario).toFixed(2));
    }

    const creado = await DetalleVentaProducto.create({
      venta_id,
      producto_id,
      produccion_id,
      cantidad,
      precio_unitario,
      subtotal
    });

    await this.recalcularTotalVenta(venta_id);

    return await DetalleVentaProducto.findByPk(creado.id, {
      include: [
        { model: Producto, as: 'producto' },
        { model: Produccion, as: 'produccion' },
        { model: Venta, as: 'venta' }
      ]
    });
  }

  async update(id, data) {
    const registro = await DetalleVentaProducto.findByPk(id);
    if (!registro) return null;

    const venta_id = data.venta_id !== undefined ? Number(data.venta_id) : registro.venta_id;

    const producto_id = data.producto_id !== undefined ? (data.producto_id ? Number(data.producto_id) : null) : registro.producto_id;
    const produccion_id = data.produccion_id !== undefined ? (data.produccion_id ? Number(data.produccion_id) : null) : registro.produccion_id;

    // Regla: producto_id o produccion_id, solo uno
    if ((!producto_id && !produccion_id) || (producto_id && produccion_id)) {
      const error = new Error("Debe existir producto_id o produccion_id (solo uno)");
      error.status = 400;
      throw error;
    }

    if (data.venta_id !== undefined) {
      const venta = await Venta.findByPk(venta_id);
      if (!venta) {
        const error = new Error("La venta no existe");
        error.status = 404;
        throw error;
      }
    }

    if (data.producto_id !== undefined && producto_id) {
      const producto = await Producto.findByPk(producto_id);
      if (!producto) {
        const error = new Error("El producto no existe");
        error.status = 404;
        throw error;
      }
    }

    if (data.produccion_id !== undefined && produccion_id) {
      const produccion = await Produccion.findByPk(produccion_id);
      if (!produccion) {
        const error = new Error("La producción no existe");
        error.status = 404;
        throw error;
      }
    }

    // Recalcular subtotal si cambian cantidad o precio_unitario y no mandan subtotal
    const cantidad = data.cantidad !== undefined ? Number(data.cantidad) : (registro.cantidad !== null ? Number(registro.cantidad) : null);
    const precio_unitario = data.precio_unitario !== undefined ? Number(data.precio_unitario) : (registro.precio_unitario !== null ? Number(registro.precio_unitario) : null);

    if (data.subtotal === undefined) {
      if (cantidad !== null && precio_unitario !== null) {
        data.subtotal = Number((cantidad * precio_unitario).toFixed(2));
      }
    } else if (data.subtotal !== null) {
      data.subtotal = Number(data.subtotal);
    }

    await registro.update({
      ...data,
      venta_id,
      producto_id,
      produccion_id
    });

    await this.recalcularTotalVenta(registro.venta_id);

    return await DetalleVentaProducto.findByPk(registro.id, {
      include: [
        { model: Producto, as: 'producto' },
        { model: Produccion, as: 'produccion' },
        { model: Venta, as: 'venta' }
      ]
    });
  }

  async remove(id) {
    const registro = await DetalleVentaProducto.findByPk(id);
    if (!registro) return null;

    const venta_id = registro.venta_id;

    await registro.destroy();

    await this.recalcularTotalVenta(venta_id);

    return true;
  }

  // ===== Helpers =====
  async recalcularTotalVenta(venta_id) {
    const totalProductos = (await DetalleVentaProducto.sum('subtotal', { where: { venta_id } })) || 0;
    const totalGanado = (await DetalleVentaGanado.sum('precio', { where: { venta_id } })) || 0;

    const total = Number(totalProductos) + Number(totalGanado);

    await Venta.update(
      { total },
      { where: { id: venta_id } }
    );
  }
}

module.exports = new DetalleVentaProductoService();