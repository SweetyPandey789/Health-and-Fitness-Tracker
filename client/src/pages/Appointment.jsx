import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, TextField, Button, Typography, List, Paper, Divider,
  MenuItem, Select, FormControl, InputLabel
} from '@mui/material';

const Appointment = () => {
  const userId = 'user123'; // 🔁 Replace with real auth ID
  const [issue, setIssue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointments, setAppointments] = useState([]);

  const issueOptions = ['Fever', 'Fracture', 'Cold', 'Cough', 'Diabetes'];
  const doctorOptions = [
    'Dr. Rakesh Sharma (Physician)',
    'Dr. Meena Kumari (Orthopedic)',
    'Dr. Anil Verma (ENT)',
    'Dr. Namita Agarwal (Endocrinologist)',
    'Dr. S. Roy (General Physician)'
  ];

  const handleBook = async () => {
    if (!issue || !doctorName || !date || !time) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/appointments', {
        userId,
        doctorName,
        issue,
        date,
        time
      });
      setAppointments(prev => [...prev, res.data.appointment]);
    } catch (err) {
      console.error('Booking failed:', err.message);
      alert('Failed to book appointment.');
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get(`http://localhost:5000/api/appointments/${userId}`);
      setAppointments(res.data);
    };
    fetchAppointments();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Book Doctor Appointment</Typography>

      {/* Select Health Issue */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Health Issue</InputLabel>
        <Select value={issue} label="Health Issue" onChange={e => setIssue(e.target.value)}>
          {issueOptions.map((opt, idx) => (
            <MenuItem key={idx} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Select Doctor */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Doctor</InputLabel>
        <Select value={doctorName} label="Select Doctor" onChange={e => setDoctorName(e.target.value)}>
          {doctorOptions.map((doc, idx) => (
            <MenuItem key={idx} value={doc}>{doc}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Date & Time Inputs */}
      <TextField fullWidth type="date" value={date} onChange={e => setDate(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth type="time" value={time} onChange={e => setTime(e.target.value)} sx={{ mb: 2 }} />

      <Button variant="contained" onClick={handleBook}>Book Appointment</Button>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Your Appointments</Typography>

      <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {appointments.map((a, i) => (
          <Paper key={i} elevation={3} sx={{ p: 2, borderLeft: '6px solid #1976d2' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {a.date} at {a.time}
            </Typography>
            <Typography variant="body1">Issue: {a.issue}</Typography>
            <Typography variant="body2" color="text.secondary">
              Doctor: {a.doctorName || 'Assigned Later'}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="caption" color="green">
              Status: {a.status || 'Pending'}
            </Typography>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default Appointment;
