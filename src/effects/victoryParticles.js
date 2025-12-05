import { gsap } from "gsap";

export function victoryParticles(container) {
  for (let i = 0; i < 20; i++) {
    const spark = document.createElement("div");
    spark.className = "absolute w-2 h-2 bg-yellow-400 rounded-full";
    container.appendChild(spark);

    gsap.fromTo(
      spark,
      { x: 0, y: 0, opacity: 1 },
      {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        duration: 0.8,
        onComplete: () => spark.remove()
      }
    );
  }
}
