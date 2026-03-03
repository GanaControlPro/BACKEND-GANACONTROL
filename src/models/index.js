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
  Venta, DetalleVentaGanado, DetalleVentaProducto
};