const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, loginUser } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { regExpForPassword } = require('../utils/constants');
const { auth } = require('../middlewares/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(regExpForPassword),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(regExpForPassword),
  }),
}), loginUser);
router.use('/', auth, userRouter);
router.use('/', auth, movieRouter);

module.exports = router;
