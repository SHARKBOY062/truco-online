export default function CardCenterPulse({ active }) {
  return (
    <div
      className={`
        absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        w-[250px] h-[250px] rounded-full pointer-events-none
        ${active ? "animate-card-pulse" : ""}
      `}
    ></div>
  );
}
