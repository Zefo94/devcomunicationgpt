const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/status', auth, userController.updateStatus);
router.put('/auto-response', auth, userController.updateAutoResponseMessage);
router.get('/me', auth, userController.getUserProfile);

module.exports = router;
