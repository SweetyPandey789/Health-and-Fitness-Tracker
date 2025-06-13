// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Grid, Link, Divider } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#FFD700', color: '#4B0082', pt: 4, pb: 2 }}>
      <Grid container spacing={4} justifyContent="center" px={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            <FitnessCenterIcon sx={{ mr: 1, verticalAlign: 'middle', color: '#4B0082' }} />
            FitnessTracker
          </Typography>
          <Typography variant="body2">
            Your personal health companion. Stay active, eat healthy, and track your journey with ease.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Resources
          </Typography>
          <Link href="https://www.headspace.com/" target="_blank" underline="hover" color="#4B0082">
            Headspace
          </Link><br />
          <Link href="https://www.calm.com/" target="_blank" underline="hover" color="#4B0082">
            Calm App
          </Link><br />
          <Link href="https://www.youtube.com/results?search_query=workout+for+beginners" target="_blank" underline="hover" color="#4B0082">
            Workout Videos
          </Link>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Contact Us
          </Typography>
          <Typography variant="body2">📧 rajputtanu24.08@gmail.com</Typography>
          <Typography variant="body2">📍 Hazaribagh , Jharkhand</Typography>
        </Grid>
      </Grid>

     <Divider sx={{ my: 3, backgroundColor: 'rgba(212, 175, 55, 0.4)' }} />

      <Typography align="center" variant="body2" sx={{ opacity: 0.9 }}>
        © {new Date().getFullYear()} <strong>FitnessTracker</strong>. All rights reserved.
      </Typography>
    </Box>
  );
}
