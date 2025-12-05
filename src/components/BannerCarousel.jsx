import { useEffect, useState } from "react";

import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

const banners = [banner1, banner2, banner3];

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i) => setIndex(i);

  return (
    <div className="relative w-full mb-10">

      {/* CORREÇÃO FUNDAMENTAL: o banner agora tem altura fixa real */}
      <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl relative">

        {/* IMAGEM */}
        <img
          src={banners[index]}
          alt="Banner"
          className="w-full h-full object-cover rounded-xl transition-all duration-700 select-none pointer-events-none"
        />

        {/* INDICADORES – NÃO EXPANDEM MAIS O CONTAINER */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-20 pointer-events-auto">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`
                w-3 h-3 rounded-full transition
                ${i === index ? "bg-white scale-110" : "bg-white/40 hover:bg-white/60"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
