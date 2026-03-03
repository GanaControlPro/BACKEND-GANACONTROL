module.exports = (sequelize, DataTypes) => {
  const Alimentacion = sequelize.define('Alimentacion', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ganado_id: { type: DataTypes.INTEGER, allowNull: false },
    producto_id: { type: DataTypes.INTEGER, allowNull: false },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    cantidad: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
    observacion: { type: DataTypes.STRING(200), allowNull: true }
  }, { tableName: 'alimentacion', timestamps: false });

  return Alimentacion;
};