import React from 'react';
import { Box, Typography } from '@mui/material';
import BMRCalculator from '../components/BMRCalculator';

export default function BMRPage() {
  return (
    <Box sx={{ minHeight: '100vh', p: 4, background: '#e0f2f1' }}>
      
      <BMRCalculator />
    </Box>
  );
}