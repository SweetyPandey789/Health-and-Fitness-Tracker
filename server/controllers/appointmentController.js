// server/controllers/appointmentControllers.js
const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
  const { userId, doctorName, issue, date, time } = req.body;

  const newAppointment = new Appointment({ userId, doctorName, issue, date, time });
  await newAppointment.save();

  res.status(201).json({ message: 'Appointment booked', appointment: newAppointment });
};

exports.getAppointments = async (req, res) => {
  const { userId } = req.params;
  const appointments = await Appointment.find({ userId }).sort({ date: 1, time: 1 });
  res.json(appointments);
};
