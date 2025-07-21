import apiClient from './apiClient';

export const createSession = async (sessionData) => {
  const { data } = await apiClient.post('/session/create', sessionData);
  return data;
};

export const getMySessions = async () => {
  const { data } = await apiClient.get('/session/my-sessions');
  return data.sessions;
};

export const getSessionById = async (sessionId) => {
  const { data } = await apiClient.get(`/session/${sessionId}`);
  return data.session;
};

export const deleteSession = async (sessionId) => {
  const { data } = await apiClient.delete(`/session/${sessionId}`);
  return data;
};

export const togglePinQuestion = async (questionId) => {
  const { data } = await apiClient.post(`/questions/${questionId}/pin`);
  return data;
};

export const updateQuestionNote = async ({ questionId, note }) => {
  const { data } = await apiClient.post(`/questions/${questionId}/note`, { note });
  return data;
};