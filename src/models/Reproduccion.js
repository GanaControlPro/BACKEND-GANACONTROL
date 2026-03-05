module.exports = (sequelize, DataTypes) => {
  const Reproduccion = sequelize.define('Reproduccion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    vaca_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "vaca_id es obligatorio" },
        isInt: { msg: "vaca_id debe ser entero" }
      }
    },

    tipo_servicio: {
      type: DataTypes.ENUM('Monta_Natural', 'Inseminacion'),
      allowNull: false,
      validate: {
        notNull: { msg: "tipo_servicio es obligatorio" }
      }
    },

    toro_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: { msg: "toro_id debe ser entero" }
      }
    },

    proveedor_genetico: {
      type: DataTypes.STRING(150),
      allowNull: true
    },

    fecha_servicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: "fecha_servicio es obligatoria" },
        isDate: { msg: "fecha_servicio debe ser válida" }
      }
    },

    // En BD se calcula por trigger BEFORE INSERT
    fecha_probable_parto: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: { msg: "fecha_probable_parto debe ser válida" }
      }
    },

    fecha_parto: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: { msg: "fecha_parto debe ser válida" }
      }
    },

    estado: {
      type: DataTypes.ENUM('Pendiente', 'Gestante', 'Fallida', 'Parto', 'Aborto'),
      allowNull: false,
      defaultValue: 'Pendiente'
    },

    cria_codigo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: { args: [0, 50], msg: "cria_codigo máximo 50 caracteres" }
      }
    }

  }, {
    tableName: 'reproduccion',
    timestamps: false
  });

  Reproduccion.associate = (models) => {
    Reproduccion.belongsTo(models.Ganado, {
      foreignKey: 'vaca_id',
      as: 'vaca'
    });

    Reproduccion.belongsTo(models.Ganado, {
      foreignKey: 'toro_id',
      as: 'toro'
    });
  };

  return Reproduccion;
};