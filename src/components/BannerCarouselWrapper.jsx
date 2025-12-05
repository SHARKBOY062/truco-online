export default function BannerCarouselWrapper({ children }) {
  return (
    <div className="relative z-0 pointer-events-none">
      {children}
    </div>
  );
}
