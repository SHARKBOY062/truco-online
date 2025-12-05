export default function TrucoActions({
  value,
  onTruco,
  onRun,
  powerRequested,
  canIncrease
}) {
  return (
    <div className="flex gap-4 mt-4">
      
      {!powerRequested && (
        <button
          onClick={onTruco}
          className="px-4 py-2 bg-green-500 text-black rounded-xl font-bold"
        >
          Truco! ({value} → {value + 2})
        </button>
      )}

      {powerRequested && (
        <>
          <button
            onClick={() => canIncrease && onTruco()}
            className="px-4 py-2 bg-yellow-500 text-black rounded-xl font-bold"
          >
            Aumentar
          </button>

          <button
            onClick={onRun}
            className="px-4 py-2 bg-red-500 text-black rounded-xl font-bold"
          >
            Correr
          </button>
        </>
      )}

    </div>
  );
}
