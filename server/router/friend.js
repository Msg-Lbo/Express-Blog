const express = require('express');
const router = express.Router();
const authToken = require('../utils/verify');
const friendsController = require('../controller/friend');


router.post('/apply-friends', friendsController.applyFriend);
router.post('/allow-friends', authToken, friendsController.allowFriend);
router.post('/refuse-friend', authToken, friendsController.refuseFriend);
router.post('/update-friend', authToken, friendsController.updateFriend);
router.get('/get-friends-by-status', authToken, friendsController.getFriendByStatus);
router.get('/get-friends', friendsController.getAllowFriends);
module.exports = router;