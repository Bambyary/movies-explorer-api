const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const { errorHeandler } = require('./middlewares/errorHeandler');
const { createUser, loginUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound = require('./errors/NotFound');
const { regExpForPassword } = require('./utils/constants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false,
});

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
app.use(express.json());
app.use(requestLogger);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(regExpForPassword),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(regExpForPassword),
  }),
}), loginUser);
app.use(auth);
app.use('/', userRouter);
app.use('/', movieRouter);
app.use('*', (_req, _res, next) => next(new NotFound('Страница не найдена')));
app.use(errorLogger);
app.use(errors());
app.use(errorHeandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
