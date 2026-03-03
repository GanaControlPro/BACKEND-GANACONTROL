module.exports = (sequelize, DataTypes) => {
  const Venta = sequelize.define('Venta', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    finca_id: { type: DataTypes.TINYINT, allowNull: false },
    cliente: { type: DataTypes.STRING(150), allowNull: false },
    numero_factura: { type: DataTypes.STRING(30), allowNull: true, unique: true },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    total: { type: DataTypes.DECIMAL(14, 2), defaultValue: 0 }
  }, { tableName: 'venta', timestamps: false });

  return Venta;
};