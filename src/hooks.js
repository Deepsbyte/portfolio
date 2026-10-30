import { useEffect, useState } from 'react';

export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
};

export const useMedia = (query) => {
  const [m, setM] = useState(typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return m;
};

/** Which section id is currently nearest the reading line. */
export const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const pick = () => {
      const line = window.innerHeight * 0.35;
      let cur = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      });
      setActive(cur);
    };
    pick();
    window.addEventListener('scroll', pick, { passive: true });
    window.addEventListener('resize', pick);
    return () => {
      window.removeEventListener('scroll', pick);
      window.removeEventListener('resize', pick);
    };
  }, [ids.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
};

/** Adds .in to every .rv element once it scrolls into view. */
export const useRevealObserver = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.rv, .rv-paper, .draw');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        }),
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
};

/** Gentle parallax on [data-par="0.2"] decorations (CSS `translate`, so rotation is untouched). */
export const useParallax = (reduced) => {
  useEffect(() => {
    if (reduced) return undefined;
    const els = [...document.querySelectorAll('[data-par]')];
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const off = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.par);
        el.style.translate = `0 ${off.toFixed(1)}px`;
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);
};

/** Day / night theme. Persists, and reveals the new theme as a circle growing out of the toggle. */
export const useTheme = () => {
  const [night, setNight] = useState(typeof document !== 'undefined' && document.documentElement.classList.contains('night'));
  const toggle = (e) => {
    const next = !document.documentElement.classList.contains('night');
    const apply = () => {
      document.documentElement.classList.toggle('night', next);
      setNight(next);
      try { localStorage.setItem('theme', next ? 'night' : 'day'); } catch { /* private mode */ }
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next ? '#0B1330' : '#FCFAF5');
    };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (document.startViewTransition && !reduced && e && e.currentTarget) {
      const r = e.currentTarget.getBoundingClientRect();
      document.documentElement.style.setProperty('--tx', `${r.left + r.width / 2}px`);
      document.documentElement.style.setProperty('--ty', `${r.top + r.height / 2}px`);
      document.startViewTransition(apply);
    } else apply();
  };
  return [night, toggle];
};
