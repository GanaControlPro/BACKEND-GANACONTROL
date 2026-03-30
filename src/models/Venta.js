module.exports = (sequelize, DataTypes) => {
  const Venta = sequelize.define('Venta', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    finca_id: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        notNull: { msg: "finca_id es obligatorio" },
        isInt: { msg: "finca_id debe ser entero" }
      }
    },

    cliente: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El cliente es obligatorio" },
        len: { args: [2, 150], msg: "cliente debe tener entre 2 y 150 caracteres" }
      }
    },

    // Lo genera el trigger; lo dejamos allowNull true
    numero_factura: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: true
    },

    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: "La fecha es obligatoria" },
        isDate: { msg: "fecha debe ser válida" }
      }
    },

    total: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        isDecimal: { msg: "total debe ser decimal" },
        min: 0
      }
    },

    estado: {
    type: DataTypes.ENUM('Pendiente', 'Completado'),
    allowNull: false,
    defaultValue: 'Pendiente'
  }

  }, {
    tableName: 'venta',
    timestamps: false
  });

  module.exports = (sequelize, DataTypes) => {
  const Venta = sequelize.define('Venta', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    finca_id: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        notNull: { msg: "finca_id es obligatorio" },
        isInt: { msg: "finca_id debe ser entero" }
      }
    },

    cliente: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El cliente es obligatorio" },
        len: { args: [2, 150], msg: "cliente debe tener entre 2 y 150 caracteres" }
      }
    },

    numero_factura: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: true
    },

    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: "La fecha es obligatoria" },
        isDate: { msg: "fecha debe ser válida" }
      }
    },

    total: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        isDecimal: { msg: "total debe ser decimal" },
        min: 0
      }
    },

    estado: {
      type: DataTypes.ENUM('Pendiente', 'Completado'),
      allowNull: false,
      defaultValue: 'Pendiente'
    }

  }, {
    tableName: 'venta',
    timestamps: false
  });

  Venta.associate = (models) => {
    Venta.belongsTo(models.Finca, {
      foreignKey: 'finca_id',
      as: 'finca'
    });

    Venta.hasMany(models.DetalleVentaGanado, {
      foreignKey: 'venta_id',
      as: 'detalle_ganado',
      onDelete: 'CASCADE'
    });

    Venta.hasMany(models.DetalleVentaProducto, {
      foreignKey: 'venta_id',
      as: 'detalle_productos',
      onDelete: 'CASCADE'
    });
  };

  return Venta;
};

  return Venta;
};