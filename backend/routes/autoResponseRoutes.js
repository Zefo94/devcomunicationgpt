// routes/autoResponseRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { setAutoResponse, getAutoResponse } = require('../controllers/autoResponseController');

router.post('/', auth, setAutoResponse);
router.get('/', auth, getAutoResponse);

module.exports = router;
