import axios from 'axios';

const API = axios.create({
  baseURL: 'https://health-and-fitness-tracker-3km9.onrender.com',
});

// Add token to every request if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
