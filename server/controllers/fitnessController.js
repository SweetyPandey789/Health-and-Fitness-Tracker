// server/controllers/fitnessController.js
const BMILog = require('../models/BMILog');
const Appointment = require('../models/Appointment');

// BMI Calculator and Logger
exports.calculateBMI = async (req, res) => {
  const { height, weight } = req.body;
  const bmi = +(weight / ((height / 100) ** 2)).toFixed(2);
  const log = await BMILog.create({ userId: req.user.id, height, weight, bmi });
  res.status(200).json({ bmi, log });
};



