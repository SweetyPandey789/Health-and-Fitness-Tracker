// server/controllers/planControllers.js
const FitnessPlan = require('../models/FitnessPlan');

const generateSuggestions = (goal, level, workoutDays) => {
  const suggestions = [];

  suggestions.push(`Workout ${workoutDays} days per week for ${goal}.`);

  if (goal === 'weight loss') {
    suggestions.push('Focus on cardio and calorie deficit.');
  } else if (goal === 'muscle gain') {
    suggestions.push('Prioritize strength training and protein intake.');
  } else if (goal === 'stay fit') {
    suggestions.push('Maintain a mix of cardio and resistance training.');
  }

  if (level === 'beginner') {
    suggestions.push('Start slow with bodyweight exercises and walking.');
  } else if (level === 'intermediate') {
    suggestions.push('Add moderate weights and interval training.');
  } else {
    suggestions.push('Incorporate HIIT, heavy lifting, and advanced routines.');
  }

  suggestions.push('Stay hydrated, sleep 7–8 hours, and eat clean.');

  return suggestions;
};

exports.createPlan = async (req, res) => {
  const { userId, goal, level, workoutDays } = req.body;
  const suggestions = generateSuggestions(goal, level, workoutDays);
  const plan = new FitnessPlan({ userId, goal, level, workoutDays, suggestions });
  await plan.save();
  res.json(plan);
};
exports.getPlan = async (req, res) => {
  const { userId } = req.params;
  const plan = await FitnessPlan.findOne({ userId });
  if (!plan) return res.status(404).json({ error: 'Plan not found' });
  res.json(plan);
};