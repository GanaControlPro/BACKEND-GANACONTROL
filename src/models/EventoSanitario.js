module.exports = (sequelize, DataTypes) => {
  const EventoSanitario = sequelize.define('EventoSanitario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ganado_id: { type: DataTypes.INTEGER, allowNull: false },
    usuario_id: { type: DataTypes.INTEGER, allowNull: true },
    tipo: {
      type: DataTypes.ENUM('Vacunacion', 'Tratamiento', 'Cirugia', 'Diagnostico', 'Revision', 'Desparasitacion'),
      allowNull: false
    },
    producto_id: { type: DataTypes.INTEGER, allowNull: true },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    dosis: { type: DataTypes.STRING(100), allowNull: true },
    via_administracion: { type: DataTypes.STRING(100), allowNull: true },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    costo: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    proxima_fecha: { type: DataTypes.DATEONLY, allowNull: true }
  }, { tableName: 'evento_sanitario', timestamps: false });

  return EventoSanitario;
};