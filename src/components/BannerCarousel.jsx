import { useEffect, useState } from "react";

import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

import bannerMobile1 from "../assets/bannermobile.png";
import bannerMobile2 from "../assets/bannermobile2.png";
import bannerMobile3 from "../assets/bannermobile3.png";

const desktopBanners = [banner1, banner2, banner3];
const mobileBanners = [bannerMobile1, bannerMobile2, bannerMobile3];

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % desktopBanners.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  const goTo = (i) => setIndex(i);

  return (
    <div className="w-full max-w-full">
      <div className="relative w-full max-w-full overflow-hidden rounded-xl bg-black">
        {/* ALTURA AINDA MENOR NO MOBILE */}
        <div className="w-full max-w-full h-36 sm:h-48 md:h-56 lg:h-64">
          <picture className="block w-full h-full max-w-full">
            {/* Tablet / Desktop */}
            <source
              media="(min-width: 768px)"
              srcSet={desktopBanners[index]}
            />
            {/* Mobile */}
            <img
              src={mobileBanners[index]}
              alt="Banner promocional"
              className="block w-full h-full max-w-full object-cover rounded-xl"
              draggable={false}
            />
          </picture>
        </div>

        {/* indicadores */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
          {desktopBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`
                w-2 h-2 rounded-full transition
                ${i === index ? "bg-white scale-110" : "bg-white/40"}
              `}
              aria-label={`Ir para banner ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
