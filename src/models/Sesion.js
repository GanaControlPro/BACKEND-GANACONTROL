module.exports = (sequelize, DataTypes) => {
  const Sesion = sequelize.define('Sesion', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },

    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    refresh_token_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    ip: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    dispositivo: {
      type: DataTypes.STRING(150),
      allowNull: true
    },

    ultimo_uso: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },

    expira_en: {
      type: DataTypes.DATE,
      allowNull: false
    },

    revocada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    creado_en: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'sesion',
    timestamps: false
  });

  Sesion.associate = (models) => {
    Sesion.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario',
      onDelete: 'CASCADE'
    });
  };

  return Sesion;
};