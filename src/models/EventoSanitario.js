module.exports = (sequelize, DataTypes) => {
  return sequelize.define('EventoSanitario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tipo_evento: {
      type: DataTypes.STRING(100), // Vacunación, Desparasitación, Tratamiento, etc.
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    medicamento: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    dosis: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'eventos_sanitarios',
    timestamps: true
  });
};