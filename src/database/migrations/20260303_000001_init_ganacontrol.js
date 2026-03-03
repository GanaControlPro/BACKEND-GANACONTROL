'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // =========================
    // TABLAS
    // =========================
    await queryInterface.createTable('finca', {
      id: { type: Sequelize.TINYINT, autoIncrement: true, primaryKey: true },
      nombre: { type: Sequelize.STRING(150), allowNull: false },
      municipio: { type: Sequelize.STRING(100), allowNull: true },
      departamento: { type: Sequelize.STRING(100), allowNull: true },
      propietario: { type: Sequelize.STRING(150), allowNull: true },
      prefijo_factura: { type: Sequelize.STRING(10), allowNull: false, defaultValue: 'FV' },
      consecutivo_factura: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 }
    });

    await queryInterface.createTable('rol', {
      id: { type: Sequelize.TINYINT, autoIncrement: true, primaryKey: true },
      nombre: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      descripcion: { type: Sequelize.STRING(200), allowNull: false }
    });

    await queryInterface.createTable('usuario', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      finca_id: {
        type: Sequelize.TINYINT,
        allowNull: false,
        references: { model: 'finca', key: 'id' },
        onDelete: 'CASCADE'
      },
      rol_id: {
        type: Sequelize.TINYINT,
        allowNull: false,
        references: { model: 'rol', key: 'id' }
      },
      nombres: { type: Sequelize.STRING(100), allowNull: false },
      apellidos: { type: Sequelize.STRING(100), allowNull: true },
      correo: { type: Sequelize.STRING(150), allowNull: true, unique: true },
      contrasena: { type: Sequelize.STRING(255), allowNull: false },
      activo: { type: Sequelize.BOOLEAN, defaultValue: true },
      creado_en: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    await queryInterface.createTable('potrero', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      finca_id: {
        type: Sequelize.TINYINT,
        allowNull: false,
        references: { model: 'finca', key: 'id' },
        onDelete: 'CASCADE'
      },
      nombre: { type: Sequelize.STRING(100), allowNull: false },
      hectareas: { type: Sequelize.DECIMAL(6, 2), allowNull: true },
      tipo_pasto: { type: Sequelize.STRING(100), allowNull: true },
      capacidad_animales: { type: Sequelize.INTEGER, allowNull: true },
      estado: {
        type: Sequelize.ENUM('Disponible', 'Ocupado', 'Mantenimiento', 'Descanso'),
        defaultValue: 'Disponible'
      }
    });

    await queryInterface.createTable('ganado', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      finca_id: {
        type: Sequelize.TINYINT,
        allowNull: false,
        references: { model: 'finca', key: 'id' },
        onDelete: 'CASCADE'
      },
      codigo: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      nombre: { type: Sequelize.STRING(100), allowNull: true },
      sexo: { type: Sequelize.ENUM('Macho', 'Hembra'), allowNull: false },
      categoria: { type: Sequelize.ENUM('Ternero', 'Novillo', 'Vaca', 'Toro', 'Otro'), allowNull: false },
      raza: { type: Sequelize.STRING(100), allowNull: true },
      fecha_nacimiento: { type: Sequelize.DATEONLY, allowNull: true },
      peso_actual: { type: Sequelize.DECIMAL(6, 2), allowNull: true },
      estado_general: { type: Sequelize.ENUM('Activo', 'Inactivo'), defaultValue: 'Activo' },
      estado_biologico: { type: Sequelize.ENUM('Vivo', 'Muerto'), defaultValue: 'Vivo' },
      estado_comercial: { type: Sequelize.ENUM('Disponible', 'Vendido', 'Descartado'), defaultValue: 'Disponible' },
      potrero_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'potrero', key: 'id' },
        onDelete: 'SET NULL'
      },
      madre_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'ganado', key: 'id' },
        onDelete: 'SET NULL'
      },
      padre_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'ganado', key: 'id' },
        onDelete: 'SET NULL'
      },
      observaciones: { type: Sequelize.TEXT, allowNull: true },
      creado_en: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    await queryInterface.createTable('produccion', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      ganado_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'ganado', key: 'id' },
        onDelete: 'SET NULL'
      },
      tipo: { type: Sequelize.ENUM('Leche', 'Carne'), allowNull: false },
      fecha: { type: Sequelize.DATEONLY, allowNull: false },
      cantidad: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      unidad: { type: Sequelize.STRING(20), allowNull: false },
      disponible: { type: Sequelize.BOOLEAN, defaultValue: true }
    });

    await queryInterface.createTable('producto', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      finca_id: {
        type: Sequelize.TINYINT,
        allowNull: false,
        references: { model: 'finca', key: 'id' },
        onDelete: 'CASCADE'
      },
      tipo: {
        type: Sequelize.ENUM('Alimento', 'Medicamento', 'Insumo', 'Herramienta', 'Equipo', 'Otro'),
        allowNull: false
      },
      nombre: { type: Sequelize.STRING(150), allowNull: false },
      categoria: { type: Sequelize.STRING(100), allowNull: true },
      unidad: { type: Sequelize.STRING(30), allowNull: true },
      cantidad_actual: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      cantidad_min: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0 },
      estado: { type: Sequelize.ENUM('Operativo', 'En_Reparacion', 'Dañado', 'Baja'), defaultValue: 'Operativo' },
      activo: { type: Sequelize.BOOLEAN, defaultValue: true }
    });

    await queryInterface.addConstraint('producto', {
      fields: ['nombre', 'finca_id'],
      type: 'unique',
      name: 'uq_producto_nombre_finca'
    });

    await queryInterface.createTable('movimiento_producto', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      producto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'producto', key: 'id' }
      },
      tipo: { type: Sequelize.ENUM('ENTRADA', 'SALIDA', 'AJUSTE'), allowNull: false },
      cantidad: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
      fecha: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    await queryInterface.createTable('alimentacion', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      ganado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ganado', key: 'id' }
      },
      producto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'producto', key: 'id' }
      },
      fecha: { type: Sequelize.DATEONLY, allowNull: false },
      cantidad: { type: Sequelize.DECIMAL(8, 2), allowNull: false },
      observacion: { type: Sequelize.STRING(200), allowNull: true }
    });

    await queryInterface.createTable('evento_sanitario', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      ganado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ganado', key: 'id' }
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'usuario', key: 'id' }
      },
      tipo: {
        type: Sequelize.ENUM('Vacunacion', 'Tratamiento', 'Cirugia', 'Diagnostico', 'Revision', 'Desparasitacion'),
        allowNull: false
      },
      producto_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'producto', key: 'id' }
      },
      descripcion: { type: Sequelize.TEXT, allowNull: true },
      dosis: { type: Sequelize.STRING(100), allowNull: true },
      via_administracion: { type: Sequelize.STRING(100), allowNull: true },
      fecha: { type: Sequelize.DATEONLY, allowNull: false },
      costo: { type: Sequelize.DECIMAL(10, 2), allowNull: true },
      proxima_fecha: { type: Sequelize.DATEONLY, allowNull: true }
    });

    await queryInterface.createTable('reproduccion', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      vaca_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'ganado', key: 'id' } },
      tipo_servicio: { type: Sequelize.ENUM('Monta_Natural', 'Inseminacion'), allowNull: false },
      toro_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'ganado', key: 'id' } },
      proveedor_genetico: { type: Sequelize.STRING(150), allowNull: true },
      fecha_servicio: { type: Sequelize.DATEONLY, allowNull: false },
      fecha_probable_parto: { type: Sequelize.DATEONLY, allowNull: true },
      fecha_parto: { type: Sequelize.DATEONLY, allowNull: true },
      estado: { type: Sequelize.ENUM('Pendiente', 'Gestante', 'Fallida', 'Parto', 'Aborto'), defaultValue: 'Pendiente' },
      cria_codigo: { type: Sequelize.STRING(50), allowNull: true }
    });

    await queryInterface.createTable('venta', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      finca_id: { type: Sequelize.TINYINT, allowNull: false, references: { model: 'finca', key: 'id' } },
      cliente: { type: Sequelize.STRING(150), allowNull: false },
      numero_factura: { type: Sequelize.STRING(30), allowNull: true, unique: true },
      fecha: { type: Sequelize.DATEONLY, allowNull: false },
      total: { type: Sequelize.DECIMAL(14, 2), defaultValue: 0 }
    });

    await queryInterface.createTable('detalle_venta_ganado', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      venta_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'venta', key: 'id' }, onDelete: 'CASCADE' },
      ganado_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'ganado', key: 'id' } },
      precio: { type: Sequelize.DECIMAL(12, 2), allowNull: false }
    });

    await queryInterface.addConstraint('detalle_venta_ganado', {
      fields: ['venta_id', 'ganado_id'],
      type: 'unique',
      name: 'uq_detalle_venta_ganado'
    });

    await queryInterface.createTable('detalle_venta_producto', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      venta_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'venta', key: 'id' }, onDelete: 'CASCADE' },
      producto_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'producto', key: 'id' } },
      produccion_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'produccion', key: 'id' } },
      cantidad: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
      precio_unitario: { type: Sequelize.DECIMAL(12, 2), allowNull: true },
      subtotal: { type: Sequelize.DECIMAL(14, 2), allowNull: true }
    });

    // =========================
    // TRIGGERS (separados)
    // =========================
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_numero_factura;`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_movimiento_producto;`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_fecha_parto;`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_crear_cria;`);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_numero_factura
      BEFORE INSERT ON venta
      FOR EACH ROW
      BEGIN
        DECLARE pref VARCHAR(10);
        DECLARE cons INT;

        SELECT prefijo_factura, consecutivo_factura
        INTO pref, cons
        FROM finca
        WHERE id = NEW.finca_id;

        SET NEW.numero_factura =
          CONCAT(pref,'-',YEAR(CURDATE()),'-',LPAD(cons,5,'0'));

        UPDATE finca
        SET consecutivo_factura = consecutivo_factura + 1
        WHERE id = NEW.finca_id;
      END;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_movimiento_producto
      AFTER INSERT ON movimiento_producto
      FOR EACH ROW
      BEGIN
        IF NEW.tipo='ENTRADA' THEN
          UPDATE producto
          SET cantidad_actual = cantidad_actual + NEW.cantidad
          WHERE id = NEW.producto_id;
        ELSEIF NEW.tipo='SALIDA' THEN
          UPDATE producto
          SET cantidad_actual = GREATEST(0, cantidad_actual - NEW.cantidad)
          WHERE id = NEW.producto_id;
        END IF;
      END;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_fecha_parto
      BEFORE INSERT ON reproduccion
      FOR EACH ROW
      BEGIN
        SET NEW.fecha_probable_parto =
          DATE_ADD(NEW.fecha_servicio, INTERVAL 283 DAY);
      END;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trg_crear_cria
      AFTER UPDATE ON reproduccion
      FOR EACH ROW
      BEGIN
        IF NEW.estado='Parto'
          AND NEW.cria_codigo IS NOT NULL THEN

          INSERT INTO ganado (
            finca_id, codigo, sexo, categoria, fecha_nacimiento,
            madre_id, padre_id, peso_actual
          )
          SELECT finca_id,
                 NEW.cria_codigo,
                 'Hembra',
                 'Ternero',
                 NEW.fecha_parto,
                 NEW.vaca_id,
                 NEW.toro_id,
                 30
          FROM ganado
          WHERE id = NEW.vaca_id;
        END IF;
      END;
    `);

    // =========================
    // VISTAS (separadas)
    // =========================
    await queryInterface.sequelize.query(`DROP VIEW IF EXISTS v_stock_bajo;`);
    await queryInterface.sequelize.query(`DROP VIEW IF EXISTS v_ganado_activo;`);
    await queryInterface.sequelize.query(`DROP VIEW IF EXISTS v_ingresos_totales;`);

    await queryInterface.sequelize.query(`
      CREATE VIEW v_stock_bajo AS
      SELECT nombre, cantidad_actual, cantidad_min
      FROM producto
      WHERE cantidad_actual <= cantidad_min;
    `);

    await queryInterface.sequelize.query(`
      CREATE VIEW v_ganado_activo AS
      SELECT codigo, categoria, peso_actual
      FROM ganado
      WHERE estado_general = 'Activo';
    `);

    await queryInterface.sequelize.query(`
      CREATE VIEW v_ingresos_totales AS
      SELECT SUM(total) AS ingresos_totales
      FROM venta;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Vistas
    await queryInterface.sequelize.query(`DROP VIEW IF EXISTS v_stock_bajo;`);
    await queryInterface.sequelize.query(`DROP VIEW IF EXISTS v_ganado_activo;`);
    await queryInterface.sequelize.query(`DROP VIEW IF EXISTS v_ingresos_totales;`);

    // Triggers
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_crear_cria;`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_fecha_parto;`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_movimiento_producto;`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trg_numero_factura;`);

    // Tablas (orden inverso)
    await queryInterface.dropTable('detalle_venta_producto');
    await queryInterface.dropTable('detalle_venta_ganado');
    await queryInterface.dropTable('venta');
    await queryInterface.dropTable('reproduccion');
    await queryInterface.dropTable('evento_sanitario');
    await queryInterface.dropTable('alimentacion');
    await queryInterface.dropTable('movimiento_producto');
    await queryInterface.dropTable('producto');
    await queryInterface.dropTable('produccion');
    await queryInterface.dropTable('ganado');
    await queryInterface.dropTable('potrero');
    await queryInterface.dropTable('usuario');
    await queryInterface.dropTable('rol');
    await queryInterface.dropTable('finca');
  }
};