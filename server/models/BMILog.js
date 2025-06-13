
const mongoose = require('mongoose');

const BMILogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  height: Number, // in cm
  weight: Number, // in kg
  bmi: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BMILog', BMILogSchema);
