module.exports = (sequelize, DataTypes) => {
  const Potrero = sequelize.define("Potrero", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING
    }
  }, {
    tableName: "potrero",
    timestamps: true
  });

  return Potrero;
};