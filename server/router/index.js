const express = require('express');
const router = express.Router();
const authToken = require('../utils/verify');


router.use('/user', require('./user'));
router.use('/article', require('./article'));
router.use('/category', require('./category'));
router.use('/friend', require('./friend'));
router.use('/comment', require('./comment'));
router.use('/image', require('./image'));
router.use('/settings', require('./settings'));
router.get('/refreshCaptcha', require('../utils/svgCode'));
router.get('/test', authToken, (req, res) => {
    res.json({
        code: 200,
        msg: 'success',
        data: req.cookies
    })
});

module.exports = router;