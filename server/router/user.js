const express = require('express');
const userController = require('../controller/user');
const router = express.Router();

router.get('/get-captcha', userController.getCaptcha);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', (req, res) => {
    res.cookie.token = null;
    req.cookies.token = null
    console.log(res.cookie.token);
    res.json({
        code: 200,
        msg: '退出成功'
    })
});
module.exports = router;