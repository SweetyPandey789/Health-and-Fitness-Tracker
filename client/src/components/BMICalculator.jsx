// src/pages/BMICalculator.jsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  List,
  ListItem,
  Divider
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [bmiHistory, setBmiHistory] = useState([]);

  const calculateBMI = () => {
    if (!height || !weight) return;

    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    const roundedBmi = bmiValue.toFixed(2);

    let resultCategory = '';
    if (bmiValue < 18.5) resultCategory = 'Underweight';
    else if (bmiValue < 24.9) resultCategory = 'Normal weight';
    else if (bmiValue < 29.9) resultCategory = 'Overweight';
    else resultCategory = 'Obese';

    setBmi(roundedBmi);
    setCategory(resultCategory);

    const entry = {
      height,
      weight,
      bmi: parseFloat(roundedBmi),
      category: resultCategory,
      timestamp: new Date().toLocaleString()
    };
    setBmiHistory([entry, ...bmiHistory]);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f5f5f5',
        py: 5,
        px: 2
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
            {/* Left Panel: BMI Calculator */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                BMI Calculator
              </Typography>

              <TextField
                label="Height (cm)"
                type="number"
                fullWidth
                margin="normal"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <TextField
                label="Weight (kg)"
                type="number"
                fullWidth
                margin="normal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={calculateBMI}
                sx={{ mt: 2 }}
              >
                Calculate BMI
              </Button>

              {bmi && (
                <Box mt={3} textAlign="center">
                  <Typography variant="h6">Your BMI: {bmi}</Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', color: '#4B0082' }}
                  >
                    {category}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Right Panel: BMI History */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" gutterBottom>
                📈 BMI History
              </Typography>
              {bmiHistory.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  No history yet.
                </Typography>
              ) : (
                <List>
                  {bmiHistory.map((entry, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {entry.timestamp}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Height:</strong> {entry.height} cm |{' '}
                            <strong>Weight:</strong> {entry.weight} kg
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 'bold',
                              color:
                                entry.category === 'Normal weight'
                                  ? 'green'
                                  : entry.category === 'Overweight'
                                  ? 'orange'
                                  : entry.category === 'Obese'
                                  ? 'red'
                                  : 'blue'
                            }}
                          >
                            BMI: {entry.bmi} ({entry.category})
                          </Typography>
                        </Box>
                      </ListItem>
                      {index < bmiHistory.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Box>
          </Box>

          {/* Chart Section */}
          {bmiHistory.length > 0 && (
            <Box mt={6}>
              <Typography variant="h5" gutterBottom textAlign="center">
                📊 BMI Progress Chart
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[...bmiHistory].reverse()} // So earliest is first
                  margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" hide />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="bmi"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
