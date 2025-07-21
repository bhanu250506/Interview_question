import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Container,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  useTheme,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import SchoolIcon from '@mui/icons-material/School'; // Changed icon to better fit the theme
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const theme = useTheme();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
    queryClient.clear(); // Clear react-query cache on logout
    navigate('/login');
  };

  return (
    // Use theme colors for consistency
    <AppBar
      position="static"
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
      elevation={0} // A flat header looks more modern
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* App Logo and Title */}
          <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to={isAuthenticated ? '/dashboard' : '/'}
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'text.primary',
              fontWeight: 'bold',
            }}
          >
            PrepAI
          </Typography>

          {/* Conditional Rendering based on Auth State */}
          {isAuthenticated ? (
            // --- AUTHENTICATED USER VIEW ---
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                component={RouterLink}
                to="/dashboard"
                sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'flex' } }} // Hide on extra-small screens
              >
                Dashboard
              </Button>
              <Button
                component={RouterLink}
                to="/new-practice" // Updated link text
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ bgcolor: 'primary.main', color: '#000', '&:hover': { bgcolor: 'primary.dark' } }}
              >
                New Practice
              </Button>

              {/* User Avatar and Dropdown Menu */}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                  <Avatar
                    alt={user?.name || 'User'}
                    src={user?.profileImageUrl}
                    sx={{ border: '2px solid', borderColor: 'primary.main' }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/dashboard'); }}>
                  <DashboardIcon sx={{ mr: 1 }} />
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} />
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            // --- GUEST VIEW ---
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                component={RouterLink}
                to="/login"
                sx={{ color: 'text.secondary' }}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                sx={{ bgcolor: 'primary.main', color: '#000', '&:hover': { bgcolor: 'primary.dark' } }}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;