import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks';

/**
 * A loose object on the desk. Drag with mouse (or touch, if `touch`), glide home when the hero scrolls away.
 * A press that barely moves is still a normal click, so links and buttons inside keep working.
 * `keyboard` pieces (pure decoration / notes) also get arrow-key nudging; Esc puts them back.
 */
export const Draggable = ({ children, label, className = '', style = {}, touch = false, keyboard = false, subtle = false, onGrab, onMove, hoverRot = -3 }) => {
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const drag = useRef(null);
  const justDragged = useRef(false);
  const [grabbed, setGrabbed] = useState(false);
  const reduced = usePrefersReducedMotion();

  const place = (x, y, smooth) => {
    const el = ref.current;
    if (!el) return;
    pos.current = { x, y };
    el.style.transition = smooth && !reduced ? 'transform .9s cubic-bezier(.34,1.45,.5,1)' : 'none';
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (onMove) onMove(x, y);
  };
  const clamp = (x, y, d) => [
    Math.min(Math.max(x, d.ox + d.parent.left - d.rect.left), d.ox + d.parent.right - d.rect.right),
    Math.min(Math.max(y, d.oy + d.parent.top - d.rect.top), d.oy + d.parent.bottom - d.rect.bottom),
  ];

  const activate = (d) => {
    if (!drag.current || drag.current !== d || d.active) return;
    d.active = true;
    ref.current.setPointerCapture(d.id);
    window.getSelection && window.getSelection().removeAllRanges();
    if (navigator.vibrate) navigator.vibrate(8);
    setGrabbed(true);
    if (onGrab) onGrab();
  };
  const down = (e) => {
    if (e.pointerType !== 'touch' && e.button !== 0) return;
    const el = ref.current;
    const sec = el.closest('section') || el.parentElement;
    const d = { sx: e.clientX, sy: e.clientY, ox: pos.current.x, oy: pos.current.y, rect: el.getBoundingClientRect(), parent: sec.getBoundingClientRect(), active: false, id: e.pointerId, hold: e.pointerType === 'touch' && !touch, timer: 0 };
    drag.current = d;
    // touch: press and hold ~0.3s to pick it up, so a normal swipe still scrolls the page
    if (d.hold) d.timer = setTimeout(() => activate(d), 320);
  };
  const move = (e) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    if (!d.active) {
      if (d.hold) { if (Math.hypot(dx, dy) > 8) { clearTimeout(d.timer); drag.current = null; } return; } // swiped: let the page scroll
      if (Math.hypot(dx, dy) < 5) return; // still a click
      activate(d);
    }
    const [x, y] = clamp(d.ox + dx, d.oy + dy, d);
    place(x, y, false);
  };
  const up = () => {
    const d = drag.current;
    if (d) clearTimeout(d.timer);
    drag.current = null;
    if (d && d.active) { justDragged.current = true; setTimeout(() => { justDragged.current = false; }, 60); setGrabbed(false); }
  };
  const swallowClick = (e) => { if (justDragged.current) { e.preventDefault(); e.stopPropagation(); } };

  const key = (e) => {
    if (!keyboard) return;
    const step = e.shiftKey ? 40 : 14;
    const mv = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (mv) {
      e.preventDefault();
      const el = ref.current;
      const d = { parent: (el.closest('section') || el.parentElement).getBoundingClientRect(), rect: el.getBoundingClientRect(), ox: pos.current.x, oy: pos.current.y };
      const [x, y] = clamp(pos.current.x + mv[0], pos.current.y + mv[1], d);
      place(x, y, true);
      if (onGrab) onGrab();
    } else if (e.key === 'Escape' || e.key === 'Home') place(0, 0, true);
  };

  // once a held touch has picked the piece up, stop the page from scrolling under the finger
  useEffect(() => {
    const el = ref.current;
    const stop = (e) => { if (drag.current && drag.current.active) e.preventDefault(); };
    el.addEventListener('touchmove', stop, { passive: false });
    return () => el.removeEventListener('touchmove', stop);
  }, []);

  useEffect(() => {
    const sec = ref.current && ref.current.closest('section');
    if (!sec || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting && (pos.current.x || pos.current.y)) place(0, 0, true);
    }, { threshold: 0 });
    io.observe(sec);
    return () => io.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const a11y = keyboard ? { role: 'button', tabIndex: 0, 'aria-roledescription': 'draggable decoration', 'aria-label': `${label}. Drag to move, or use arrow keys. Escape puts it back.` } : {};
  return (
    <div
      ref={ref} data-grab={grabbed} data-subtle={subtle || undefined} {...a11y}
      className={`drag-piece ${className}`}
      style={{ touchAction: touch ? 'none' : 'auto', '--hr': `${hoverRot}deg`, ...style }}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
      onClickCapture={swallowClick} onContextMenu={(e) => { if (drag.current) e.preventDefault(); }} onDragStart={(e) => e.preventDefault()} onKeyDown={key}
    >
      <div className="dp-inner">{children}</div>
    </div>
  );
};
