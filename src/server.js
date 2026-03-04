require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./database/sequelize');

const PORT = Number(process.env.PORT || 3000);

// =========================
// RUTAS BÁSICAS (salud + raíz)
// =========================
app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Backend GanaControl activo',
    env: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    return res.status(200).json({
      ok: true,
      db: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    return res.status(500).json({
      ok: false,
      db: 'disconnected',
      error: e.message
    });
  }
});

// =========================
// START
// =========================
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB conectada (Sequelize)');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 API en http://localhost:${PORT}`);
      console.log(`✅ Health: http://localhost:${PORT}/health`);
    });
  } catch (err) {
    console.error('❌ Error iniciando:', err);
    process.exit(1);
  }
})();