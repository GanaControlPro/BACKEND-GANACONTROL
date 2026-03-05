module.exports = (sequelize, DataTypes) => {

  const Finca = sequelize.define('Finca', {

    id: {
      type: DataTypes.TINYINT,
      primaryKey: true,
      autoIncrement: true
    },

    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre de la finca es obligatorio" },
        len: {
          args: [2, 150],
          msg: "El nombre debe tener entre 2 y 150 caracteres"
        }
      }
    },

    municipio: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    departamento: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    propietario: {
      type: DataTypes.STRING(150),
      allowNull: true
    },

    prefijo_factura: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'FV',
      validate: {
        notEmpty: { msg: "El prefijo de factura es obligatorio" }
      }
    },

    consecutivo_factura: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: {
          args: [1],
          msg: "El consecutivo debe ser mayor que 0"
        }
      }
    }

  }, {
    tableName: 'finca',
    timestamps: false
  });

  /*
  RELACIONES
  */

  Finca.associate = (models) => {

    Finca.hasMany(models.Usuario, {
      foreignKey: 'finca_id',
      as: 'usuarios'
    });

    Finca.hasMany(models.Potrero, {
      foreignKey: 'finca_id',
      as: 'potreros'
    });

    Finca.hasMany(models.Ganado, {
      foreignKey: 'finca_id',
      as: 'ganado'
    });

    Finca.hasMany(models.Producto, {
      foreignKey: 'finca_id',
      as: 'productos'
    });

    Finca.hasMany(models.Venta, {
      foreignKey: 'finca_id',
      as: 'ventas'
    });

  };

  return Finca;
};