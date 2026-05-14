require('dotenv').config();

const app = require('./app');
const { sequelize } = require('./database/sequelize');

const PORT = Number(process.env.PORT || 3000);

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

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 API corriendo en puerto ${PORT}`);
  console.log(`✅ Health: /health`);

  try {
    await sequelize.authenticate();
    console.log('✅ DB conectada correctamente');
  } catch (err) {
    console.error('⚠️ La API inició, pero la DB falló:', err.message);
  }
});