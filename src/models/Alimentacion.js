module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Alimentacion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tipo_alimento: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cantidad: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    unidad: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    tableName: 'alimentaciones',
    timestamps: true
  });
};