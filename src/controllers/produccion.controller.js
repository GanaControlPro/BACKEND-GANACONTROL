// src/controllers/produccion.controller.js
const { Produccion } = require('../models');
const { Op } = require('sequelize');

/**
 * Campos permitidos para ordenar (ajústalos según tu modelo real)
 * IMPORTANTE: agrega aquí solo columnas que existan en Produccion
 */
const ORDER_FIELDS = new Set([
  'id',
  'fecha',
  'tipo',
  'descripcion',
  'createdAt',
  'updatedAt',
]);

/**
 * GET /api/produccion
 * Query opcional:
 *  - page, limit (paginación)
 *  - q (búsqueda simple en "descripcion" si existe)
 *  - orderBy, orderDir (ordenamiento)
 */
const listar = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page ?? '1', 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit ?? '50', 10) || 50, 1), 200);
    const offset = (page - 1) * limit;

    const orderByRaw = (req.query.orderBy ?? 'id').toString();
    const orderBy = ORDER_FIELDS.has(orderByRaw) ? orderByRaw : 'id';

    const orderDir = (req.query.orderDir ?? 'DESC').toString().toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const q = (req.query.q ?? '').toString().trim();

    // Multi-finca: todo filtrado por finca_id
    const where = {
      finca_id: req.user?.finca_id,
    };

    // Búsqueda real con Sequelize (si tu modelo tiene "descripcion")
    if (q.length > 0 && ORDER_FIELDS.has('descripcion')) {
      where.descripcion = { [Op.like]: `%${q}%` };
    }

    const result = await Produccion.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, orderDir]],
    });

    return res.json({
      ok: true,
      mensaje: 'Producción: listado OK',
      meta: {
        page,
        limit,
        total: result.count,
        totalPages: Math.max(Math.ceil(result.count / limit), 1),
        orderBy,
        orderDir,
        q: q || null,
      },
      data: result.rows,
    });
  } catch (error) {
    console.error('Produccion.listar:', error);
    return res.status(500).json({ ok: false, mensaje: 'Error en el servidor' });
  }
};

/**
 * GET /api/produccion/:id
 */
const obtener = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ ok: false, mensaje: 'El parámetro id es obligatorio' });

    const registro = await Produccion.findOne({
      where: { id, finca_id: req.user?.finca_id },
    });

    if (!registro) {
      return res.status(404).json({ ok: false, mensaje: 'Registro no encontrado' });
    }

    return res.json({
      ok: true,
      mensaje: 'Producción: obtenido OK',
      data: registro,
    });
  } catch (error) {
    console.error('Produccion.obtener:', error);
    return res.status(500).json({ ok: false, mensaje: 'Error en el servidor' });
  }
};

/**
 * POST /api/produccion
 */
const crear = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ ok: false, mensaje: 'El body es obligatorio' });
    }

    // Multi-finca: fuerza finca_id del token (no del body)
    const payload = {
      ...req.body,
      finca_id: req.user?.finca_id,
    };

    const registro = await Produccion.create(payload);

    return res.status(201).json({
      ok: true,
      mensaje: 'Producción: creado OK',
      data: registro,
    });
  } catch (error) {
    console.error('Produccion.crear:', error);

    if (error?.name === 'SequelizeValidationError' || error?.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error de validación',
        errores: error.errors?.map((e) => ({ campo: e.path, mensaje: e.message })) ?? [],
      });
    }

    return res.status(500).json({ ok: false, mensaje: 'Error en el servidor' });
  }
};

/**
 * PUT /api/produccion/:id
 */
const actualizar = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ ok: false, mensaje: 'El parámetro id es obligatorio' });
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ ok: false, mensaje: 'El body es obligatorio' });
    }

    const registro = await Produccion.findOne({
      where: { id, finca_id: req.user?.finca_id },
    });

    if (!registro) {
      return res.status(404).json({ ok: false, mensaje: 'Registro no encontrado' });
    }

    // Evita que te cambien finca_id por body
    const { finca_id, ...safeBody } = req.body;

    await registro.update(safeBody);

    return res.json({
      ok: true,
      mensaje: 'Producción: actualizado OK',
      data: registro,
    });
  } catch (error) {
    console.error('Produccion.actualizar:', error);

    if (error?.name === 'SequelizeValidationError' || error?.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error de validación',
        errores: error.errors?.map((e) => ({ campo: e.path, mensaje: e.message })) ?? [],
      });
    }

    return res.status(500).json({ ok: false, mensaje: 'Error en el servidor' });
  }
};

/**
 * DELETE /api/produccion/:id
 */
const eliminar = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ ok: false, mensaje: 'El parámetro id es obligatorio' });

    const registro = await Produccion.findOne({
      where: { id, finca_id: req.user?.finca_id },
    });

    if (!registro) {
      return res.status(404).json({ ok: false, mensaje: 'Registro no encontrado' });
    }

    await registro.destroy();

    return res.json({
      ok: true,
      mensaje: 'Producción: eliminado OK',
      data: { id },
    });
  } catch (error) {
    console.error('Produccion.eliminar:', error);
    return res.status(500).json({ ok: false, mensaje: 'Error en el servidor' });
  }
};

module.exports = {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar,
};