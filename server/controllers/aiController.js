// server/controllers/aiController.js

// Local rule-based responses only
const fallbackResponse = (message) => {
  const q = message.toLowerCase();

  if (q.includes("bmi")) return "BMI = weight (kg) / height² (m²). A healthy range is 18.5 – 24.9.";
  if (q.includes("gain weight") || q.includes("muscle")) return "To gain healthy weight, eat more protein and calories, and do strength training.";
  if (q.includes("lose weight") || q.includes("weight loss")) return "To lose weight, eat fewer calories than you burn, do cardio, and stay consistent.";
  if (q.includes("hydration") || q.includes("drink water")) return "Drink 2–3 liters daily. More if you’re active or it’s hot.";
  if (q.includes("workout") || q.includes("exercise")) return "Mix cardio, strength, and flexibility exercises for a balanced routine.";
  if (q.includes("protein")) return "Good protein sources include eggs, chicken, tofu, lentils, and nuts.";
  if (q.includes("nutrition") || q.includes("food")) return "Eat a balanced diet: lean protein, whole grains, fruits, and vegetables.";
  if (q.includes("sleep")) return "Aim for 7–9 hours of quality sleep to recover and stay healthy.";
  if (q.includes("routine") || q.includes("schedule")) return "Example: Morning walk, afternoon strength training, evening yoga.";
  if (q.includes("motivation")) return "“Fitness is not about being better than someone else. It’s about being better than you used to be.” 💪";
  if (q.includes("yoga")) return "Yoga improves flexibility, strength, and mental focus. Start with basic poses like Sukhasana.";

  return "I'm here to help with your fitness questions! Try asking about BMI, workouts, nutrition, or hydration.";
};

exports.generateFitnessResponse = async (req, res) => {
  try {
    const { message } = req.body;
    const response = fallbackResponse(message);
    res.status(200).json({ response });
  } catch (error) {
    console.error('Chatbot Error:', error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
