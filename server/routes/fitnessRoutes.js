const express = require('express');
const {
  calculateBMI,
  logWorkout,
  logDiet,
  createAppointment,
  getWorkouts
} = require('../controllers/fitnessController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/bmi', protect, calculateBMI);
router.post('/workout', protect, logWorkout);
router.post('/diet', protect, logDiet);
router.post('/appointment', protect, createAppointment);
router.get('/workouts', protect, getWorkouts); // after importing getWorkouts


module.exports = router;
