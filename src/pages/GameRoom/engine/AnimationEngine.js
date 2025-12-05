export const playShake = () => {
  const el = document.getElementById("mesa-truco");
  if (!el) return;

  el.classList.add("shake");
  setTimeout(() => el.classList.remove("shake"), 600);
};

export const playTrucoSound = () => {
  const audio = new Audio("/audio/truco.mp3");
  audio.volume = 0.7;
  audio.play();
};

export const flyCard = (from, to, onFinish) => {
  const card = document.createElement("div");
  card.className =
    "fixed w-20 h-30 bg-white rounded-xl shadow-xl z-[9999] flex items-center justify-center text-3xl font-bold";
  card.style.left = from.x + "px";
  card.style.top = from.y + "px";
  card.innerHTML = "?";

  document.body.appendChild(card);

  card.animate(
    [
      { transform: "translate(0,0)" },
      { transform: `translate(${to.x - from.x}px, ${to.y - from.y}px)` },
    ],
    {
      duration: 500,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    }
  ).onfinish = () => {
    card.remove();
    onFinish && onFinish();
  };
};
