module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    finca_id: { type: DataTypes.TINYINT, allowNull: false },
    tipo: {
      type: DataTypes.ENUM('Alimento', 'Medicamento', 'Insumo', 'Herramienta', 'Equipo', 'Otro'),
      allowNull: false
    },
    nombre: { type: DataTypes.STRING(150), allowNull: false },
    categoria: { type: DataTypes.STRING(100), allowNull: true },
    unidad: { type: DataTypes.STRING(30), allowNull: true },
    cantidad_actual: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
    cantidad_min: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
    estado: { type: DataTypes.ENUM('Operativo', 'En_Reparacion', 'Dañado', 'Baja'), defaultValue: 'Operativo' },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { tableName: 'producto', timestamps: false });

  return Producto;
};