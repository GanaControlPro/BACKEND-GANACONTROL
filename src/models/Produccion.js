module.exports = (sequelize, DataTypes) => {
  const Produccion = sequelize.define("Produccion", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ganado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ganado",
        key: "id"
      }
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    observacion: {
      type: DataTypes.STRING
    }
  }, {
    tableName: "produccion",
    timestamps: true
  });

  return Produccion;
};