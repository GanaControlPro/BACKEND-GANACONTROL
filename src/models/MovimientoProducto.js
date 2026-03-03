module.exports = (sequelize, DataTypes) => {
  const MovimientoProducto = sequelize.define('MovimientoProducto', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    producto_id: { type: DataTypes.INTEGER, allowNull: false },
    tipo: { type: DataTypes.ENUM('ENTRADA', 'SALIDA', 'AJUSTE'), allowNull: false },
    cantidad: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    fecha: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
  }, { tableName: 'movimiento_producto', timestamps: false });

  return MovimientoProducto;
};