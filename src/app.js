const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ ok: true, service: 'ganacontrol-api' }));

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;