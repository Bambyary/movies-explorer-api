const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { limiter } = require('./utils/rateLimiter');
const { errorHeandler } = require('./middlewares/errorHeandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const { PORT, MONGO_DB } = require('./models/config');

const app = express();

mongoose.connect(MONGO_DB)
  .then(() => {
    console.log('База данных подключена');
  })
  .catch(() => {
    console.log('База данных не подключена');
  });

app.use(helmet());
app.use(limiter);
app.use(cors({
  origin: [
    'http://sorokina-diplom.nomoredomainsicu.ru',
    'https://sorokina-diplom.nomoredomainsicu.ru',
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001'],
}));
app.use(express.json());
app.use(requestLogger);
app.use('/', routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHeandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
