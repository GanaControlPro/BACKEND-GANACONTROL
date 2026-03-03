module.exports = (sequelize, DataTypes) => {
  const Reproduccion = sequelize.define('Reproduccion', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    vaca_id: { type: DataTypes.INTEGER, allowNull: false },
    tipo_servicio: { type: DataTypes.ENUM('Monta_Natural', 'Inseminacion'), allowNull: false },
    toro_id: { type: DataTypes.INTEGER, allowNull: true },
    proveedor_genetico: { type: DataTypes.STRING(150), allowNull: true },
    fecha_servicio: { type: DataTypes.DATEONLY, allowNull: false },
    fecha_probable_parto: { type: DataTypes.DATEONLY, allowNull: true },
    fecha_parto: { type: DataTypes.DATEONLY, allowNull: true },
    estado: { type: DataTypes.ENUM('Pendiente', 'Gestante', 'Fallida', 'Parto', 'Aborto'), defaultValue: 'Pendiente' },
    cria_codigo: { type: DataTypes.STRING(50), allowNull: true }
  }, { tableName: 'reproduccion', timestamps: false });

  return Reproduccion;
};