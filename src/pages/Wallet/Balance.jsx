import { useContext } from 'react';
import { WalletContext } from '../../contexts/WalletContext';
import PageTitle from '../../components/PageTitle';

export default function Balance() {
  const { balance } = useContext(WalletContext);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <PageTitle>Meu Saldo</PageTitle>

      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 text-center">
        <p className="text-gray-400">Saldo Disponível</p>
        <p className="text-4xl font-bold mt-2 text-green-400">
          R$ {balance?.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
