import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { styled, keyframes } from '@mui/system';

// Fitness-specific quotes
const fitnessQuotes = [
  {
    text: 'The pain you feel today will be the strength you feel tomorrow.',
    author: 'Arnold Schwarzenegger',
  },
  {
    text: 'Take care of your body. It’s the only place you have to live.',
    author: 'Jim Rohn',
  },
  {
    text: 'Fitness is not about being better than someone else. It’s about being better than you used to be.',
    author: 'Khloe Kardashian',
  },
  {
    text: 'Push yourself because no one else is going to do it for you.',
    author: 'Unknown',
  },
  {
    text: 'You don’t have to be extreme, just consistent.',
    author: 'Unknown',
  },
  {
    text: 'Motivation is what gets you started. Habit is what keeps you going.',
    author: 'Jim Ryun',
  },
  {
    text: 'Your body can stand almost anything. It’s your mind you have to convince.',
    author: 'Unknown',
  },
  {
    text: 'Train insane or remain the same.',
    author: 'Jillian Michaels',
  },
];

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled container
const QuoteBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  textAlign: 'center',
  borderRadius: 16,
  background: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)',
  animation: `${fadeIn} 1s ease-in-out`,
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
}));

export default function MotivationalQuote() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const getRandomQuote = () => {
      const index = Math.floor(Math.random() * fitnessQuotes.length);
      setQuote(fitnessQuotes[index]);
    };

    getRandomQuote(); // initial load
    const interval = setInterval(getRandomQuote, 15000); // refresh every 15 seconds
    return () => clearInterval(interval);
  }, []);

  if (!quote) return null;

  return (
    <Box display="flex" justifyContent="center">
      <QuoteBox elevation={3}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#004d40' }}>
          "{quote.text}"
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 1, color: '#00695c', fontStyle: 'italic' }}>
          — {quote.author}
        </Typography>
      </QuoteBox>
    </Box>
  );
}
