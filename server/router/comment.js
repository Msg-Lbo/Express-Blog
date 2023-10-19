const express = require('express');
const router = express.Router();
const authToken = require('../utils/verify');
const commentController = require('../controller/comment');

router.post('/send-comment', commentController.sendComment);
router.get('/get-comment-list', commentController.getCommentList);
router.get('/get-all-comment', authToken, commentController.getAllComment);
router.post('/delete-comment', authToken, commentController.deleteCommentById);
module.exports = router;