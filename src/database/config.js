require("dotenv").config();

const commonConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS || process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  dialect: "mysql",
  logging: false,
  timezone: "-05:00",
  dialectOptions: {
    dateStrings: true,
    multipleStatements: true,
    ssl:
      process.env.DB_SSL === "true"
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : undefined,
  },
};

module.exports = {
  development: commonConfig,
  production: commonConfig,
};