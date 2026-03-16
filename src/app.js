const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const { swaggerSpec } = require('./config/swagger');

const app = express();

app.set('trust proxy', 1);

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

// ✅ Raíz (para que NO salga Cannot GET /)
app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    service: 'ganacontrol-api',
    message: 'Backend GanaControl activo',
    env: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// ✅ Health (rápido)
app.get('/health', (req, res) => {
  res.status(200).json({
    ok: true,
    service: 'ganacontrol-api',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', routes);

// ✅ 404 en JSON (antes del errorHandler)
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// ✅ Manejador de errores
app.use(errorHandler);

module.exports = app;
