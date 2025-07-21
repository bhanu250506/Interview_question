import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Enable dark mode
    primary: {
      main: '#F5C518', // Yellow (IMDb-style)
      contrastText: '#000000', // Black text on yellow
    },
    secondary: {
      main: '#212121', // Rich dark gray
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1E1E1E', // Darker card color
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    error: {
      main: '#ff5252', // Subtle red for destructive actions
    },
    warning: {
      main: '#ffc107',
    },
    success: {
      main: '#4caf50',
    },
    info: {
      main: '#29b6f6',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 500 },
    h3: { fontWeight: 500 },
    h4: { fontWeight: 500 },
    h5: { fontWeight: 500 },
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          backgroundColor: '#1E1E1E',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          color: '#F5C518',
        },
      },
    },
  },
});

export default theme;
