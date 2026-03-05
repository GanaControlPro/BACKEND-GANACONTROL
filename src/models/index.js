const { sequelize } = require('../database/sequelize');
const { DataTypes } = require('sequelize');

const Finca = require('./Finca')(sequelize, DataTypes);
const Rol = require('./Rol')(sequelize, DataTypes);
const Usuario = require('./Usuario')(sequelize, DataTypes);
const Potrero = require('./Potrero')(sequelize, DataTypes);
const Ganado = require('./Ganado')(sequelize, DataTypes);
const Producto = require('./Producto')(sequelize, DataTypes);
const MovimientoProducto = require('./MovimientoProducto')(sequelize, DataTypes);
const Venta = require('./Venta')(sequelize, DataTypes);
const DetalleVentaGanado = require('./DetalleVentaGanado')(sequelize, DataTypes);
const DetalleVentaProducto = require('./DetalleVentaProducto')(sequelize, DataTypes);
const Produccion = require('./Produccion')(sequelize, DataTypes); 
const Alimentacion = require('./Alimentacion')(sequelize, DataTypes);
const EventoSanitario = require('./EventoSanitario')(sequelize, DataTypes);
const Reproduccion = require('./Reproduccion')(sequelize, DataTypes);

// ===== relaciones clave =====
Finca.hasMany(Usuario, { foreignKey: 'finca_id' });
Usuario.belongsTo(Finca, { foreignKey: 'finca_id' });

Rol.hasMany(Usuario, { foreignKey: 'rol_id' });
Usuario.belongsTo(Rol, { foreignKey: 'rol_id' });

Finca.hasMany(Potrero, { foreignKey: 'finca_id' });
Potrero.belongsTo(Finca, { foreignKey: 'finca_id' });

Finca.hasMany(Ganado, { foreignKey: 'finca_id' });
Ganado.belongsTo(Finca, { foreignKey: 'finca_id' });

Potrero.hasMany(Ganado, { foreignKey: 'potrero_id' });
Ganado.belongsTo(Potrero, { foreignKey: 'potrero_id' });

// ===== PRODUCCION =====
Finca.hasMany(Produccion, { foreignKey: 'finca_id' });
Produccion.belongsTo(Finca, { foreignKey: 'finca_id' });

Ganado.hasMany(Produccion, { foreignKey: 'ganado_id' });
Produccion.belongsTo(Ganado, { foreignKey: 'ganado_id' });

// ===== ALIMENTACION =====
Finca.hasMany(Alimentacion, { foreignKey: 'finca_id' });
Alimentacion.belongsTo(Finca, { foreignKey: 'finca_id' });

Ganado.hasMany(Alimentacion, { foreignKey: 'ganado_id' });
Alimentacion.belongsTo(Ganado, { foreignKey: 'ganado_id' });

// ===== EVENTO SANITARIO =====
Finca.hasMany(EventoSanitario, { foreignKey: 'finca_id' });
EventoSanitario.belongsTo(Finca, { foreignKey: 'finca_id' });

Ganado.hasMany(EventoSanitario, { foreignKey: 'ganado_id' });
EventoSanitario.belongsTo(Ganado, { foreignKey: 'ganado_id' });

// ===== REPRODUCCION =====
Finca.hasMany(Reproduccion, { foreignKey: 'finca_id' });
Reproduccion.belongsTo(Finca, { foreignKey: 'finca_id' });

// Hembra
Ganado.hasMany(Reproduccion, { foreignKey: 'hembra_id' });
Reproduccion.belongsTo(Ganado, { as: 'hembra', foreignKey: 'hembra_id' });

// Macho (o toro)
Ganado.hasMany(Reproduccion, { foreignKey: 'macho_id' });
Reproduccion.belongsTo(Ganado, { as: 'macho', foreignKey: 'macho_id' });

// autoreferencias madre/padre
Ganado.belongsTo(Ganado, { as: 'madre', foreignKey: 'madre_id' });
Ganado.belongsTo(Ganado, { as: 'padre', foreignKey: 'padre_id' });

Producto.hasMany(MovimientoProducto, { foreignKey: 'producto_id' });
MovimientoProducto.belongsTo(Producto, { foreignKey: 'producto_id' });

Finca.hasMany(Venta, { foreignKey: 'finca_id' });
Venta.belongsTo(Finca, { foreignKey: 'finca_id' });

Venta.hasMany(DetalleVentaGanado, { foreignKey: 'venta_id' });
DetalleVentaGanado.belongsTo(Venta, { foreignKey: 'venta_id' });
DetalleVentaGanado.belongsTo(Ganado, { foreignKey: 'ganado_id' });

Venta.hasMany(DetalleVentaProducto, { foreignKey: 'venta_id' });
DetalleVentaProducto.belongsTo(Venta, { foreignKey: 'venta_id' });

module.exports = {
  sequelize,
  Finca, Rol, Usuario, Potrero, Ganado,
  Producto, MovimientoProducto,
  Venta, DetalleVentaGanado, DetalleVentaProducto,
  Produccion,
  Alimentacion,
  EventoSanitario,
  Reproduccion
};