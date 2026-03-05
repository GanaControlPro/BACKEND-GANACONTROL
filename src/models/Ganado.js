module.exports = (sequelize, DataTypes) => {
  const Ganado = sequelize.define('Ganado', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    finca_id: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        notNull: { msg: "finca_id es obligatorio" },
        isInt: { msg: "finca_id debe ser entero" }
      }
    },

    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "El código es obligatorio" },
        len: { args: [2, 50], msg: "El código debe tener entre 2 y 50 caracteres" }
      }
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    sexo: {
      type: DataTypes.ENUM('Macho', 'Hembra'),
      allowNull: false,
      validate: {
        notNull: { msg: "El sexo es obligatorio" }
      }
    },

    categoria: {
      type: DataTypes.ENUM('Ternero', 'Novillo', 'Vaca', 'Toro', 'Otro'),
      allowNull: false,
      validate: {
        notNull: { msg: "La categoría es obligatoria" }
      }
    },

    raza: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: { msg: "fecha_nacimiento debe ser una fecha válida" }
      }
    },

    peso_actual: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
      validate: {
        isDecimal: { msg: "peso_actual debe ser decimal" },
        min: 0
      }
    },

    estado_general: {
      type: DataTypes.ENUM('Activo', 'Inactivo'),
      allowNull: false,
      defaultValue: 'Activo'
    },

    estado_biologico: {
      type: DataTypes.ENUM('Vivo', 'Muerto'),
      allowNull: false,
      defaultValue: 'Vivo'
    },

    estado_comercial: {
      type: DataTypes.ENUM('Disponible', 'Vendido', 'Descartado'),
      allowNull: false,
      defaultValue: 'Disponible'
    },

    potrero_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { isInt: { msg: "potrero_id debe ser entero" } }
    },

    madre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { isInt: { msg: "madre_id debe ser entero" } }
    },

    padre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { isInt: { msg: "padre_id debe ser entero" } }
    },

    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    creado_en: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }

  }, {
    tableName: 'ganado',
    timestamps: false
  });

  Ganado.associate = (models) => {
    // FK a finca
    Ganado.belongsTo(models.Finca, {
      foreignKey: 'finca_id',
      as: 'finca'
    });

    // FK a potrero
    Ganado.belongsTo(models.Potrero, {
      foreignKey: 'potrero_id',
      as: 'potrero'
    });

    // Self relations (madre/padre)
    Ganado.belongsTo(models.Ganado, {
      foreignKey: 'madre_id',
      as: 'madre'
    });

    Ganado.belongsTo(models.Ganado, {
      foreignKey: 'padre_id',
      as: 'padre'
    });

    Ganado.hasMany(models.Produccion, {
      foreignKey: 'ganado_id',
      as: 'producciones'
    });

    Ganado.hasMany(models.Alimentacion, {
      foreignKey: 'ganado_id',
      as: 'alimentaciones'
    });

    Ganado.hasMany(models.EventoSanitario, {
      foreignKey: 'ganado_id',
      as: 'eventos_sanitarios'
    });

    // Reproducción: una vaca puede tener muchos registros
    Ganado.hasMany(models.Reproduccion, {
      foreignKey: 'vaca_id',
      as: 'reproducciones'
    });

    // Reproducción: un toro puede aparecer en muchos registros
    Ganado.hasMany(models.Reproduccion, {
      foreignKey: 'toro_id',
      as: 'servicios_como_toro'
    });

    Ganado.hasMany(models.DetalleVentaGanado, {
      foreignKey: 'ganado_id',
      as: 'detalles_venta'
    });
  };

  return Ganado;
};