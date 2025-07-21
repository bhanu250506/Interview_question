import apiClient from './apiClient';

export const registerUser = async (userData) => {
  const { data } = await apiClient.post('/auth/register', userData);
  return data;
};

export const loginUser = async (credentials) => {
  const { data } = await apiClient.post('/auth/login', credentials);
  return data;
};

export const getUserProfile = async () => {
  const { data } = await apiClient.get('/auth/profile');
  return data;
};

export const uploadImage = async (formData) => {
    const { data } = await apiClient.post('/auth/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
}