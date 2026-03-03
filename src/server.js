require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./database/sequelize');

const PORT = Number(process.env.PORT || 3000);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB conectada (Sequelize)');

    app.listen(PORT, () => console.log(`🚀 API en http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Error iniciando:', err);
    process.exit(1);
  }
})();