const express = require('express');
const router = express.Router();
const authToken = require('../utils/verify');
const settingsController = require('../controller/settings');

router.post('/save-settings', authToken, settingsController.saveSettings);
router.get('/get-settings', settingsController.getSettings);
router.get('/get-mail-settings', settingsController.getMailSettings)
router.post('/save-mail-settings', authToken, settingsController.saveMailSettings)

module.exports = router;