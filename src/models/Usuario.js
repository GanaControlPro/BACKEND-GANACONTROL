module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
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

    rol_id: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        notNull: { msg: "rol_id es obligatorio" },
        isInt: { msg: "rol_id debe ser entero" }
      }
    },

    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Los nombres son obligatorios" },
        len: { args: [2, 100], msg: "nombres debe tener entre 2 y 100 caracteres" }
      }
    },

    apellidos: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: { args: [0, 100], msg: "apellidos máximo 100 caracteres" }
      }
    },

    correo: {
      type: DataTypes.STRING(150),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: { msg: "El correo no tiene un formato válido" },
        len: { args: [0, 150], msg: "correo máximo 150 caracteres" }
      }
    },

    contrasena: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La contraseña es obligatoria" },
        len: { args: [6, 255], msg: "La contraseña debe tener al menos 6 caracteres" }
      }
    },

    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },

    creado_en: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }

  }, {
    tableName: 'usuario',
    timestamps: false,
    hooks: {
      // Normaliza correo (evita duplicados por mayúsculas)
      beforeValidate: (user) => {
        if (user.correo) user.correo = user.correo.trim().toLowerCase();
      }
    }
  });

  Usuario.associate = (models) => {
    Usuario.belongsTo(models.Finca, {
      foreignKey: 'finca_id',
      as: 'finca',
      onDelete: 'CASCADE'
    });

    Usuario.belongsTo(models.Rol, {
      foreignKey: 'rol_id',
      as: 'rol'
    });

    Usuario.hasMany(models.EventoSanitario, {
      foreignKey: 'usuario_id',
      as: 'eventos_sanitarios'
    });
  };

  return Usuario;
};