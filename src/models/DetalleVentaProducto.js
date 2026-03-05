module.exports = (sequelize, DataTypes) => {
  const DetalleVentaProducto = sequelize.define('DetalleVentaProducto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    venta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "La venta es obligatoria" },
        isInt: { msg: "venta_id debe ser un número entero" }
      }
    },

    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: { msg: "producto_id debe ser un número entero" }
      }
    },

    produccion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: { msg: "produccion_id debe ser un número entero" }
      }
    },

    cantidad: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      validate: {
        isDecimal: { msg: "cantidad debe ser decimal" },
        min: 0
      }
    },

    precio_unitario: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      validate: {
        isDecimal: { msg: "precio_unitario debe ser decimal" },
        min: 0
      }
    },

    subtotal: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: true,
      validate: {
        isDecimal: { msg: "subtotal debe ser decimal" },
        min: 0
      }
    }

  }, {
    tableName: 'detalle_venta_producto',
    timestamps: false
  });

  DetalleVentaProducto.associate = (models) => {
    DetalleVentaProducto.belongsTo(models.Venta, {
      foreignKey: 'venta_id',
      as: 'venta',
      onDelete: 'CASCADE'
    });

    DetalleVentaProducto.belongsTo(models.Producto, {
      foreignKey: 'producto_id',
      as: 'producto'
    });

    DetalleVentaProducto.belongsTo(models.Produccion, {
      foreignKey: 'produccion_id',
      as: 'produccion'
    });
  };

  // ✅ Regla útil: debe venir producto_id o produccion_id (al menos uno)
  // Si quieres hacerla estricta a nivel API, es mejor validarla en el controller.
  // Pero si la quieres en modelo, se puede con validate:
  DetalleVentaProducto.addHook('beforeValidate', (row) => {
    if (!row.producto_id && !row.produccion_id) {
      throw new Error("Debe enviar producto_id o produccion_id");
    }
  });

  return DetalleVentaProducto;
};