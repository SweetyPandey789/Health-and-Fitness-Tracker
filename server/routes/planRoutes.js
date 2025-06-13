//server\routes\planRoutes.js
const express = require('express');
const router = express.Router();
const { createPlan, getPlan } = require('../controllers/planController');

router.post('/', createPlan);
router.get('/:userId', getPlan);

module.exports = router;