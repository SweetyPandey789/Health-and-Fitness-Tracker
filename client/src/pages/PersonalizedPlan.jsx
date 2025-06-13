import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, MenuItem,
  Button, Paper, List, ListItem, ListItemText, Grid
} from '@mui/material';

const goals = ['weight loss', 'muscle gain', 'stay fit'];
const levels = ['beginner', 'intermediate', 'advanced'];

export default function PersonalizedPlan() {
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('beginner');
  const [workoutDays, setWorkoutDays] = useState(3);
  const [plan, setPlan] = useState(null);

  const userId = 'demoUser123';

  const generatePlan = async () => {
    const res = await fetch('http://localhost:5000/api/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, goal, level, workoutDays })
    });
    const data = await res.json();
    setPlan(data);
  };

  useEffect(() => {
    const fetchPlan = async () => {
      const res = await fetch(`http://localhost:5000/api/plans/${userId}`);
      const data = await res.json();
      setPlan(data);
    };
    fetchPlan();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        🏋️ Personalized Fitness Plan
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Left: Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }} elevation={4}>
            <TextField
              label="Fitness Goal"
              select
              fullWidth
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              sx={{ my: 1 }}
            >
              {goals.map((g) => (
                <MenuItem key={g} value={g}>{g}</MenuItem>
              ))}
            </TextField>

            <TextField
              label="Fitness Level"
              select
              fullWidth
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              sx={{ my: 1 }}
            >
              {levels.map((lvl) => (
                <MenuItem key={lvl} value={lvl}>{lvl}</MenuItem>
              ))}
            </TextField>

            <TextField
              label="Workout Days/Week"
              type="number"
              fullWidth
              value={workoutDays}
              onChange={(e) => setWorkoutDays(Number(e.target.value))}
              sx={{ my: 1 }}
            />

            <Button variant="contained" fullWidth onClick={generatePlan} sx={{ mt: 2 }}>
              Generate Plan
            </Button>
          </Paper>
        </Grid>

        {/* Right: Your Plan */}
        <Grid item xs={12} md={6}>
          {plan && (
            <Paper sx={{ p: 3 }} elevation={3}>
              <Typography variant="h6" gutterBottom>
                Your Plan
              </Typography>
              <List>
                {plan.suggestions.map((sugg, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`✅ ${sugg}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
