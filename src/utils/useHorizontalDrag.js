import { useRef } from "react";

export default function useHorizontalDrag(ref) {
  const state = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  const start = (e) => {
    const slider = ref.current;
    if (!slider) return;

    state.current.isDown = true;
    const pageX = e.touches ? e.touches[0].clientX : e.clientX;

    state.current.startX = pageX;
    state.current.scrollLeft = slider.scrollLeft;
  };

  const move = (e) => {
    if (!state.current.isDown) return;
    const slider = ref.current;
    if (!slider) return;

    e.preventDefault();

    const pageX = e.touches ? e.touches[0].clientX : e.clientX;
    const walk = (pageX - state.current.startX) * 1.4;
    slider.scrollLeft = state.current.scrollLeft - walk;
  };

  const end = () => {
    state.current.isDown = false;
  };

  return { start, move, end };
}
