const { sequelize, Alimentacion, Producto } = require('../models');

const TIPOS_ALIMENTO_VALIDOS = [
  'Pasto',
  'Concentrado',
  'Suplemento_Mineral',
  'Ensilaje',
  'Heno',
  'Sal',
  'Melaza',
  'Otro'
];

class AlimentacionService {
  async getAll(finca_id) {
    return await Alimentacion.findAll({
      where: { finca_id },
      include: [
        {
          association: 'ganado',
          attributes: ['id', 'codigo', 'nombre', 'raza']
        },
        {
          association: 'producto',
          attributes: ['id', 'nombre', 'tipo', 'cantidad_actual'],
          required: false
        }
      ],
      order: [['fecha', 'DESC'], ['id', 'DESC']]
    });
  }

  async getById(id, finca_id) {
    return await Alimentacion.findOne({
      where: { id, finca_id },
      include: [
        {
          association: 'ganado',
          attributes: ['id', 'codigo', 'nombre', 'raza']
        },
        {
          association: 'producto',
          attributes: ['id', 'nombre', 'tipo', 'cantidad_actual'],
          required: false
        }
      ]
    });
  }

  async create(data, finca_id) {
    return await sequelize.transaction(async (t) => {
      const producto = await Producto.findOne({
        where: {
          id: data.producto_id,
          finca_id,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!producto) {
        throw {
          status: 400,
          mensaje: 'El producto seleccionado no existe.',
          errores: [{ campo: 'producto_id', mensaje: 'Producto no encontrado' }],
        };
      }

      if (String(producto.tipo || '').toLowerCase() !== 'alimento') {
        throw {
          status: 400,
          mensaje: 'El producto seleccionado no es de tipo Alimento.',
          errores: [
            { campo: 'producto_id', mensaje: 'Solo se permiten productos tipo Alimento' }
          ],
        };
      }

      const stockActual = Number(producto.cantidad_actual || 0);
      const cantidadSolicitada = Number(data.cantidad || 0);

      if (cantidadSolicitada <= 0) {
        throw {
          status: 400,
          mensaje: 'La cantidad debe ser mayor que 0.',
          errores: [{ campo: 'cantidad', mensaje: 'Cantidad inválida' }],
        };
      }

      if (stockActual < cantidadSolicitada) {
        throw {
          status: 400,
          mensaje: 'Stock insuficiente para registrar la alimentación.',
          errores: [
            {
              campo: 'cantidad',
              mensaje: `Stock disponible: ${stockActual}. Cantidad solicitada: ${cantidadSolicitada}`
            }
          ],
        };
      }

      const tipoAlimentoSeguro = TIPOS_ALIMENTO_VALIDOS.includes(producto.categoria_alimento)
        ? producto.categoria_alimento
        : 'Otro';

      const creado = await Alimentacion.create({
        ...data,
        finca_id,
        nombre_alimento: producto.nombre,
        tipo_alimento: tipoAlimentoSeguro
      }, { transaction: t });

      await producto.update({
        cantidad_actual: stockActual - cantidadSolicitada,
      }, { transaction: t });

      return await Alimentacion.findOne({
        where: { id: creado.id, finca_id },
        include: [
          {
            association: 'ganado',
            attributes: ['id', 'codigo', 'nombre', 'raza']
          },
          {
            association: 'producto',
            attributes: ['id', 'nombre', 'tipo', 'cantidad_actual'],
            required: false
          }
        ],
        transaction: t
      });
    });
  }

  async update(id, data, finca_id) {
    return await sequelize.transaction(async (t) => {
      const registro = await Alimentacion.findOne({
        where: { id, finca_id },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!registro) return null;

      const productoAnteriorId = registro.producto_id;
      const cantidadAnterior = Number(registro.cantidad || 0);

      const nuevoProductoId =
        data.producto_id !== undefined ? data.producto_id : registro.producto_id;

      const nuevaCantidad =
        data.cantidad !== undefined ? Number(data.cantidad) : Number(registro.cantidad || 0);

      if (nuevaCantidad <= 0) {
        throw {
          status: 400,
          mensaje: 'La cantidad debe ser mayor que 0.',
          errores: [{ campo: 'cantidad', mensaje: 'Cantidad inválida' }],
        };
      }

      let productoAnterior = null;
      if (productoAnteriorId) {
        productoAnterior = await Producto.findOne({
          where: { id: productoAnteriorId, finca_id },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
      }

      let productoNuevo = null;
      if (nuevoProductoId) {
        productoNuevo = await Producto.findOne({
          where: { id: nuevoProductoId, finca_id },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });

        if (!productoNuevo) {
          throw {
            status: 400,
            mensaje: 'El producto seleccionado no existe.',
            errores: [{ campo: 'producto_id', mensaje: 'Producto no encontrado' }],
          };
        }

        if (String(productoNuevo.tipo || '').toLowerCase() !== 'alimento') {
          throw {
            status: 400,
            mensaje: 'El producto seleccionado no es de tipo Alimento.',
            errores: [
              { campo: 'producto_id', mensaje: 'Solo se permiten productos tipo Alimento' }
            ],
          };
        }
      }

      if (productoAnterior && productoAnteriorId === nuevoProductoId) {
        const stockActual = Number(productoAnterior.cantidad_actual || 0);
        const stockDisponibleReal = stockActual + cantidadAnterior;

        if (stockDisponibleReal < nuevaCantidad) {
          throw {
            status: 400,
            mensaje: 'Stock insuficiente para actualizar la alimentación.',
            errores: [
              {
                campo: 'cantidad',
                mensaje: `Stock disponible: ${stockDisponibleReal}. Cantidad solicitada: ${nuevaCantidad}`
              }
            ],
          };
        }

        await productoAnterior.update({
          cantidad_actual: stockDisponibleReal - nuevaCantidad,
        }, { transaction: t });
      } else {
        if (productoAnterior) {
          const stockAnterior = Number(productoAnterior.cantidad_actual || 0);

          await productoAnterior.update({
            cantidad_actual: stockAnterior + cantidadAnterior,
          }, { transaction: t });
        }

        if (productoNuevo) {
          const stockNuevo = Number(productoNuevo.cantidad_actual || 0);

          if (stockNuevo < nuevaCantidad) {
            throw {
              status: 400,
              mensaje: 'Stock insuficiente para actualizar la alimentación.',
              errores: [
                {
                  campo: 'cantidad',
                  mensaje: `Stock disponible: ${stockNuevo}. Cantidad solicitada: ${nuevaCantidad}`
                }
              ],
            };
          }

          await productoNuevo.update({
            cantidad_actual: stockNuevo - nuevaCantidad,
          }, { transaction: t });
        }
      }

      const tipoAlimentoSeguro = productoNuevo
        ? (
            TIPOS_ALIMENTO_VALIDOS.includes(productoNuevo.categoria_alimento)
              ? productoNuevo.categoria_alimento
              : 'Otro'
          )
        : registro.tipo_alimento;

      const payloadFinal = {
        ...data,
        nombre_alimento: productoNuevo?.nombre || registro.nombre_alimento,
        tipo_alimento: tipoAlimentoSeguro
      };

      await registro.update(payloadFinal, { transaction: t });

      return await Alimentacion.findOne({
        where: { id, finca_id },
        include: [
          {
            association: 'ganado',
            attributes: ['id', 'codigo', 'nombre', 'raza']
          },
          {
            association: 'producto',
            attributes: ['id', 'nombre', 'tipo', 'cantidad_actual'],
            required: false
          }
        ],
        transaction: t
      });
    });
  }

  async remove(id, finca_id) {
    return await sequelize.transaction(async (t) => {
      const registro = await Alimentacion.findOne({
        where: { id, finca_id },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!registro) return null;

      if (registro.producto_id) {
        const producto = await Producto.findOne({
          where: { id: registro.producto_id, finca_id },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });

        if (producto) {
          const stockActual = Number(producto.cantidad_actual || 0);
          const cantidadDevuelta = Number(registro.cantidad || 0);

          await producto.update(
            { cantidad_actual: stockActual + cantidadDevuelta },
            { transaction: t }
          );
        }
      }

      await registro.destroy({ transaction: t });
      return true;
    });
  }
}

module.exports = new AlimentacionService();