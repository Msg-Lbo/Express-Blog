const express = require('express');
const router = express.Router();
const authToken = require('../utils/verify');
const articleController = require('../controller/article');

router.post('/save-article', authToken, articleController.saveArticle);
router.get('/get-all-article', articleController.getArticleList);
router.post('/delete-article-by-id', authToken, articleController.deleteArticleById);
router.get('/get-article-by-id', articleController.getArticleById);
router.get('/search-article', articleController.searchArticle);
router.get('/get-article-detail', articleController.getArticleDetail);
module.exports = router;