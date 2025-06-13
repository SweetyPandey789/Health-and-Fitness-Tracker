//server\index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes'); // ✅ Gemini AI chatbot route
const planRoutes = require('./routes/planRoutes');
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes); // ✅ Access via POST /api/chatbot
app.use('/api/plans', planRoutes);
app.use('/api/appointments', require('./routes/appointmentRoutes'));
// Database connection and server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });
