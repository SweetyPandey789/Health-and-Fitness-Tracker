// server\routes\aiRoutes.js
const express = require('express');
const router = express.Router();
const { generateFitnessResponse } = require('../controllers/aiController');

router.post('/chat', generateFitnessResponse); // POST /api/ai/chat

module.exports = router;
