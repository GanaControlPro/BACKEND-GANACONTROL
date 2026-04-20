const alimentacionService = require('../services/alimentacion.service');
const { Ganado, Producto } = require('../models');

const TIPOS_ANIMAL_VALIDOS = ['Vaca', 'Toro', 'Ternero', 'Novillo'];
const FRECUENCIAS_VALIDAS = [
  'Diaria',
  'Dos_veces_al_dia',
  'Semanal',
  'Quincenal',
  'Mensual'
];

const esVacio = (v) => v === undefined || v === null || v === '';

const validarPayload = (body, esEdicion = false) => {
  const errores = [];

  if (!esEdicion || 'ganado_id' in body) {
    if (esVacio(body.ganado_id)) {
      errores.push({ campo: 'ganado_id', mensaje: 'Debe seleccionar un ganado' });
    }
  }

  if (!esEdicion || 'producto_id' in body) {
    if (esVacio(body.producto_id)) {
      errores.push({ campo: 'producto_id', mensaje: 'Debe seleccionar un producto' });
    }
  }

  if (!esEdicion || 'tipo_animal' in body) {
    if (esVacio(body.tipo_animal)) {
      errores.push({ campo: 'tipo_animal', mensaje: 'Debe seleccionar el tipo de animal' });
    } else if (!TIPOS_ANIMAL_VALIDOS.includes(body.tipo_animal)) {
      errores.push({ campo: 'tipo_animal', mensaje: 'El tipo de animal no es válido' });
    }
  }

  if (!esEdicion || 'fecha' in body) {
    if (esVacio(body.fecha)) {
      errores.push({ campo: 'fecha', mensaje: 'Debe ingresar la fecha' });
    }
  }

  if (!esEdicion || 'cantidad' in body) {
    if (esVacio(body.cantidad)) {
      errores.push({ campo: 'cantidad', mensaje: 'Debe ingresar la cantidad' });
    } else if (Number(body.cantidad) <= 0) {
      errores.push({ campo: 'cantidad', mensaje: 'La cantidad debe ser mayor que 0' });
    }
  }

  if (!esEdicion || 'frecuencia' in body) {
    if (esVacio(body.frecuencia)) {
      errores.push({ campo: 'frecuencia', mensaje: 'Debe seleccionar la frecuencia' });
    } else if (!FRECUENCIAS_VALIDAS.includes(body.frecuencia)) {
      errores.push({ campo: 'frecuencia', mensaje: 'La frecuencia no es válida' });
    }
  }

  if ('observacion' in body && body.observacion && String(body.observacion).length > 200) {
    errores.push({ campo: 'observacion', mensaje: 'La observación no puede superar los 200 caracteres' });
  }

  return errores;
};

const validarGanado = async (ganado_id, finca_id) => {
  if (esVacio(ganado_id)) return null;

  return await Ganado.findOne({
    where: { id: ganado_id, finca_id }
  });
};

const validarProducto = async (producto_id, finca_id) => {
  if (esVacio(producto_id)) return null;

  return await Producto.findOne({
    where: { id: producto_id, finca_id }
  });
};

