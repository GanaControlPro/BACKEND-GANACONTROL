const { DetalleVentaGanado, Ganado, Venta } = require('../models');

class DetalleVentaGanadoService {

  async getAll() {
    return await DetalleVentaGanado.findAll({
      include: [
        { model: Ganado, as: 'ganado' },
        { model: Venta, as: 'venta' }
      ],
      order: [['id', 'DESC']]
    });
  }

  async getById(id) {
    return await DetalleVentaGanado.findByPk(id, {
      include: [
        { model: Ganado, as: 'ganado' },
        { model: Venta, as: 'venta' }
      ]
    });
  }

  async create(data) {
    const venta_id = Number(data.venta_id);
    const ganado_id = Number(data.ganado_id);
    const precio = data.precio;

    if (!venta_id || !ganado_id || precio === undefined || precio === null) {
      const error = new Error("venta_id, ganado_id y precio son obligatorios");
      error.status = 400;
      throw error;
    }

    // validar existencia FK
    const venta = await Venta.findByPk(venta_id);
    if (!venta) {
      const error = new Error("La venta no existe");
      error.status = 404;
      throw error;
    }

    const ganado = await Ganado.findByPk(ganado_id);
    if (!ganado) {
      const error = new Error("El ganado no existe");
      error.status = 404;
      throw error;
    }

    // evita duplicado por UNIQUE(venta_id,ganado_id)
    const yaExiste = await DetalleVentaGanado.findOne({
      where: { venta_id, ganado_id }
    });
    if (yaExiste) {
      const error = new Error("Este ganado ya está asociado a esta venta");
      error.status = 409;
      throw error;
    }

    const creado = await DetalleVentaGanado.create({
      venta_id,
      ganado_id,
      precio
    });

    // (Opcional) recalcular total de la venta sumando detalles
    await this.recalcularTotalVenta(venta_id);

    return await DetalleVentaGanado.findByPk(creado.id, {
      include: [
        { model: Ganado, as: 'ganado' },
        { model: Venta, as: 'venta' }
      ]
    });
  }

  async update(id, data) {
    const registro = await DetalleVentaGanado.findByPk(id);
    if (!registro) return null;

    // Si intentan cambiar venta_id/ganado_id, validamos y evitamos duplicado
    const venta_id = data.venta_id !== undefined ? Number(data.venta_id) : registro.venta_id;
    const ganado_id = data.ganado_id !== undefined ? Number(data.ganado_id) : registro.ganado_id;

    if (data.venta_id !== undefined) {
      const venta = await Venta.findByPk(venta_id);
      if (!venta) {
        const error = new Error("La venta no existe");
        error.status = 404;
        throw error;
      }
    }

    if (data.ganado_id !== undefined) {
      const ganado = await Ganado.findByPk(ganado_id);
      if (!ganado) {
        const error = new Error("El ganado no existe");
        error.status = 404;
        throw error;
      }
    }

    const dup = await DetalleVentaGanado.findOne({
      where: { venta_id, ganado_id }
    });

    if (dup && dup.id !== registro.id) {
      const error = new Error("Ya existe ese ganado en esa venta");
      error.status = 409;
      throw error;
    }

    await registro.update(data);

    // (Opcional) recalcular total venta
    await this.recalcularTotalVenta(registro.venta_id);

    return await DetalleVentaGanado.findByPk(registro.id, {
      include: [
        { model: Ganado, as: 'ganado' },
        { model: Venta, as: 'venta' }
      ]
    });
  }

  async remove(id) {
    const registro = await DetalleVentaGanado.findByPk(id);
    if (!registro) return null;

    const venta_id = registro.venta_id;

    await registro.destroy();

    // (Opcional) recalcular total venta
    await this.recalcularTotalVenta(venta_id);

    return true;
  }

  // ===== Helpers =====
  async recalcularTotalVenta(venta_id) {
    // suma detalle ganado + detalle producto (si también lo manejas)
    const totalGanado = await DetalleVentaGanado.sum('precio', { where: { venta_id } }) || 0;

    // si tienes detalle_venta_producto en tu BD, también sumamos
    let totalProductos = 0;
    try {
      const { DetalleVentaProducto } = require('../models');
      totalProductos = (await DetalleVentaProducto.sum('subtotal', { where: { venta_id } })) || 0;
    } catch (_) {}

    const total = Number(totalGanado) + Number(totalProductos);

    await Venta.update(
      { total },
      { where: { id: venta_id } }
    );
  }
}

module.exports = new DetalleVentaGanadoService();