module.exports = (sequelize, DataTypes) => {
  const Produccion = sequelize.define('Produccion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    ganado_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: { msg: "ganado_id debe ser entero" }
      }
    },

    tipo: {
      type: DataTypes.ENUM('Leche', 'Carne'),
      allowNull: false,
      validate: {
        notNull: { msg: "El tipo de producción es obligatorio" }
      }
    },

    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: "La fecha es obligatoria" },
        isDate: { msg: "fecha debe ser válida" }
      }
    },

    cantidad: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: { msg: "La cantidad es obligatoria" },
        isDecimal: { msg: "cantidad debe ser decimal" },
        min: 0
      }
    },

    unidad: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La unidad es obligatoria (ej: L, kg)" },
        len: { args: [1, 20], msg: "unidad máximo 20 caracteres" }
      }
    },

    disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }

  }, {
    tableName: 'produccion',
    timestamps: false
  });

  Produccion.associate = (models) => {
    Produccion.belongsTo(models.Ganado, {
      foreignKey: 'ganado_id',
      as: 'ganado',
      onDelete: 'SET NULL'
    });

    // Detalles de venta por producción
    Produccion.hasMany(models.DetalleVentaProducto, {
      foreignKey: 'produccion_id',
      as: 'detalles_venta_produccion'
    });
  };

  return Produccion;
};