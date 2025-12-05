import api from '../services/axios';

export function getTables(stake) {
  return api.get('/tables', { params: { stake } });
}

export function createTable(stake) {
  return api.post('/tables', { stake });
}

export function joinTable(id) {
  return api.post(`/tables/${id}/join`);
}
