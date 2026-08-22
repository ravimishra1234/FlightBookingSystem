const express = require('express');
const router = express.Router();
const { chatWithBot, quickFlightSearch } = require('../controllers/chatbotController');

router.post('/message', chatWithBot);
router.get('/quick-search', quickFlightSearch);

module.exports = router;
