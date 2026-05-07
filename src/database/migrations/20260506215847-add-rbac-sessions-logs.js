"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("permiso", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      codigo: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      nombre: { type: Sequelize.STRING(120), allowNull: false },
      descripcion: { type: Sequelize.STRING(255), allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP") },
    });

    await queryInterface.createTable("rol_permiso", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      rol_id: {
        type: Sequelize.TINYINT,
        allowNull: false,
        references: { model: "rol", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      permiso_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "permiso", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP") },
    });

    await queryInterface.addConstraint("rol_permiso", {
      fields: ["rol_id", "permiso_id"],
      type: "unique",
      name: "unique_rol_permiso",
    });

    await queryInterface.createTable("sesion", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "usuario", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      refresh_token_hash: { type: Sequelize.STRING(255), allowNull: false },
      ip: { type: Sequelize.STRING(80), allowNull: true },
      user_agent: { type: Sequelize.TEXT, allowNull: true },
      dispositivo: { type: Sequelize.STRING(120), allowNull: true },
      ultimo_uso: { type: Sequelize.DATE, allowNull: true },
      expira_en: { type: Sequelize.DATE, allowNull: false },
      revocada: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP") },
    });

    await queryInterface.createTable("log_actividad", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "usuario", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      accion: { type: Sequelize.STRING(120), allowNull: false },
      modulo: { type: Sequelize.STRING(80), allowNull: true },
      descripcion: { type: Sequelize.TEXT, allowNull: true },
      ip: { type: Sequelize.STRING(80), allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP") },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("log_actividad");
    await queryInterface.dropTable("sesion");
    await queryInterface.dropTable("rol_permiso");
    await queryInterface.dropTable("permiso");
  },
};