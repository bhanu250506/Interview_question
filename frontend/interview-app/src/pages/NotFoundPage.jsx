import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage = () => (
  <Container maxWidth="md">
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        textAlign: 'center'
      }}
    >
      <Typography variant="h1" style={{ color: '#1976d2' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'gray', marginBottom: '2rem' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/">
        Back to Home
      </Button>
    </Box>
  </Container>
);

export default NotFoundPage;