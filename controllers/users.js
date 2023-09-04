const { CastError, DocumentNotFoundError, ValidationError } = require('mongoose').Error;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');
const { JWT_SECRET_DEV } = require('../models/config');

const { JWT_SECRET, NODE_ENV } = process.env;

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then(() => res.send({ name, email }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new Conflict('Пользователь с таким email уже существует.'));
      }

      if (err instanceof ValidationError) {
        return next(new BadRequest('Переданы некорректные данные при создании пользователя.'));
      }

      return next(err);
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'prodaction' ? JWT_SECRET : JWT_SECRET_DEV);
      return res.send({ token });
    })
    .catch((err) => next(err));
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof CastError) {
        return next(new BadRequest('Передача некорректных данных при поиске пользователя'));
      }

      if (err instanceof DocumentNotFoundError) {
        return next(new NotFound('Пользователь в базе данных не найден.'));
      }

      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
      }

      if (err.code === 11000) {
        return next(new Conflict('Пользователь с таким email уже существует.'));
      }

      if (err instanceof DocumentNotFoundError) {
        return next(new NotFound('Пользователь с указанным _id не найден.'));
      }

      return next(err);
    });
};

module.exports = {
  getUserInfo,
  updateUser,
  createUser,
  loginUser,
};
