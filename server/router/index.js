const express = require('express');
const router = express.Router();
const authToken = require('../utils/verify');


router.use('/user', require('./user'));
router.get('/test', authToken, (req, res) => {
    res.json({
        code: 200,
        msg: 'success',
        data: req.cookies
    })
});

module.exports = router;