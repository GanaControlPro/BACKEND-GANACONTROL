module.exports = (sequelize, DataTypes) => {
  const Alimentacion = sequelize.define('Alimentacion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    finca_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'La finca es obligatoria' },
        isInt: { msg: 'La finca_id debe ser un número' }
      }
    },

    ganado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'El ganado es obligatorio' },
        isInt: { msg: 'El ganado_id debe ser un número' }
      }
    },

    // OJO: opcional, porque no todo alimento tiene que venir de inventario
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: { msg: 'El producto_id debe ser un número' }
      }
    },

    tipo_animal: {
      type: DataTypes.ENUM('Vaca', 'Toro', 'Ternero', 'Novillo'),
      allowNull: false,
      validate: {
        notNull: { msg: 'El tipo de animal es obligatorio' },
        notEmpty: { msg: 'El tipo de animal es obligatorio' }
      }
    },

    nombre_alimento: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: 'El nombre del alimento es obligatorio' },
        notEmpty: { msg: 'El nombre del alimento es obligatorio' },
        len: {
          args: [2, 150],
          msg: 'El nombre del alimento debe tener entre 2 y 150 caracteres'
        }
      }
    },

    tipo_alimento: {
      type: DataTypes.ENUM(
        'Pasto',
        'Concentrado',
        'Suplemento_Mineral',
        'Ensilaje',
        'Heno',
        'Sal',
        'Melaza',
        'Otro'
      ),
      allowNull: false,
      validate: {
        notNull: { msg: 'El tipo de alimento es obligatorio' },
        notEmpty: { msg: 'El tipo de alimento es obligatorio' }
      }
    },

    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: 'La fecha es obligatoria' },
        isDate: { msg: 'Debe ser una fecha válida' }
      }
    },

    cantidad: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
      validate: {
        notNull: { msg: 'La cantidad es obligatoria' },
        isDecimal: { msg: 'Debe ser un número decimal' },
        min: {
          args: [0.01],
          msg: 'La cantidad debe ser mayor que 0'
        }
      }
    },

    frecuencia: {
      type: DataTypes.ENUM(
        'Diaria',
        'Dos_veces_al_dia',
        'Semanal',
        'Quincenal',
        'Mensual'
      ),
      allowNull: false,
      validate: {
        notNull: { msg: 'La frecuencia es obligatoria' },
        notEmpty: { msg: 'La frecuencia es obligatoria' }
      }
    },

    observacion: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        len: {
          args: [0, 200],
          msg: 'La observación no puede superar los 200 caracteres'
        }
      }
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