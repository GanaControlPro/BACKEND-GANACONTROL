module.exports = (sequelize, DataTypes) => {
  const MovimientoProducto = sequelize.define('MovimientoProducto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "producto_id es obligatorio" },
        isInt: { msg: "producto_id debe ser entero" }
      }
    },

    tipo: {
      type: DataTypes.ENUM('ENTRADA', 'SALIDA', 'AJUSTE'),
      allowNull: false,
      validate: {
        notNull: { msg: "El tipo de movimiento es obligatorio" }
      }
    },

    cantidad: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        notNull: { msg: "La cantidad es obligatoria" },
        isDecimal: { msg: "cantidad debe ser decimal" },
        min: 0
      }
    },

    fecha: {
      type: DataTypes.DATE, // TIMESTAMP en MySQL
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }

  }, {
    tableName: 'movimiento_producto',
    timestamps: false
  });

  MovimientoProducto.associate = (models) => {
    MovimientoProducto.belongsTo(models.Producto, {
      foreignKey: 'producto_id',
      as: 'producto'
    });
  };

  return MovimientoProducto;
};