const express = require('express');
const router = express.Router();
const authToken = require('../utils/verify');
const friendsController = require('../controller/friend');


router.post('/apply-friend', friendsController.applyFriend);
router.post('/allow-friend', authToken, friendsController.allowFriend);
router.post('/refuse-friend', authToken, friendsController.refuseFriend);
router.post('/update-friend', authToken, friendsController.updateFriend);
router.get('/get-friends-by-status', authToken, friendsController.getFriendByStatus);
router.get('/get-friend', friendsController.getAllowFriends);
module.exports = router;