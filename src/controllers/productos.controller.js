const { Producto, MovimientoProducto, sequelize } = require('../models');
const { ok, fail } = require('../utils/response');

function requireUser(req, res) {
  if (!req.user || !req.user.finca_id) {
    fail(res, {
      code: 401,
      mensaje: 'No autorizado: falta usuario/finca'
    });
    return false;
  }
  return true;
}

function calcularEstadoInventario(producto) {
  const actual = Number(producto.cantidad_actual || 0);

  if (actual <= 0) return "agotado";
  if (actual < 20) return "critico";
  if (actual < 50) return "stock_bajo";
  return "en_stock";
}

function agregarEstadoInventario(producto) {
  if (!producto) return producto;

  const data = producto.toJSON ? producto.toJSON() : producto;

  return {
    ...data,
    estado_inventario: calcularEstadoInventario(data)
  };
}

async function listar(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const rows = await Producto.findAll({
      where: { finca_id: req.user.finca_id },
      order: [['id', 'DESC']]
    });

    const data = rows.map(agregarEstadoInventario);

    return ok(res, {
      mensaje: 'Listado OK',
      data
    });
  } catch (e) {
    console.error('Producto.listar:', e);
    return next(e);
  }
}

async function obtenerPorId(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const { id } = req.params;

    if (!id) {
      return fail(res, {
        code: 400,
        mensaje: 'El parámetro id es obligatorio'
      });
    }

    const row = await Producto.findOne({
      where: {
        id,
        finca_id: req.user.finca_id
      }
    });

    if (!row) {
      return fail(res, {
        code: 404,
        mensaje: 'Producto no encontrado'
      });
    }

    return ok(res, {
      mensaje: 'Producto encontrado',
      data: agregarEstadoInventario(row)
    });
  } catch (e) {
    console.error('Producto.obtenerPorId:', e);
    return next(e);
  }
}

async function crear(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    if (!req.body || Object.keys(req.body).length === 0) {
      return fail(res, {
        code: 400,
        mensaje: 'El body es obligatorio'
      });
    }

    const row = await Producto.create({
      ...req.body,
      finca_id: req.user.finca_id
    });

    return ok(res, {
      code: 201,
      mensaje: 'Producto creado',
      data: agregarEstadoInventario(row)
    });
  } catch (e) {
    console.error('Producto.crear:', e);

    if (
      e?.name === 'SequelizeValidationError' ||
      e?.name === 'SequelizeUniqueConstraintError'
    ) {
      return fail(res, {
        code: 400,
        mensaje: e.message,
        errores: e.errors?.map((x) => ({
          campo: x.path,
          mensaje: x.message
        })) ?? []
      });
    }

    return next(e);
  }
}

async function actualizar(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const { id } = req.params;

    if (!id) {
      return fail(res, {
        code: 400,
        mensaje: 'El parámetro id es obligatorio'
      });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return fail(res, {
        code: 400,
        mensaje: 'El body es obligatorio'
      });
    }

    const [n] = await Producto.update(req.body, {
      where: {
        id,
        finca_id: req.user.finca_id
      }
    });

    if (!n) {
      return fail(res, {
        code: 404,
        mensaje: 'Producto no encontrado'
      });
    }

    const row = await Producto.findOne({
      where: {
        id,
        finca_id: req.user.finca_id
      }
    });

    return ok(res, {
      mensaje: 'Producto actualizado',
      data: agregarEstadoInventario(row)
    });
  } catch (e) {
    console.error('Producto.actualizar:', e);

    if (
      e?.name === 'SequelizeValidationError' ||
      e?.name === 'SequelizeUniqueConstraintError'
    ) {
      return fail(res, {
        code: 400,
        mensaje: e.message,
        errores: e.errors?.map((x) => ({
          campo: x.path,
          mensaje: x.message
        })) ?? []
      });
    }

    return next(e);
  }
}

async function eliminar(req, res, next) {
  try {
    if (!requireUser(req, res)) return;

    const { id } = req.params;

    if (!id) {
      return fail(res, {
        code: 400,
        mensaje: 'El parámetro id es obligatorio'
      });
    }

    const n = await Producto.destroy({
      where: {
        id,
        finca_id: req.user.finca_id
      }
    });

    if (!n) {
      return fail(res, {
        code: 404,
        mensaje: 'Producto no encontrado'
      });
    }

    return ok(res, {
      mensaje: 'Producto eliminado',
      data: { id: Number(id) }
    });
  } catch (e) {
    console.error('Producto.eliminar:', e);
    return next(e);
  }
}

/**
 * POST /api/productos/movimientos
 * body: { producto_id, tipo: 'ENTRADA'|'SALIDA', cantidad, ... }
 */
async function movimiento(req, res, next) {
  const t = await sequelize.transaction();

  try {
    if (!requireUser(req, res)) {
      await t.rollback();
      return;
    }

    const { producto_id, tipo, cantidad } = req.body || {};

    if (!producto_id) {
      await t.rollback();
      return fail(res, {
        code: 400,
        mensaje: 'producto_id es obligatorio'
      });
    }

    if (!tipo || !['ENTRADA', 'SALIDA'].includes(String(tipo).toUpperCase())) {
      await t.rollback();
      return fail(res, {
        code: 400,
        mensaje: "tipo debe ser 'ENTRADA' o 'SALIDA'"
      });
    }

    const qty = Number(cantidad);

    if (!qty || qty <= 0) {
      await t.rollback();
      return fail(res, {
        code: 400,
        mensaje: 'cantidad debe ser un número mayor a 0'
      });
    }

    const producto = await Producto.findOne({
      where: {
        id: producto_id,
        finca_id: req.user.finca_id
      },
      transaction: t,
      lock: t.LOCK.UPDATE
    });

    if (!producto) {
      await t.rollback();
      return fail(res, {
        code: 404,
        mensaje: 'Producto no encontrado en tu finca'
      });
    }

    const tipoNorm = String(tipo).toUpperCase();
    const stockActual = Number(producto.cantidad_actual ?? 0);
    const nuevoStock = tipoNorm === 'ENTRADA'
      ? stockActual + qty
      : stockActual - qty;

    if (tipoNorm === 'SALIDA' && nuevoStock < 0) {
      await t.rollback();
      return fail(res, {
        code: 400,
        mensaje: 'Stock insuficiente para realizar la salida'
      });
    }

    const mov = await MovimientoProducto.create(
      {
        ...req.body,
        tipo: tipoNorm,
        cantidad: qty,
        finca_id: req.user.finca_id
      },
      { transaction: t }
    );

    await producto.update({ cantidad_actual: nuevoStock }, { transaction: t });

    await t.commit();

    return ok(res, {
      code: 201,
      mensaje: 'Movimiento creado',
      data: {
        movimiento: mov,
        producto: {
          id: producto.id,
          cantidad_actual: nuevoStock,
          estado_inventario: calcularEstadoInventario({
            cantidad_actual: nuevoStock,
            cantidad_min: producto.cantidad_min
          })
        }
      }
    });
  } catch (e) {
    await t.rollback();
    console.error('Producto.movimiento:', e);

    if (
      e?.name === 'SequelizeValidationError' ||
      e?.name === 'SequelizeUniqueConstraintError'
    ) {
      return fail(res, {
        code: 400,
        mensaje: e.message,
        errores: e.errors?.map((x) => ({
          campo: x.path,
          mensaje: x.message
        })) ?? []
      });
    }

    return next(e);
  }
}

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  movimiento
};