module.exports = (sequelize, DataTypes) => {
  const RolPermiso = sequelize.define('RolPermiso', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    rol_id: {
      type: DataTypes.TINYINT,
      allowNull: false
    },

    permiso_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'rol_permiso',
    timestamps: false
  });

  return RolPermiso;
};