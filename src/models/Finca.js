module.exports = (sequelize, DataTypes) => {
  const Finca = sequelize.define('Finca', {
    id: { type: DataTypes.TINYINT, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(150), allowNull: false },
    municipio: DataTypes.STRING(100),
    departamento: DataTypes.STRING(100),
    propietario: DataTypes.STRING(150),
    prefijo_factura: { type: DataTypes.STRING(10), allowNull: false, defaultValue: 'FV' },
    consecutivo_factura: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
  }, { tableName: 'finca', timestamps: false });

  return Finca;
};