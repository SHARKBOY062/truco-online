// src/pages/GameRoom/mesa/CardsOnTable.jsx
import MesaCard from "./MesaCard";

/**
 * Cartas da mesa em formato de U
 * - 3 no topo (em pé)
 * - 3 na esquerda (deitadas)
 * - 3 na direita (deitadas)
 */
export default function CardsOnTable({
  topCards,
  leftCards,
  rightCards,
}) {
  const top =
    topCards ?? [1, 2, 3].map(() => ({ rank: "A", suit: "♠" }));
  const left =
    leftCards ?? [1, 2, 3].map(() => ({ rank: "A", suit: "♠" }));
  const right =
    rightCards ?? [1, 2, 3].map(() => ({ rank: "A", suit: "♠" }));

  const topPositions = [
    { x: 42, y: 30 },
    { x: 50, y: 30 },
    { x: 58, y: 30 },
  ];

  const leftPositions = [
    { x: 33, y: 42 },
    { x: 33, y: 56 },
    { x: 33, y: 70 },
  ];

  const rightPositions = [
    { x: 67, y: 42 },
    { x: 67, y: 56 },
    { x: 67, y: 70 },
  ];

  return (
    <div className="relative w-full h-full">
      {/* TOPO */}
      {top.map((card, i) => {
        const p = topPositions[i] ?? topPositions[topPositions.length - 1];
        return (
          <MesaCard
            key={`top-${i}`}
            rank={card.rank}
            suit={card.suit}
            faceDown
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* ESQUERDA */}
      {left.map((card, i) => {
        const p =
          leftPositions[i] ?? leftPositions[leftPositions.length - 1];
        return (
          <div
            key={`left-${i}`}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="origin-center -rotate-90">
              <MesaCard rank={card.rank} suit={card.suit} faceDown />
            </div>
          </div>
        );
      })}

      {/* DIREITA */}
      {right.map((card, i) => {
        const p =
          rightPositions[i] ?? rightPositions[rightPositions.length - 1];
        return (
          <div
            key={`right-${i}`}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="origin-center rotate-90">
              <MesaCard rank={card.rank} suit={card.suit} faceDown />
            </div>
          </div>
        );
      })}
    </div>
  );
}
