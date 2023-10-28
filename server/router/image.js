const express = require('express');
const router = express.Router();
const authToken = require('../utils/verify');
const imageController = require('../controller/image');

router.post('/upload-image', authToken, imageController.uploadImage);
router.post('/delete-image', authToken, imageController.deleteImage);
router.get('/get-image-list', authToken, imageController.getImageList);
module.exports = router;