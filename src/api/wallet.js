// src/services/wallet.js
import api from '../services/api';

// Saldo atual
export function getBalance() {
  return api.get('/user').then((res) => res.data.user.balance);
}

// Extrato
export function getTransactions() {
  return api.get('/extract').then((res) => res.data);
}

// Criar depósito (AINDA NÃO EXISTE NO BACKEND)
export function createDeposit(data) {
  // precisa existir no backend
  return api.post('/deposit', data);
}

// Criar saque (AINDA NÃO EXISTE NO BACKEND)
export function createWithdraw(data) {
  // precisa existir no backend
  return api.post('/withdraw', data);
}
