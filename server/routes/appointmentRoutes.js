//server\routes\appointmentRoutes.js
const express = require('express');
const router = express.Router();
const { bookAppointment, getAppointments } = require('../controllers/appointmentController');

router.post('/', bookAppointment);
router.get('/:userId', getAppointments);

module.exports = router;
