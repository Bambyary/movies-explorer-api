const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
require('dotenv').config();
const helmet = require('helmet');
const { limiter } = require('./utils/rateLimiter');
const { errorHeandler } = require('./middlewares/errorHeandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound = require('./errors/NotFound');
const routes = require('./routes/index');
const cors = require('./middlewares/cors');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => {
    console.log('База данных подключена');
  })
  .catch(() => {
    console.log('База данных не подключена');
  });

app.use(helmet());
app.use(limiter);
app.use(cors);
app.use(express.json());
app.use(requestLogger);
app.use('/', routes);
app.use('*', (_req, _res, next) => next(new NotFound('Страница не найдена')));
app.use(errorLogger);
app.use(errors());
app.use(errorHeandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
