"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Google Auth
    await queryInterface.addColumn("usuario", "google_id", {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: true,
    });

    await queryInterface.addColumn("usuario", "proveedor_auth", {
      type: Sequelize.ENUM("local", "google"),
      allowNull: false,
      defaultValue: "local",
    });

    // Seguridad y verificación
    await queryInterface.addColumn("usuario", "email_verificado", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.addColumn("usuario", "foto_url", {
      type: Sequelize.STRING(500),
      allowNull: true,
    });

    await queryInterface.addColumn("usuario", "ultimo_login", {
      type: Sequelize.DATE,
      allowNull: true,
    });

    // Recuperación de contraseña
    await queryInterface.addColumn("usuario", "token_recuperacion_hash", {
      type: Sequelize.STRING(500),
      allowNull: true,
    });

    await queryInterface.addColumn("usuario", "token_recuperacion_expira", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("usuario", "token_recuperacion_expira");
    await queryInterface.removeColumn("usuario", "token_recuperacion_hash");
    await queryInterface.removeColumn("usuario", "ultimo_login");
    await queryInterface.removeColumn("usuario", "foto_url");
    await queryInterface.removeColumn("usuario", "email_verificado");
    await queryInterface.removeColumn("usuario", "proveedor_auth");
    await queryInterface.removeColumn("usuario", "google_id");

    // Limpieza ENUM MySQL
    await queryInterface.sequelize.query(`
      ALTER TABLE usuario 
      MODIFY proveedor_auth VARCHAR(50);
    `);
  },
};