module.exports = (sequelize, DataTypes) => {
  const DetalleVentaGanado = sequelize.define('DetalleVentaGanado', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    venta_id: { type: DataTypes.INTEGER, allowNull: false },
    ganado_id: { type: DataTypes.INTEGER, allowNull: false },
    precio: { type: DataTypes.DECIMAL(12, 2), allowNull: false }
  }, { tableName: 'detalle_venta_ganado', timestamps: false });

  return DetalleVentaGanado;
};