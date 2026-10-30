import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks';

/* A tiny star that follows the mouse: grows over links, tilts over things you can pick up. Desktop/pointer devices only. */
export const StarCursor = () => {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const el = ref.current;
    const root = document.documentElement;
    root.classList.add('has-cursor');
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0, shown = false;
    const ease = reduced ? 1 : 0.38;

    const loop = () => {
      x += (tx - x) * ease; y += (ty - y) * ease;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { shown = true; x = tx; y = ty; el.style.opacity = '1'; }
      const t = e.target;
      let mode = '';
      if (document.querySelector('[data-grab="true"]')) mode = 'dragging';
      else if (t.closest && t.closest('input, textarea, select, [contenteditable]')) mode = 'text';
      else if (t.closest && t.closest('.drag-piece')) mode = 'grab';
      else if (t.closest && t.closest('a, button, [role="button"], summary, label')) mode = 'link';
      el.dataset.mode = mode;
    };
    const leave = () => { shown = false; el.style.opacity = '0'; };
    raf = requestAnimationFrame(loop);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      cancelAnimationFrame(raf); root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move); document.removeEventListener('mouseleave', leave);
    };
  }, [reduced]);

  return (
    <div ref={ref} className="star-cursor" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path d="M12 2.5l2.7 6.3 6.8.6-5.2 4.5 1.6 6.7L12 17l-5.9 3.6 1.6-6.7L2.5 9.4l6.8-.6z" fill="#F1D978" strokeWidth="1.7" strokeLinejoin="round" style={{ stroke: 'var(--navy)' }} />
      </svg>
    </div>
  );
};
