module.exports = (sequelize, DataTypes) => {
  const Permiso = sequelize.define('Permiso', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    codigo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },

    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    },

    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'permiso',
    timestamps: false
  });

  return Permiso;
};