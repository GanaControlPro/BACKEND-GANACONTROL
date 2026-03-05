module.exports = (sequelize, DataTypes) => {
  const DetalleVentaGanado = sequelize.define('DetalleVentaGanado', {
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

    ganado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "El ganado es obligatorio" },
        isInt: { msg: "ganado_id debe ser un número entero" }
      }
    },

    precio: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        notNull: { msg: "El precio es obligatorio" },
        isDecimal: { msg: "El precio debe ser decimal" },
        min: 0
      }
    }

  }, {
    tableName: 'detalle_venta_ganado',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['venta_id', 'ganado_id']
      }
    ]
  });

  DetalleVentaGanado.associate = (models) => {
    DetalleVentaGanado.belongsTo(models.Venta, {
      foreignKey: 'venta_id',
      as: 'venta',
      onDelete: 'CASCADE'
    });

    DetalleVentaGanado.belongsTo(models.Ganado, {
      foreignKey: 'ganado_id',
      as: 'ganado'
    });
  };

  return DetalleVentaGanado;
};