const express = require('express');
const userController = require('../controller/user');
const router = express.Router();
const authToken = require('../utils/verify');

router.get('/get-all-user', authToken, userController.getAllUser);
router.get('/get-captcha', userController.getCaptcha);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/is-admin', userController.isAdmin);
module.exports = router;