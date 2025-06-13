//server\models\FitnessPlan.js
const mongoose = require('mongoose');
const fitnessPlanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  goal: String,
  level: String,
  workoutDays: Number,
  suggestions: [String]
});

module.exports = mongoose.model('FitnessPlan', fitnessPlanSchema);