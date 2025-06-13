import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer,
  List, ListItem, ListItemText, ListItemButton, Menu, MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  let user = null;
  try {
    const stored = localStorage.getItem('user');
    user = stored ? JSON.parse(stored) : null;
  } catch (error) {
    user = null;
  }

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Dashboard', path: '/dashboard' },
    ...(token ? [] : [{ text: 'Register', path: '/register' }]) // Removed 'Login'
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#D4AF37' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: '#4B0082', fontWeight: 'bold' }}
          >
            🧘‍♂️ FitnessTracker
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                component={Link}
                to={item.path}
                sx={{
                  color: '#4B0082',
                  textTransform: 'none',
                  mx: 1
                }}
              >
                {item.text}
              </Button>
            ))}

            {token && (
              <>
                <IconButton onClick={handleMenu} sx={{ color: '#4B0082' }}>
                  <AccountCircle fontSize="large" />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem disabled>👋 Hello, {user?.name || 'User'}</MenuItem>
                  <MenuItem onClick={() => navigate('/dashboard')}>Dashboard</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>

          {/* Mobile Drawer Button */}
          <IconButton
            edge="end"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#4B0082' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            {token && (
              <>
                <ListItem>
                  <ListItemText
                    primary={`👋 Hello, ${user?.name || 'User'}`}
                    primaryTypographyProps={{ sx: { color: '#4B0082', fontWeight: 'bold' } }}
                  />
                </ListItem>

                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
