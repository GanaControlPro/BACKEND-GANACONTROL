module.exports = (sequelize, DataTypes) => {
  const LogActividad = sequelize.define('LogActividad', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },

    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    modulo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    accion: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    ip: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    metodo_http: {
      type: DataTypes.STRING(10),
      allowNull: true
    },

    ruta: {
      type: DataTypes.STRING(255),
      allowNull: true
    },

    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'log_actividad',
    timestamps: false
  });

  LogActividad.associate = (models) => {
    LogActividad.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario'
    });
  };

  return LogActividad;
};