const listar = async (req, res) => {
  try {
    const finca_id = req.user?.finca_id;

    if (!finca_id) {
      return res.status(400).json({
        mensaje: 'No se encontró finca_id en el usuario autenticado'
      });
    }

    const registros = await alimentacionService.getAll(finca_id);
    return res.json(registros);
  } catch (error) {
    console.error('Alimentacion.listar:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const crear = async (req, res) => {
  try {
    const finca_id = req.user?.finca_id;

    if (!finca_id) {
      return res.status(400).json({
        mensaje: 'No se encontró finca_id en el usuario autenticado'
      });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        mensaje: 'El body es obligatorio'
      });
    }

    const errores = validarPayload(req.body, false);
    if (errores.length > 0) {
      return res.status(400).json({
        mensaje: 'Validación fallida',
        errores
      });
    }

    const {
      ganado_id,
      producto_id,
      tipo_animal,
      fecha,
      cantidad,
      frecuencia,
      observacion = null
    } = req.body;

    const ganado = await validarGanado(ganado_id, finca_id);
    if (!ganado) {
      return res.status(400).json({
        mensaje: 'Validación fallida',
        errores: [
          { campo: 'ganado_id', mensaje: 'El ganado seleccionado no existe o no pertenece a la finca' }
        ]
      });
    }

    const producto = await validarProducto(producto_id, finca_id);
    if (!producto) {
      return res.status(400).json({
        mensaje: 'Validación fallida',
        errores: [
          { campo: 'producto_id', mensaje: 'El producto seleccionado no existe o no pertenece a la finca' }
        ]
      });
    }

    if (String(producto.tipo || '').toLowerCase() !== 'alimento') {
      return res.status(400).json({
        mensaje: 'Validación fallida',
        errores: [
          { campo: 'producto_id', mensaje: 'El producto seleccionado no es de tipo Alimento' }
        ]
      });
    }

    const registro = await alimentacionService.create({
      ganado_id,
      producto_id,
      tipo_animal,
      fecha,
      cantidad,
      frecuencia,
      observacion: observacion ? String(observacion).trim() : null
    }, finca_id);

    return res.status(201).json(registro);
  } catch (error) {
    console.error('Alimentacion.crear:', error);

    if (error?.status) {
      return res.status(error.status).json({
        mensaje: error.mensaje || 'Validación fallida',
        errores: error.errores || []
      });
    }

    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeUniqueConstraintError'
    ) {
      return res.status(400).json({
        mensaje: 'Validación fallida',
        errores: error.errors?.map((e) => ({
          campo: e.path,
          mensaje: e.message
        }))
      });
    }

    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const actualizar = async (req, res) => {
  try {
    const finca_id = req.user?.finca_id;
    const { id } = req.params;

    if (!finca_id) {
      return res.status(400).json({
        mensaje: 'No se encontró finca_id en el usuario autenticado'
      });
    }

    if (!id) {
      return res.status(400).json({
        mensaje: 'El parámetro id es obligatorio'
      });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        mensaje: 'El body es obligatorio'
      });
    }

    const errores = validarPayload(req.body, true);
    if (errores.length > 0) {
      return res.status(400).json({
        mensaje: 'Validación fallida',
        errores
      });
    }

    const payload = {};

    if ('ganado_id' in req.body) {
      const ganado = await validarGanado(req.body.ganado_id, finca_id);
      if (!ganado) {
        return res.status(400).json({
          mensaje: 'Validación fallida',
          errores: [
            { campo: 'ganado_id', mensaje: 'El ganado seleccionado no existe o no pertenece a la finca' }
          ]
        });
      }
      payload.ganado_id = req.body.ganado_id;
    }

    if ('producto_id' in req.body) {
      const producto = await validarProducto(req.body.producto_id, finca_id);

      if (!producto) {
        return res.status(400).json({
          mensaje: 'Validación fallida',
          errores: [
            { campo: 'producto_id', mensaje: 'El producto seleccionado no existe o no pertenece a la finca' }
          ]
        });
      }

      if (String(producto.tipo || '').toLowerCase() !== 'alimento') {
        return res.status(400).json({
          mensaje: 'Validación fallida',
          errores: [
            { campo: 'producto_id', mensaje: 'El producto seleccionado no es de tipo Alimento' }
          ]
        });
      }

      payload.producto_id = req.body.producto_id;
    }

    if ('tipo_animal' in req.body) payload.tipo_animal = req.body.tipo_animal;
    if ('fecha' in req.body) payload.fecha = req.body.fecha;
    if ('cantidad' in req.body) payload.cantidad = req.body.cantidad;
    if ('frecuencia' in req.body) payload.frecuencia = req.body.frecuencia;

    if ('observacion' in req.body) {
      payload.observacion = req.body.observacion ? String(req.body.observacion).trim() : null;
    }

    const registro = await alimentacionService.update(id, payload, finca_id);

    if (!registro) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }

    return res.json(registro);
  } catch (error) {
    console.error('Alimentacion.actualizar:', error);

    if (error?.status) {
      return res.status(error.status).json({
        mensaje: error.mensaje || 'Validación fallida',
        errores: error.errores || []
      });
    }

    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeUniqueConstraintError'
    ) {
      return res.status(400).json({
        mensaje: 'Validación fallida',
        errores: error.errors?.map((e) => ({
          campo: e.path,
          mensaje: e.message
        }))
      });
    }

    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const eliminar = async (req, res) => {
  try {
    const finca_id = req.user?.finca_id;
    const { id } = req.params;

    if (!finca_id) {
      return res.status(400).json({
        mensaje: 'No se encontró finca_id en el usuario autenticado'
      });
    }

    if (!id) {
      return res.status(400).json({
        mensaje: 'El parámetro id es obligatorio'
      });
    }

    const eliminado = await alimentacionService.remove(id, finca_id);

    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }

    return res.json({ mensaje: 'Registro eliminado correctamente' });
  } catch (error) {
    console.error('Alimentacion.eliminar:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { listar, crear, actualizar, eliminar };