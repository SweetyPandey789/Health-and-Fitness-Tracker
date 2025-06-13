import { Link } from 'react-router-dom';
import {
  Box, Grid, Typography, Paper, Avatar, IconButton, Input
} from '@mui/material';
import { styled } from '@mui/system';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import CalculateIcon from '@mui/icons-material/Calculate';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import MotivationalQuote from "../components/MotivationalQuote"; 


// Styled Link
const CardLink = styled(Link)({
  textDecoration: 'none',
});
const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1.4rem',
  transition: '0.3s',
  borderRadius: 20,
  boxShadow: '0px 10px 20px rgba(0,0,0,0.2)',
  background: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)',
  color: '#004d40',
  '&:hover': {
    background: 'linear-gradient(135deg, #b2dfdb, #80cbc4)',
    transform: 'scale(1.08)',
    color: '#00332f',
  },
}));

export default function Dashboard() {
  const [avatarImg, setAvatarImg] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarImg(URL.createObjectURL(file));
    }
  };

  const cards = [
    {
      label: 'Mantras & Meditation',
      path: '/mantras',
      icon: <SelfImprovementIcon sx={{ fontSize: 40 }} />,
    },
    {
      label: 'BMI Calculator',
      path: '/bmi',
      icon: <CalculateIcon sx={{ fontSize: 40 }} />,
    },
    {
      label: 'Personalized Plan',
      path: '/personalized-plan',
      icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />,
    },
    {
      label: 'Doctor Appointment',
      path: '/appointment',
      icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
    },
    {
  label: "BMR Calculator",
  path: "/bmr",
  icon: <CalculateIcon sx={{ fontSize: 40 }} />,
  },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#b2dfdb', py: 6, px: 4 }}>
      {/* Top Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Avatar with upload option */}
          <Box sx={{ position: 'relative' }}>
            <Avatar
              alt="User"
              src={avatarImg}
              sx={{ width: 60, height: 60, cursor: 'pointer' }}
            />
            <Input
              type="file"
              onChange={handleAvatarChange}
              inputProps={{ accept: 'image/*' }}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '60px',
                height: '60px',
                opacity: 0,
                cursor: 'pointer',
              }}
            />
          </Box>

          <Box>
            <Typography variant="h5" fontWeight="bold" color="#004d40">
              Welcome, Sweety 👋
            </Typography>
             <MotivationalQuote />
          </Box>
        </Box>
       
      </Box>

      {/* Dashboard Cards */}
      <Grid container spacing={4} justifyContent="center">
        {cards.map(({ label, path, icon }, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardLink to={path}>
              <DashboardCard>
                {icon}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {label}
                </Typography>
              </DashboardCard>
            </CardLink>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}


