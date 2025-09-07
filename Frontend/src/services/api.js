import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5015',
});

// 🌿 Plant-related APIs
export const fetchPlants = (filters) =>
  api.get('/api/plants', { params: filters });

export const fetchPlantDetails = (id) => api.get(`/api/plants/${id}`);

// 🔐 User Authentication APIs
export const registerUser = (userData) => api.post('/auth/register', userData);

export const loginUser = (userData) => api.post('/auth/login', userData);

export const logoutUser = () => {
  localStorage.removeItem('token');
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  return api.get('/auth/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const updateProfile = async (profileData) => {
  const token = localStorage.getItem('token');
  return api.put('/api/users/me', profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteOwnAccount = async () => {
  const token = localStorage.getItem('token');
  return api.delete('/api/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 🤖 Chatbot OLLAMA
export const sendChatMessage = async (prompt) => {
  const response = await fetch('/api/ollama/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to get response from server');
  }

  const data = await response.json();
  return { reply: data.response };
};
