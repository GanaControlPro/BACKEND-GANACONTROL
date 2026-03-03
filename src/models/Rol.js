module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define('Rol', {
    id: { type: DataTypes.TINYINT, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    descripcion: { type: DataTypes.STRING(200), allowNull: false }
  }, { tableName: 'rol', timestamps: false });

  return Rol;
};