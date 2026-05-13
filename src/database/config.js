require("dotenv").config();

const usarSSL = process.env.DB_SSL === "true";

const commonConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD || process.env.DB_PASS,
  database: process.env.DB_NAME,
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

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  define: {
    freezeTableName: true,
    timestamps: false,
  },
};

module.exports = {
  development: commonConfig,
  production: commonConfig,
};