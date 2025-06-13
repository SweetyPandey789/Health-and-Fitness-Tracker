import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab
} from '@mui/material';
import { motion } from 'framer-motion';

const mantras = [
  "ॐ शान्तिः शान्तिः शान्तिः",
  "I am calm and centered.",
  "My mind is at peace.",
  "With every breath, I release stress.",
  "I inhale strength and exhale fear.",
  "I am rooted in the present moment.",
  "Peace begins with me.",
  "Every breath brings me closer to stillness.",
  "I let go of tension and embrace peace.",
  "My energy is aligned with the universe."
];

const meditationTips = [
  "Find a quiet space free from distractions.",
  "Sit comfortably with a straight spine.",
  "Focus on your breath and let thoughts pass without judgment.",
  "Start with 5 minutes and slowly increase duration.",
  "Use soft instrumental music or guided sessions if needed.",
  "Meditate at the same time each day to build a habit.",
  "Close your eyes and scan your body for tension.",
  "Don’t judge your meditation — just practice regularly.",
  "Use a mantra or affirmation to stay centered.",
  "Gratitude meditation boosts mental peace."
];

export default function MantrasPage() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(135deg, #e0f7fa, #fce4ec)',
        py: 6,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Paper sx={{ width: '100%', maxWidth: 700, mb: 4 }} elevation={3}>
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Mantras" />
          <Tab label="Meditation Tips" />
        </Tabs>
      </Paper>

      <motion.div
        key={tabIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 700 }}
      >
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          {tabIndex === 0 ? (
            <>
              <Typography variant="h4" align="center" color="secondary" gutterBottom>
                Meditation & Yoga Mantras
              </Typography>
              <Typography variant="body1" align="center" mb={3}>
                Breathe deeply, focus inward, and recite these affirmations to center yourself.
              </Typography>
              <List>
                {mantras.map((text, index) => (
                  <ListItem key={index} sx={{ mb: 1 }}>
                    <ListItemText primary={`🧘 ${text}`} />
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <>
              <Typography variant="h4" align="center" color="success.main" gutterBottom>
                Meditation Tips for Beginners
              </Typography>
              <Typography variant="body1" align="center" mb={3}>
                Start your mindfulness journey with small, consistent steps.
              </Typography>
              <List>
                {meditationTips.map((tip, index) => (
                  <ListItem key={index} sx={{ mb: 1 }}>
                    <ListItemText primary={`🌱 ${tip}`} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
}
