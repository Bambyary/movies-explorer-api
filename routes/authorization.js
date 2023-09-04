const router = require('express').Router();
const { loginUser } = require('../controllers/users');
const { validateAuthorization } = require('../utils/validation');

router.post('/signin', validateAuthorization, loginUser);

module.exports = router;
