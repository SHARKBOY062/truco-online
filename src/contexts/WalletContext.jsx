import { createContext, useEffect, useState, useRef } from 'react';
import { getBalance } from '../api/wallet';

export const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(0);
  const loadedOnce = useRef(false); // evita chamadas duplicadas

  async function loadBalance() {
    try {
      const { data } = await getBalance();
      setBalance(data.balance ?? 0);
    } catch (err) {
      console.warn('Backend indisponível, usando fallback');
      // NÃO LANÇAR ERRO — NÃO SETAR ESTADO EM LOOP
      setBalance(0); 
    }
  }

  useEffect(() => {
    // evita rodar mais de uma vez em modo Strict do React
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
