module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define('Rol', {
    id: {
      type: DataTypes.TINYINT,
      primaryKey: true,
      autoIncrement: true
    },

    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "El nombre del rol es obligatorio" },
        len: { args: [2, 50], msg: "El nombre debe tener entre 2 y 50 caracteres" }
      }
    },

    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La descripción es obligatoria" },
        len: { args: [2, 200], msg: "La descripción debe tener entre 2 y 200 caracteres" }
      }
    }

  }, {
    tableName: 'rol',
    timestamps: false
  });

  Rol.associate = (models) => {
    Rol.hasMany(models.Usuario, {
      foreignKey: 'rol_id',
      as: 'usuarios'
    });

    Rol.belongsToMany(models.Permiso, {
      through: 'rol_permiso',
      foreignKey: 'rol_id',
      otherKey: 'permiso_id',
      as: 'permisos'
    });
  };

  return Rol;
};