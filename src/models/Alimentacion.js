module.exports = (sequelize, DataTypes) => {
  const Alimentacion = sequelize.define('Alimentacion', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    ganado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "El ganado es obligatorio" },
        isInt: { msg: "El ganado_id debe ser un número" }
      }
    },

    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "El producto es obligatorio" },
        isInt: { msg: "El producto_id debe ser un número" }
      }
    },

    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: "La fecha es obligatoria" },
        isDate: { msg: "Debe ser una fecha válida" }
      }
    },

    cantidad: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: false,
      validate: {
        notNull: { msg: "La cantidad es obligatoria" },
        isDecimal: { msg: "Debe ser un número decimal" }
      }
    },

    observacion: {
      type: DataTypes.STRING(200),
      allowNull: true
    }

  }, {
    tableName: 'alimentacion',
    timestamps: false
  });

  Alimentacion.associate = (models) => {

    Alimentacion.belongsTo(models.Ganado, {
      foreignKey: 'ganado_id',
      as: 'ganado'
    });

    Alimentacion.belongsTo(models.Producto, {
      foreignKey: 'producto_id',
      as: 'producto'
    });

  };

  return Alimentacion;
};