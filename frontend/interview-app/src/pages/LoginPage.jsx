import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Avatar,
  CircularProgress,
  Grid,
  Link,
  Paper,
} from '@mui/material';
import { EmailOutlined, LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Minimum 6 characters'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data);
      toast.success('Login successful!');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Login failed');
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0d1117, #161b22)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 3,
          px: 4,
          py: 5,
          bgcolor: '#161b22',
          color: '#e6edf3',
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar sx={{ bgcolor: '#58a6ff', width: 70, height: 70, mx: 'auto' }}>
            <PsychologyIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight="bold" mt={2} color="#e6edf3">
            Welcome Back
          </Typography>
          <Typography variant="subtitle1" color="#8b949e">
            Sign in to continue
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputLabelProps={{ style: { color: '#8b949e' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined sx={{ color: '#58a6ff' }} />
                </InputAdornment>
              ),
              style: {
                color: '#e6edf3',
                backgroundColor: '#21262d',
              },
            }}
            FormHelperTextProps={{ style: { color: '#f85149' } }}
          />

          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputLabelProps={{ style: { color: '#8b949e' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined sx={{ color: '#58a6ff' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? (
                      <VisibilityOff sx={{ color: '#8b949e' }} />
                    ) : (
                      <Visibility sx={{ color: '#8b949e' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                color: '#e6edf3',
                backgroundColor: '#21262d',
              },
            }}
            FormHelperTextProps={{ style: { color: '#f85149' } }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              py: 1.4,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #238636, #2ea043)',
              '&:hover': {
                background: 'linear-gradient(to right, #196c2e, #238636)',
              },
            }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </Box>

        {/* Links */}
        <Grid container justifyContent="space-between" mt={3}>
          <Link
            component="button"
            variant="body2"
            sx={{
              color: '#8b949e',
              '&:hover': { textDecoration: 'underline', color: '#f0f6fc' },
            }}
          >
            Forgot password?
          </Link>

          <RouterLink to="/register" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" sx={{ color: '#58a6ff', fontWeight: 600 }}>
              Create Account
            </Typography>
          </RouterLink>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LoginPage;
