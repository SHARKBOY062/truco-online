import api from '../services/axios';

export function login(data) {
  return api.post('/auth/login', data);
}

export function register(data) {
  return api.post('/auth/register', data);
}

export function forgotPassword(data) {
  return api.post('/auth/forgot-password', data);
}

export function resetPassword(data) {
  return api.post('/auth/reset-password', data);
}

export function getMe() {
  return api.get('/me');
}
