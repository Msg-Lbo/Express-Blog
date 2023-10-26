const express = require('express');
const router = express.Router();
const authToken = require('../utils/verify');
const imageController = require('../controller/image');

router.post('/upload-image', authToken, imageController.uploadImage);

module.exports = router;