import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMySessions } from '../api/sessionApi';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Box,
  Button,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SessionCard from '../components/session/SessionCard';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: sessions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['mySessions'],
    queryFn: getMySessions,
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0e0e10',
        color: '#f3f4f6',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: 'start', sm: 'center' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
          mb={5}
        >
          <Box mb={{ xs: 2, sm: 0 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: '#facc15' }}
            >
              Welcome back, {user?.name || 'User'}!
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#9ca3af' }}>
           "Your Practice Sessions"


            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => navigate('/create-session')}
            sx={{
              backgroundColor: '#facc15',
              color: '#0e0e10',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': { backgroundColor: '#eab308' },
            }}
          >
            Create New Session
          </Button>
        </Box>

        {isLoading && (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress sx={{ color: '#facc15' }} />
          </Box>
        )}

        {isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error.message}
          </Alert>
        )}

        {sessions && sessions.length === 0 && (
          <Box textAlign="center" mt={10}>
            <motion.img
              src="/empty-state.svg" // Add a suitable illustration to your public folder
              alt="No sessions"
              style={{ width: '240px', marginBottom: '20px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            />
            <Typography
              variant="h6"
              sx={{ color: '#9ca3af', fontStyle: 'italic' }}
            >
              No sessions found. Create your first one to get started!
            </Typography>
          </Box>
        )}

        {sessions && sessions.length > 0 && (
          <Grid container spacing={4}>
            {sessions.map((session, index) => (
              <Grid item xs={12} sm={6} md={4} key={session._id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SessionCard session={session} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default DashboardPage;
