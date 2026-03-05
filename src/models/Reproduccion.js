module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Reproduccion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha_servicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tipo_servicio: {
      type: DataTypes.STRING(100), // Natural, Inseminación Artificial, Transferencia, etc.
      allowNull: false
    },
    fecha_diagnostico: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    resultado: {
      type: DataTypes.STRING(50), // Preñada, Vacía, Repetición
      allowNull: true
    },
    fecha_parto: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'reproducciones',
    timestamps: true
  });
};