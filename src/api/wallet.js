import api from '../services/axios';

// Saldo atual
export function getBalance() {
  return api.get('/wallet/balance');
}

// Extrato
export function getTransactions(params = {}) {
  return api.get('/wallet/transactions', { params });
}

// Criar depósito PIX
export function createDeposit(data) {
  return api.post('/wallet/deposit', data);
}

// Criar saque
export function createWithdraw(data) {
  return api.post('/wallet/withdraw', data);
}
