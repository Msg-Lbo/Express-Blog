const express = require('express');
const router = express.Router();
const authToken = require('../utils/verify');
const categoryController = require('../controller/category');

router.post('/create-category', authToken, categoryController.createCategory);
router.get('/get-all-category', categoryController.getAllCategory);
router.post('/delete-category-by-id', authToken, categoryController.deleteCategoryById);
router.post('/update-category-by-id', authToken, categoryController.updateCategoryById);
router.get('/get-article-by-category', categoryController.getArticleByCategoryId);

module.exports = router;