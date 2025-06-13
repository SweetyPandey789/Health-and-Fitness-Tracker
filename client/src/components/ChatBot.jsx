import React, { useState } from 'react';
import {
  IconButton,
  Paper,
  Box,
  TextField,
  Typography
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Hi! I’m FitBot 🤖. Ask me anything about workouts, BMI, yoga, weight loss, nutrition, sleep, hydration, motivation, and more!'
    }
  ]);

const handleSend = async () => {
  if (!input.trim()) return;

  const userMsg = { from: 'user', text: input };
  setMessages((prev) => [...prev, userMsg]);

  try {
    const res = await fetch('http://localhost:5000/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { from: 'bot', text: data.response }]);
  } catch (err) {
    console.error(err);
    setMessages((prev) => [...prev, { from: 'bot', text: "⚠️ Sorry, something went wrong. Please try again later." }]);
  }

  setInput('');
};


  return (
    <>
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#FFD700',
          color: 'black',
          zIndex: 1300,
          '&:hover': { backgroundColor: '#e6c200' }
        }}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </IconButton>

      {open && (
        <Paper
          elevation={6}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            width: 320,
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            zIndex: 1299
          }}
        >
          <Typography variant="h6" gutterBottom>💬 FitBot</Typography>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 1 }}>
            {messages.map((msg, index) => (
              <Typography
                key={index}
                align={msg.from === 'user' ? 'right' : 'left'}
                sx={{ mb: 1 }}
              >
                <strong>{msg.from === 'user' ? 'You' : 'FitBot'}:</strong> {msg.text}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: 'flex' }}>
            <TextField
              size="small"
              placeholder="Ask about fitness..."
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <IconButton color="primary" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}
