import React from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Avatar,
  IconButton,
  Tooltip,
  Paper
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { registerUser, uploadImage } from '../api/authApi';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  profileImage: z.any().optional(),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [preview, setPreview] = React.useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const watchedImage = watch('profileImage');
  React.useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const file = watchedImage[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [watchedImage]);

  const registerMutation = useMutation({
    mutationFn: async (data) => {
      let profileImageUrl = null;
      if (data.profileImage?.length > 0) {
        const formData = new FormData();
        formData.append('image', data.profileImage[0]);
        const uploadResult = await uploadImage(formData);
        profileImageUrl = uploadResult.imageUrl;
      }
      const { profileImage, ...userData } = data;
      return registerUser({ ...userData, profileImageUrl });
    },
    onSuccess: (data) => {
      login(data);
      toast.success('Registration successful!');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Registration failed');
    }
  });

  const onSubmit = (data) => registerMutation.mutate(data);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0d1117, #161b22)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            backgroundColor: '#161b22',
            color: '#e6edf3',
            borderRadius: 3,
            px: 4,
            py: 5,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" fontWeight="bold" gutterBottom color="#e6edf3">
              Create Your Account
            </Typography>
            <Typography variant="body2" color="#8b949e">
              Sign up to start using the platform
            </Typography>

            {registerMutation.isError && (
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                {registerMutation.error?.response?.data?.message || 'Something went wrong'}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 4, width: '100%' }}
            >
              {/* Profile Avatar */}
              <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                <Avatar
                  src={preview}
                  alt="Profile"
                  sx={{ width: 96, height: 96, mb: 1 }}
                />
                <Tooltip title="Upload Profile Image">
                  <IconButton component="label" color="primary" size="large">
                    <PhotoCamera />
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      {...register('profileImage')}
                    />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Full Name */}
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                InputLabelProps={{ style: { color: '#8b949e' } }}
                InputProps={{
                  style: {
                    color: '#e6edf3',
                    backgroundColor: '#21262d',
                  },
                }}
                FormHelperTextProps={{ style: { color: '#f85149' } }}
              />

              {/* Email */}
              <TextField
                fullWidth
                label="Email Address"
                margin="normal"
                autoComplete="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputLabelProps={{ style: { color: '#8b949e' } }}
                InputProps={{
                  style: {
                    color: '#e6edf3',
                    backgroundColor: '#21262d',
                  },
                }}
                FormHelperTextProps={{ style: { color: '#f85149' } }}
              />

              {/* Password */}
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                autoComplete="new-password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputLabelProps={{ style: { color: '#8b949e' } }}
                InputProps={{
                  style: {
                    color: '#e6edf3',
                    backgroundColor: '#21262d',
                  },
                }}
                FormHelperTextProps={{ style: { color: '#f85149' } }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
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
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Register'}
              </Button>

              {/* Login Link */}
              <Typography variant="body2" align="center" mt={3} color="#8b949e">
                Already have an account?{' '}
                <RouterLink to="/login" style={{ color: '#58a6ff', textDecoration: 'none', fontWeight: 500 }}>
                  Login here
                </RouterLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
