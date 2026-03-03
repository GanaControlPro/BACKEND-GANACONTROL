module.exports = (sequelize, DataTypes) => {
  const Produccion = sequelize.define('Produccion', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ganado_id: { type: DataTypes.INTEGER, allowNull: true },
    tipo: { type: DataTypes.ENUM('Leche', 'Carne'), allowNull: false },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    cantidad: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    unidad: { type: DataTypes.STRING(20), allowNull: false },
    disponible: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { tableName: 'produccion', timestamps: false });

  return Produccion;
};