import axios from 'axios';
import { API_BASE_URL } from './baseUrl';

const http = axios.create({
  baseURL: API_BASE_URL.JOBS_API,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: '*/*',
    'Content-Type': 'application/json',
    'x-auth-token': null,
  },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default http;
