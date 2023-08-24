const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const authRouter = require('./authorization');
const regRouter = require('./registration');
const { auth } = require('../middlewares/auth');

router.use('/', regRouter);
router.use('/', authRouter);
router.use('/', auth, userRouter);
router.use('/', auth, movieRouter);

module.exports = router;
