module.exports = (sequelize, DataTypes) => {

  const Potrero = sequelize.define('Potrero', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    finca_id: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        notNull: { msg: "La finca es obligatoria" },
        isInt: { msg: "finca_id debe ser entero" }
      }
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre del potrero es obligatorio" }
      }
    },

    hectareas: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: true,
      validate: {
        isDecimal: { msg: "hectareas debe ser decimal" },
        min: 0
      }
    },

    tipo_pasto: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    capacidad_animales: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: { msg: "capacidad_animales debe ser número entero" },
        min: 0
      }
    },

    estado: {
      type: DataTypes.ENUM(
        'Disponible',
        'Ocupado',
        'Mantenimiento',
        'Descanso'
      ),
      allowNull: false,
      defaultValue: 'Disponible'
    }

  }, {
    tableName: 'potrero',
    timestamps: false
  });

  Potrero.associate = (models) => {

    Potrero.belongsTo(models.Finca, {
      foreignKey: 'finca_id',
      as: 'finca'
    });

    Potrero.hasMany(models.Ganado, {
      foreignKey: 'potrero_id',
      as: 'ganado'
    });

  };

  return Potrero;
};