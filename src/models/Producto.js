module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
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

    tipo: {
      type: DataTypes.ENUM('Alimento', 'Medicamento', 'Insumo', 'Herramienta', 'Equipo', 'Otro'),
      allowNull: false,
      validate: {
        notNull: { msg: "El tipo es obligatorio" }
      }
    },

    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre es obligatorio" },
        len: { args: [2, 150], msg: "El nombre debe tener entre 2 y 150 caracteres" }
      }
    },

    categoria: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    proveedor: {
      type: DataTypes.STRING(150),
      allowNull: true
    },

    unidad: {
      type: DataTypes.STRING(30),
      allowNull: true,
      validate: {
        len: { args: [0, 30], msg: "unidad máximo 30 caracteres" }
      }
    },

    ubicacion: {
      type: DataTypes.STRING(120),
      allowNull: true
    },

    precio_unitario: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      validate: {
        isDecimal: { msg: "precio_unitario debe ser decimal" }
      }
    },

    notas: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    fecha_registro: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },

    cantidad_actual: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        isDecimal: { msg: "cantidad_actual debe ser decimal" },
        min: 0
      }
    },

    cantidad_min: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        isDecimal: { msg: "cantidad_min debe ser decimal" },
        min: 0
      }
    },

    estado: {
      type: DataTypes.ENUM('Operativo', 'En_Reparacion', 'Dañado', 'Baja'),
      allowNull: false,
      defaultValue: 'Operativo'
    },

    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'producto',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['nombre', 'finca_id']
      }
    ]
  });

  Producto.associate = (models) => {
    Producto.belongsTo(models.Finca, {
      foreignKey: 'finca_id',
      as: 'finca',
      onDelete: 'CASCADE'
    });

    Producto.hasMany(models.MovimientoProducto, {
      foreignKey: 'producto_id',
      as: 'movimientos'
    });

    Producto.hasMany(models.Alimentacion, {
      foreignKey: 'producto_id',
      as: 'alimentaciones'
    });

    Producto.hasMany(models.EventoSanitario, {
      foreignKey: 'producto_id',
      as: 'eventos_sanitarios'
    });

    Producto.hasMany(models.DetalleVentaProducto, {
      foreignKey: 'producto_id',
      as: 'detalles_venta'
    });
  };

  return Producto;
};