const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const inventarioAIRoutes = require("./routes/inventarioAI.routes");

const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const { swaggerSpec } = require('./config/swagger');

const app = express();

app.set('trust proxy', 1);

app.use(cors());

app.use("/api/inventario", inventarioAIRoutes);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    service: 'ganacontrol-api',
    message: 'Backend GanaControl activo',
    env: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    ok: true,
    service: 'ganacontrol-api',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/ventas', require('./routes/cockpit.routes'));

app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

app.use(errorHandler);

module.exports = app;