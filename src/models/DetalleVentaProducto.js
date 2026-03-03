module.exports = (sequelize, DataTypes) => {
  const DetalleVentaProducto = sequelize.define('DetalleVentaProducto', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    venta_id: { type: DataTypes.INTEGER, allowNull: false },
    producto_id: { type: DataTypes.INTEGER, allowNull: true },
    produccion_id: { type: DataTypes.INTEGER, allowNull: true },
    cantidad: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
    precio_unitario: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
    subtotal: { type: DataTypes.DECIMAL(14, 2), allowNull: true }
  }, { tableName: 'detalle_venta_producto', timestamps: false });

  return DetalleVentaProducto;
};