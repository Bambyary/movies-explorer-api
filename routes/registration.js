const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { validateRegistration } = require('../utils/validation');

router.post('/signup', validateRegistration, createUser);

module.exports = router;
