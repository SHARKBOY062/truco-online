export function playTrucoEffects() {
  const mesa = document.querySelector("#mesa-area");
  if (!mesa) return;

  mesa.classList.add("shake", "truco-flash");

  const audio = new Audio("/sounds/truco.mp3");
  audio.volume = 0.9;
  audio.play();

  setTimeout(() => {
    mesa.classList.remove("shake", "truco-flash");
  }, 700);
}
