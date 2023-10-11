import http from './https';

export const loginService = (credentials) => http.post('/login', credentials);
