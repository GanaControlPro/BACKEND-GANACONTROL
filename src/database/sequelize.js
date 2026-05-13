const { Sequelize } = require("sequelize");
require("dotenv").config();

const usarSSL = process.env.DB_SSL === "true";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: false,
    timezone: "-05:00",
    dialectOptions: {
      dateStrings: true,
      multipleStatements: true,
      ...(usarSSL
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {}),
    },
  }
);

module.exports = { sequelize };