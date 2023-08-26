const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const authRouter = require('./authorization');
const regRouter = require('./registration');
const { auth } = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');

router.use('/', regRouter);
router.use('/', authRouter);
router.use('/', auth, userRouter);
router.use('/', auth, movieRouter);
router.use('*', (_req, _res, next) => next(new NotFound('Страница не найдена')));

module.exports = router;
