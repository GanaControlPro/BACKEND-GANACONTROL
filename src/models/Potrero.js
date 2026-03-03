module.exports = (sequelize, DataTypes) => {
  const Potrero = sequelize.define('Potrero', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    finca_id: { type: DataTypes.TINYINT, allowNull: false },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    hectareas: { type: DataTypes.DECIMAL(6, 2), allowNull: true },
    tipo_pasto: { type: DataTypes.STRING(100), allowNull: true },
    capacidad_animales: { type: DataTypes.INTEGER, allowNull: true },
    estado: {
      type: DataTypes.ENUM('Disponible', 'Ocupado', 'Mantenimiento', 'Descanso'),
      defaultValue: 'Disponible'
    }
  }, { tableName: 'potrero', timestamps: false });

  return Potrero;
};