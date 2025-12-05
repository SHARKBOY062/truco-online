import { useEffect, useState } from "react";

export default function PlayedCardPhysics({ card, trigger }) {
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    if (trigger) {
      setDrop(false);
      setTimeout(() => setDrop(true), 20);
    }
  }, [trigger]);

  return (
    <div
      className={`
        absolute left-1/2 top-1/2
        ${drop ? "animate-card-drop" : ""}
        card-3d
        w-20 h-28 bg-white rounded-xl shadow-xl
        flex items-center justify-center text-black text-2xl font-bold
        -translate-x-1/2 -translate-y-1/2
      `}
    >
      {card}
    </div>
  );
}
