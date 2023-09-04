const mongoose = require('mongoose');
const {
  regExpEngString, regExpRuString, regExpForImgLinks, regExpForVideoLinks,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator(url) {
        return regExpForImgLinks.test(url);
      },
      message: 'Передана некорректная ссылка',
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator(url) {
        return regExpForVideoLinks.test(url);
      },
      message: 'Передана некорректная ссылка',
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator(url) {
        return regExpForImgLinks.test(url);
      },
      message: 'Передана некорректная ссылка',
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    required: true,
    type: String,
    validate: {
      validator(string) {
        return regExpRuString.test(string);
      },
      message: 'Введено некорректное название.',
    },
  },
  nameEN: {
    required: true,
    type: String,
    validate: {
      validator(string) {
        return regExpEngString.test(string);
      },
      message: 'Введено некорректное название.',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
