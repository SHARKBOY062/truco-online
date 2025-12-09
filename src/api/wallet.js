// src/services/wallet.js
import { api } from '../services/api';

// Saldo atual
export function getBalance() {
  return api.get('/user').then((res) => ({
    balance: res.data.user.balance ?? 0,
    user: res.data.user,
  }));
}

// Extrato financeiro
export function getTransactions() {
  return api.get('/extract').then((res) => res.data);
}

// Criar depósito (a rota PRECISA existir no backend)
export function createDeposit(data) {
  return api.post('/deposit', data);
}

// Criar saque (a rota PRECISA existir no backend)
export function createWithdraw(data) {
  return api.post('/withdraw', data);
}
