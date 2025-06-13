//server\models\Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  doctorName: { type: String, default: "General Physician" },
  issue: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'pending' } // or 'confirmed', 'cancelled'
});

module.exports = mongoose.model('Appointment', appointmentSchema);
