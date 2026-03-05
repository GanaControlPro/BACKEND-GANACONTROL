module.exports = (sequelize, DataTypes) => {
  const EventoSanitario = sequelize.define('EventoSanitario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    ganado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "ganado_id es obligatorio" },
        isInt: { msg: "ganado_id debe ser entero" }
      }
    },

    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: { msg: "usuario_id debe ser entero" }
      }
    },

    tipo: {
      type: DataTypes.ENUM(
        'Vacunacion',
        'Tratamiento',
        'Cirugia',
        'Diagnostico',
        'Revision',
        'Desparasitacion'
      ),
      allowNull: false,
      validate: {
        notNull: { msg: "El tipo es obligatorio" }
      }
    },

    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: { msg: "producto_id debe ser entero" }
      }
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    dosis: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    via_administracion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: "La fecha es obligatoria" },
        isDate: { msg: "Debe ser una fecha válida" }
      }
    },

    costo: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        isDecimal: { msg: "costo debe ser decimal" },
        min: 0
      }
    },

    proxima_fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: { msg: "proxima_fecha debe ser una fecha válida" }
      }
    }

  }, {
    tableName: 'evento_sanitario',
    timestamps: false
  });

  EventoSanitario.associate = (models) => {
    EventoSanitario.belongsTo(models.Ganado, {
      foreignKey: 'ganado_id',
      as: 'ganado'
    });

    EventoSanitario.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario'
    });

    EventoSanitario.belongsTo(models.Producto, {
      foreignKey: 'producto_id',
      as: 'producto'
    });
  };

  return EventoSanitario;
};