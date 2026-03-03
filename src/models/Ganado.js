module.exports = (sequelize, DataTypes) => {
  const Ganado = sequelize.define('Ganado', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    finca_id: { type: DataTypes.TINYINT, allowNull: false },
    codigo: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    nombre: DataTypes.STRING(100),
    sexo: { type: DataTypes.ENUM('Macho','Hembra'), allowNull: false },
    categoria: { type: DataTypes.ENUM('Ternero','Novillo','Vaca','Toro','Otro'), allowNull: false },
    raza: DataTypes.STRING(100),
    fecha_nacimiento: DataTypes.DATEONLY,
    peso_actual: DataTypes.DECIMAL(6,2),
    estado_general: { type: DataTypes.ENUM('Activo','Inactivo'), defaultValue: 'Activo' },
    estado_biologico: { type: DataTypes.ENUM('Vivo','Muerto'), defaultValue: 'Vivo' },
    estado_comercial: { type: DataTypes.ENUM('Disponible','Vendido','Descartado'), defaultValue: 'Disponible' },
    potrero_id: DataTypes.INTEGER,
    madre_id: DataTypes.INTEGER,
    padre_id: DataTypes.INTEGER,
    observaciones: DataTypes.TEXT,
    creado_en: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
  }, { tableName: 'ganado', timestamps: false });

  return Ganado;
};