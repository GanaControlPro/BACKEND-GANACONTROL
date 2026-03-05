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

/* =========================================================
   RELACIONES (alineadas con tu BD ganacontrol)
   ========================================================= */

/* FINCA -> USUARIO / POTRERO / GANADO / PRODUCTO / VENTA */
Finca.hasMany(Usuario, { foreignKey: 'finca_id', as: 'usuarios' });
Usuario.belongsTo(Finca, { foreignKey: 'finca_id', as: 'finca' });

Finca.hasMany(Potrero, { foreignKey: 'finca_id', as: 'potreros' });
Potrero.belongsTo(Finca, { foreignKey: 'finca_id', as: 'finca' });

Finca.hasMany(Ganado, { foreignKey: 'finca_id', as: 'ganado' });
Ganado.belongsTo(Finca, { foreignKey: 'finca_id', as: 'finca' });

Finca.hasMany(Producto, { foreignKey: 'finca_id', as: 'productos' });
Producto.belongsTo(Finca, { foreignKey: 'finca_id', as: 'finca' });

Finca.hasMany(Venta, { foreignKey: 'finca_id', as: 'ventas' });
Venta.belongsTo(Finca, { foreignKey: 'finca_id', as: 'finca' });

/* ROL -> USUARIO */
Rol.hasMany(Usuario, { foreignKey: 'rol_id', as: 'usuarios' });
Usuario.belongsTo(Rol, { foreignKey: 'rol_id', as: 'rol' });

/* POTRERO -> GANADO */
Potrero.hasMany(Ganado, { foreignKey: 'potrero_id', as: 'ganado' });
Ganado.belongsTo(Potrero, { foreignKey: 'potrero_id', as: 'potrero' });

/* GANADO autoreferencias madre/padre */
Ganado.belongsTo(Ganado, { as: 'madre', foreignKey: 'madre_id' });
Ganado.belongsTo(Ganado, { as: 'padre', foreignKey: 'padre_id' });

/* PRODUCTO -> MOVIMIENTOS */
Producto.hasMany(MovimientoProducto, { foreignKey: 'producto_id', as: 'movimientos' });
MovimientoProducto.belongsTo(Producto, { foreignKey: 'producto_id', as: 'producto' });

/* PRODUCCION (FK ganado_id, ON DELETE SET NULL) */
Ganado.hasMany(Produccion, { foreignKey: 'ganado_id', as: 'producciones' });
Produccion.belongsTo(Ganado, { foreignKey: 'ganado_id', as: 'ganado' });

/* ALIMENTACION (FK ganado_id y producto_id) */
Ganado.hasMany(Alimentacion, { foreignKey: 'ganado_id', as: 'alimentaciones' });
Alimentacion.belongsTo(Ganado, { foreignKey: 'ganado_id', as: 'ganado' });

Producto.hasMany(Alimentacion, { foreignKey: 'producto_id', as: 'alimentaciones' });
Alimentacion.belongsTo(Producto, { foreignKey: 'producto_id', as: 'producto' });

/* EVENTO SANITARIO (FK ganado_id, usuario_id, producto_id) */
Ganado.hasMany(EventoSanitario, { foreignKey: 'ganado_id', as: 'eventos_sanitarios' });
EventoSanitario.belongsTo(Ganado, { foreignKey: 'ganado_id', as: 'ganado' });

Usuario.hasMany(EventoSanitario, { foreignKey: 'usuario_id', as: 'eventos_sanitarios' });
EventoSanitario.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

Producto.hasMany(EventoSanitario, { foreignKey: 'producto_id', as: 'eventos_sanitarios' });
EventoSanitario.belongsTo(Producto, { foreignKey: 'producto_id', as: 'producto' });

/* REPRODUCCION (FK vaca_id y toro_id) */
Ganado.hasMany(Reproduccion, { foreignKey: 'vaca_id', as: 'reproducciones' });
Reproduccion.belongsTo(Ganado, { foreignKey: 'vaca_id', as: 'vaca' });

Ganado.hasMany(Reproduccion, { foreignKey: 'toro_id', as: 'servicios_como_toro' });
Reproduccion.belongsTo(Ganado, { foreignKey: 'toro_id', as: 'toro' });

/* VENTA -> DETALLES */
Venta.hasMany(DetalleVentaGanado, { foreignKey: 'venta_id', as: 'detalle_ganado', onDelete: 'CASCADE' });
DetalleVentaGanado.belongsTo(Venta, { foreignKey: 'venta_id', as: 'venta' });

Ganado.hasMany(DetalleVentaGanado, { foreignKey: 'ganado_id', as: 'detalles_venta' });
DetalleVentaGanado.belongsTo(Ganado, { foreignKey: 'ganado_id', as: 'ganado' });

Venta.hasMany(DetalleVentaProducto, { foreignKey: 'venta_id', as: 'detalle_productos', onDelete: 'CASCADE' });
DetalleVentaProducto.belongsTo(Venta, { foreignKey: 'venta_id', as: 'venta' });

Producto.hasMany(DetalleVentaProducto, { foreignKey: 'producto_id', as: 'detalles_venta' });
DetalleVentaProducto.belongsTo(Producto, { foreignKey: 'producto_id', as: 'producto' });

Produccion.hasMany(DetalleVentaProducto, { foreignKey: 'produccion_id', as: 'detalles_venta_produccion' });
DetalleVentaProducto.belongsTo(Produccion, { foreignKey: 'produccion_id', as: 'produccion' });

module.exports = {
  sequelize,
  Finca, Rol, Usuario, Potrero, Ganado,
  Producto, MovimientoProducto,
  Venta, DetalleVentaGanado, DetalleVentaProducto,
  Produccion, Alimentacion, EventoSanitario, Reproduccion
};