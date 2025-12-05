import { useEffect, useState } from "react";

import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

import bannerMobile1 from "../assets/bannermobile.png";
import bannerMobile2 from "../assets/bannermobile2.png";
import bannerMobile3 from "../assets/bannermobile3.png";

const banners = [
  { desktop: banner1, mobile: bannerMobile1 },
  { desktop: banner2, mobile: bannerMobile2 },
  { desktop: banner3, mobile: bannerMobile3 },
];

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);
  const total = banners.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const goTo = (i) => setIndex(i);

  return (
    <div className="relative w-full mb-6 sm:mb-8">
      <div
        className="
          relative w-full
          h-56 sm:h-72 md:h-80 lg:h-96
          overflow-hidden rounded-2xl
          shadow-[0_20px_60px_rgba(0,0,0,0.95)]
          bg-black
        "
      >
        {/* DESKTOP / TABLET */}
        <img
          src={banners[index].desktop}
          alt="Banner"
          className="
            hidden md:block
            w-full h-full object-cover rounded-2xl
            select-none pointer-events-none
          "
          draggable={false}
        />

        {/* MOBILE */}
        <img
          src={banners[index].mobile}
          alt="Banner"
          className="
            block md:hidden
            w-full h-full object-contain rounded-2xl
            bg-black
            select-none pointer-events-none
          "
          draggable={false}
        />

        {/* INDICADORES */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-20">
          {banners.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={`
                w-3.5 h-3.5 rounded-full transition border border-white/60
                ${
                  i === index
                    ? "bg-[#B90007] scale-110 shadow-[0_0_12px_rgba(185,0,7,0.9)]"
                    : "bg-white/40 hover:bg-white/70"
                }
              `}
              aria-label={`Ir para o banner ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
