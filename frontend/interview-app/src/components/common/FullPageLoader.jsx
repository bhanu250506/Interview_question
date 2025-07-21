import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const FullPageLoader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: '#0f0f0f', // Matte black background
      zIndex: 9999,
    }}
  >
    <CircularProgress
      thickness={5}
      size={60}
      sx={{
        color: '#facc15', // Gold spinner
      }}
    />
  </Box>
);

export default FullPageLoader;
