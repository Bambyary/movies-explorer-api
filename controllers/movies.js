const { CastError, ValidationError } = require('mongoose').Error;
const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail()
    .then((movie) => res.send(movie))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const userId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: userId,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new BadRequest('Переданы некорректные данные при создании фильма.'));
      }

      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params._id;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new BadRequest('Фильм с указанным _id не найден.'));
      }

      if (!String(movie.owner) === req.user._id) {
        return next(new Forbidden('Вы не можете удалить чужой фильм.'));
      }

      return Movie.deleteOne(movie)
        .then(() => res.send(movie));
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return next(new BadRequest('Фильм с указанным _id не найден.'));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
