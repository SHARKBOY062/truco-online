export default function Achievements({ show }) {
  if (!show) return null;

  return (
    <div className="fixed right-4 bottom-4 z-[9999] bg-[#111820] border border-green-500 shadow-xl p-4 rounded-xl w-64 animate-fade-in">
      <h3 className="font-bold text-green-400 mb-2">🏆 Nova Conquista!</h3>
      <p className="text-gray-300 text-sm">Você criou sua primeira mesa apostada!</p>
    </div>
  );
}
