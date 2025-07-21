import apiClient from './apiClient';

export const generateQuestions = async (params) => {
  const { data } = await apiClient.post('/ai/generate-questions', params);
  return data;
};

export const getConceptExplanation = async (question) => {
  const { data } = await apiClient.post('/ai/generate-explanation', { question });
  return data;
};