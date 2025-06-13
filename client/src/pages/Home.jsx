import React from 'react';
import { Container, Typography, Button, Box, Link, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChatBot from '../components/ChatBot';
import Footer from '../components/Footer'; 
export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  return (
    <>
      {/* Main Section with Background Image */}
      <Box
        sx={{
          backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          py: 10,
          color: 'white',
        }}
      >
        <Container sx={{ textAlign: 'center' }}>
          {/* Motivational Image */}
          <Box
            component="img"
            src="/yoga1.jpg"
            alt="Yoga Pose"
            sx={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              mb: 2,
              boxShadow: 3,
            }}
          />

          {/* Motivational Thought */}
          <Typography variant="h6" paragraph sx={{ color: '#f0f0f0' }}>
            "A healthy outside starts from the inside. Take care of your body; it's the only place you have to live."
          </Typography>

          {/* Welcome Section */}
          <Typography variant="h3" gutterBottom sx={{ color: '#4B0082' }}>
            Welcome to Fitness Tracker
          </Typography>
          <Typography variant="h6" paragraph sx={{ color: '#333' }}>
            Track workouts, log meals, calculate BMI and manage appointments in one place.
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate(token ? '/dashboard' : '/login')}
          >
            {token ? 'Go to Dashboard' : 'Get Started'}
          </Button>
        </Container>
      </Box>

    

      <Footer/>

      {/* Floating ChatBot */}
      <ChatBot />
    </>
  );
}
