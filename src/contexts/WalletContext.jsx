import { createContext, useEffect, useState, useRef } from 'react';
import { getBalance } from '../api/wallet';

export const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(0);
  const loadedOnce = useRef(false); // evita chamadas duplicadas no StrictMode

  async function loadBalance() {
    try {
      const backendBalance = await getBalance(); // já retorna o saldo correto
      setBalance(backendBalance);
    } catch (err) {
      console.warn('⚠ Backend indisponível — usando fallback 0');
      setBalance(0);
    }
  }

  useEffect(() => {
    if (!loadedOnce.current) {
      loadedOnce.current = true;
      loadBalance();
    }
  }, []);

  return (
    <WalletContext.Provider value={{ balance, setBalance, loadBalance }}>
      {children}
    </WalletContext.Provider>
  );
}
