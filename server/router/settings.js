const express = require('express');
const router = express.Router();
const authToken = require('../utils/verify');
const settingsController = require('../controller/settings');

router.post('/save-settings', authToken, settingsController.saveSettings);
router.get('/get-settings', settingsController.getSettings);

module.exports = router;