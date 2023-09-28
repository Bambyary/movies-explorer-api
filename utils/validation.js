const { celebrate, Joi } = require('celebrate');
const {
  regExpRuString, regExpEngString, regExpForImgLinks, regExpForVideoLinks, regExpForPassword,
} = require('./constants');

const validateUserPatch = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateMoviePost = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(regExpForImgLinks).required(),
    trailerLink: Joi.string().pattern(regExpForVideoLinks).required(),
    thumbnail: Joi.string().pattern(regExpForImgLinks).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().pattern(regExpRuString).required(),
    nameEN: Joi.string().pattern(regExpEngString).required(),
  }),
});

const validateMovieDelete = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

const validateRegistration = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(regExpForPassword),
  }),
});

const validateAuthorization = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(regExpForPassword),
  }),
});

module.exports = {
  validateUserPatch,
  validateMoviePost,
  validateMovieDelete,
  validateRegistration,
  validateAuthorization,
};
