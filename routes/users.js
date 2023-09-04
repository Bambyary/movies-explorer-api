const router = require('express').Router();
const { getUserInfo, updateUser } = require('../controllers/users');
const { validateUserPatch } = require('../utils/validation');

router.get('/users/me', getUserInfo);
router.patch('/users/me', validateUserPatch, updateUser);

module.exports = router;
