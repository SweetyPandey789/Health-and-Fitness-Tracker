import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, FormControl, InputLabel,
  Select, MenuItem, Paper, Divider
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function BMRCalculator() {
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [bmr, setBmr] = useState(null);
  const [history, setHistory] = useState([]);

  const calculateBMR = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (!w || !h || !a) return;

    let result = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const calculatedBMR = result.toFixed(2);
    setBmr(calculatedBMR);

    const entry = {
      date: new Date().toLocaleString(),
      height: h,
      weight: w,
      age: a,
      gender,
      bmr: +calculatedBMR
    };

    setHistory(prev => [entry, ...prev]);
  };

  const getBmrSuggestion = (bmr) => {
    const value = parseFloat(bmr);
    if (value < 1200) {
      return "⚠️ Your BMR is quite low. Eat nutrient-rich foods and consult a professional.";
    } else if (value < 1500) {
      return "🔎 BMR is slightly low. Consider balanced meals and light activity.";
    } else if (value < 1800) {
      return "✅ Normal BMR. Maintain a healthy lifestyle.";
    } else if (value < 2100) {
      return "🚀 BMR is above average. Active individuals may require more calories.";
    } else {
      return "🔥 High BMR. Ensure your energy intake matches your needs.";
    }
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, p: 3 }}>
      {/* Left - Form */}
      <Paper sx={{ p: 4, flex: 1, minWidth: '300px', borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>🔥 BMR Calculator</Typography>
        <Box sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Weight (kg)" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
          <TextField label="Height (cm)" type="number" value={height} onChange={e => setHeight(e.target.value)} />
          <TextField label="Age (years)" type="number" value={age} onChange={e => setAge(e.target.value)} />

          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select value={gender} label="Gender" onChange={e => setGender(e.target.value)}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" onClick={calculateBMR}>Calculate BMR</Button>

          {bmr && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="h6">Your BMR is: <strong>{bmr} kcal/day</strong></Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {getBmrSuggestion(bmr)}
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Right - History */}
      <Paper sx={{ p: 3, flex: 1, minWidth: '300px', borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>📊 BMR History</Typography>
        {history.length === 0 ? (
          <Typography>No records yet.</Typography>
        ) : (
          history.map((item, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: 'gray' }}>{item.date}</Typography>
              <Typography variant="body1">
                Height: {item.height} cm | Weight: {item.weight} kg | Age: {item.age} | Gender: {item.gender}
              </Typography>
              <Typography sx={{ fontWeight: 'bold', color: 'green' }}>
                BMR: {item.bmr} kcal/day
              </Typography>
              <Divider sx={{ mt: 1 }} />
            </Box>
          ))
        )}
      </Paper>

      {/* Bottom - Chart */}
      <Box sx={{ width: '100%', mt: 4 }}>
        <Typography variant="h6" gutterBottom>📈 BMR Progress Chart</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history.slice().reverse()}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="bmr" stroke="#1976d2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
