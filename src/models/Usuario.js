module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    finca_id: { type: DataTypes.TINYINT, allowNull: false },
    rol_id: { type: DataTypes.TINYINT, allowNull: false },
    nombres: { type: DataTypes.STRING(100), allowNull: false },
    apellidos: DataTypes.STRING(100),
    correo: { type: DataTypes.STRING(150), unique: true },
    contrasena: { type: DataTypes.STRING(255), allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    creado_en: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
  }, { tableName: 'usuario', timestamps: false });

  return Usuario;
};