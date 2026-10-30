import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { BAG_ITEMS } from '../data/content';
import { HandArrow, InkStar, Sparkle, StarPatch, Words } from './Doodles';
import { usePrefersReducedMotion } from '../hooks';

const BAG_SRC = '/bag-assets/bag-polka.webp';
const BAG_NOTE = 'a little bag of happy things ♡';
// The mouth of the bag (as % of the square bag image). Everything below this line is drawn in front of rising objects.
const AR = 712 / 736; // true aspect of the bag image (height / width) — never stretched
const MOUTH = 'polygon(0% 60.6%, 24.6% 60.6%, 30% 57.9%, 40% 57.9%, 50% 56.3%, 57% 55.8%, 66% 55.8%, 76% 57.7%, 80.6% 60%, 100% 60%, 100% 100%, 0% 100%)';
const OPEN_Y = 0.5634;
const CX = 0.51; // horizontal centre of the mouth within the image // mouth line, fraction of bag image height
const CONTENT_BOTTOM = 681 / 712;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t) => { const c1 = 1.4, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };

// final resting spots as fractions of the canvas, per layout
const SPOTS = {
  desk: { gloss: { x: .17, y: .36, r: -16, w: .27 }, mini: { x: .79, y: .17, r: 9, w: .2 }, bowblue: { x: .68, y: .2, r: 14, w: .17 }, bowwhite: { x: .31, y: .19, r: -12, w: .15 }, capy: { x: .88, y: .44, r: 7, w: .165 }, ysl: { x: .83, y: .8, r: 12, w: .13 }, scrunchie: { x: .14, y: .76, r: -8, w: .21 } },
  mob: { gloss: { x: .2, y: .2, r: -14, w: .36 }, mini: { x: .8, y: .13, r: 9, w: .3 }, bowblue: { x: .66, y: .12, r: 14, w: .27 }, bowwhite: { x: .4, y: .1, r: -12, w: .24 }, capy: { x: .83, y: .31, r: 7, w: .22 }, ysl: { x: .84, y: .56, r: 12, w: .2 }, scrunchie: { x: .18, y: .5, r: -8, w: .3 } },
};

export const DeskBag = () => {
  const reduced = usePrefersReducedMotion();
  const section = useRef(null);
  const holder = useRef(null);
  const bagRef = useRef(null);
  const mouthRef = useRef(null);
  const frontRef = useRef(null);
  const itemRefs = useRef({});
  const [dims, setDims] = useState({ W: 900, H: 600, mobile: false });
  const [selected, setSelected] = useState(null);
  const [hint, setHint] = useState('scroll to unpack');

  const items = BAG_ITEMS.filter((i) => i.src);

  // fit canvas to viewport
  useLayoutEffect(() => {
    const fit = () => {
      const cw = holder.current ? holder.current.clientWidth : window.innerWidth;
      const mobile = window.innerWidth < 768;
      const ratio = mobile ? 1.32 : 0.66;
      const availH = Math.max(320, window.innerHeight - (mobile ? 150 : 190));
      const W = Math.round(Math.min(cw, 1040, availH / ratio));
      setDims({ W, H: Math.round(W * ratio), mobile });
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const geo = useMemo(() => {
    const { W, H, mobile } = dims;
    const bw = W * (mobile ? 1.1 : 0.62);
    const bh = bw * AR;
    const top = H - 8 - bh * CONTENT_BOTTOM;
    const ox = (W - bw) / 2 + bw * CX, oy = top + bh * OPEN_Y;
    const spots = mobile ? SPOTS.mob : SPOTS.desk;
    return { W, H, bw, bh, top, ox, oy, spots };
  }, [dims]);
  const geoRef = useRef(geo); geoRef.current = geo;

  const update = (p) => {
    const g = geoRef.current;
    // 1. bag enters, then "breathes" open
    const enter = easeInOut(clamp(p / 0.2));
    const open = clamp((p - 0.15) / 0.13);
    if (bagRef.current) {
      bagRef.current.style.opacity = String(clamp(enter * 1.4));
      bagRef.current.style.transform = `translateY(${(1 - enter) * 90}px) rotate(${(1 - enter) * -4}deg) scale(${0.9 + 0.1 * enter + 0.025 * Math.sin(open * Math.PI)}, ${0.9 + 0.1 * enter + 0.045 * Math.sin(open * Math.PI)})`;
    }
    if (frontRef.current && bagRef.current) { frontRef.current.style.transform = bagRef.current.style.transform; frontRef.current.style.opacity = bagRef.current.style.opacity; }
    if (mouthRef.current) mouthRef.current.style.opacity = String(clamp(open * 1.2) * 0.9);

    // 2. objects rise one after another along curved paths
    items.forEach((it, idx) => {
      const el = itemRefs.current[it.id];
      if (!el) return;
      const s = g.spots[it.id];
      const step = Math.min(0.11, 0.5 / Math.max(1, items.length - 1));
      const start = 0.24 + idx * step, dur = 0.24;
      const raw = clamp((p - start) / dur);
      const te = easeOutBack(easeInOut(raw) * 0.999 + (raw === 1 ? 0.001 : 0));
      const fx = s.x * g.W, fy = s.y * g.H;
      const x0 = g.ox + (fx - g.ox) * 0.08, y0 = g.oy + g.bh * 0.16;
      const cx = g.ox + (fx - g.ox) * 0.2, cy = Math.min(fy, g.oy) - g.H * 0.22;
      const u = te;
      const x = (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * cx + u * u * fx;
      const y = (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * cy + u * u * fy;
      const rot = s.r * u + Math.sin(raw * Math.PI) * (s.r > 0 ? -14 : 14);
      const sc = 0.5 + 0.5 * Math.min(u, 1.04);
      el.style.opacity = raw > 0 ? '1' : '0';
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${sc})`;
      el.firstChild.firstChild.style.transform = `rotate(${rot}deg)`;
      el.style.pointerEvents = raw > 0.97 ? 'auto' : 'none';
      el.style.zIndex = raw > 0.97 ? 8 : 5;
    });
    setHint(p < 0.08 ? 'scroll to unpack' : p < 0.97 ? 'keep scrolling…' : 'all unpacked ✦ tap or hover anything');
  };

  // scroll driver (direct style writes — no React re-render per frame)
  useEffect(() => {
    if (reduced) { update(1); return undefined; }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = section.current.getBoundingClientRect();
      const travel = Math.max(1, section.current.offsetHeight - window.innerHeight);
      update(clamp(-r.top / travel));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [reduced, geo]); // eslint-disable-line react-hooks/exhaustive-deps

  // tap elsewhere to dismiss a note
  useEffect(() => {
    const off = (e) => { if (!e.target.closest('[data-bag-btn]')) setSelected(null); };
    document.addEventListener('click', off);
    return () => document.removeEventListener('click', off);
  }, []);

  const toggle = (id) => setSelected((c) => (c === id ? null : id));
  const { W, H, bw, bh, top, ox } = geo;
  const imgLeft = (W - bw) / 2;

  return (
    <section id="bag" ref={section} className="relative" style={{ height: reduced ? 'auto' : '320vh' }}>
      <div className="bag-pin dots">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-transparent to-ivory pointer-events-none" aria-hidden="true" />
        <div className="relative w-full max-w-6xl mx-auto px-5 sm:px-8 flex flex-col items-center">
          <div className="text-center mb-2 sm:mb-3">
            <p className="note text-xl sm:text-2xl flex items-center justify-center gap-2"><Sparkle size={16} /> a little bit of me · the desk bag</p>
            <h2 className="font-display font-semibold text-3xl sm:text-5xl leading-tight"><Words text="What’s in Deepthi’s bag?" /></h2>
          </div>

          <div ref={holder} className="w-full flex justify-center">
            <div className="relative" style={{ width: W, height: H }}>
              {/* doodles that frame the composition */}
              <div className="absolute left-[3%] top-[3%] hidden sm:flex items-center gap-1 note text-xl pointer-events-none" aria-hidden="true">collected with love<HandArrow variant="curlRight" width={60} delay={400} /></div>
              <InkStar size={14} className="absolute left-[42%] top-[6%] twinkle" style={{ '--t': '5s' }} />
              <InkStar size={11} className="absolute left-[60%] top-[3%] twinkle" style={{ '--t': '4s', '--dl': '1s' }} />
              <StarPatch size={dims.mobile ? 26 : 36} variant="denim" rotate={14} className="absolute right-[2%] bottom-[10%] twinkle" style={{ '--t': '8s' }} />

              {/* the bag: back copy → mouth shadow → (objects) → front copy clipped at the mouth */}
              <div ref={bagRef} className="absolute" style={{ left: imgLeft, top, width: bw, height: bh, transformOrigin: '50% 90%', opacity: 0, zIndex: 1 }}>
                <img src={BAG_SRC} alt="" width="736" height="712" className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 10px 12px rgba(35,59,104,.18))' }} draggable="false" />
              </div>
              {/* items sit between back and front copy while emerging */}
              {items.map((it) => {
                const s = geo.spots[it.id];
                return (
                  <div key={it.id} ref={(el) => (itemRefs.current[it.id] = el)} className="bag-item" style={{ width: W * s.w, opacity: 0, zIndex: 5 }}>
                    <button type="button" data-bag-btn aria-pressed={selected === it.id} aria-label={`${it.name} — ${it.note}`} onClick={() => toggle(it.id)} className="w-full">
                      <div><img src={it.src} alt="" draggable="false" /></div>
                    </button>
                    <span className="bag-note" role="status">{it.note}</span>
                  </div>
                );
              })}
              <div className="absolute pointer-events-none" style={{ left: imgLeft, top, width: bw, height: bh, zIndex: 6 }} aria-hidden="true">
                <img ref={frontRef} src={BAG_SRC} alt="" className="absolute inset-0 w-full h-full" style={{ clipPath: MOUTH, transformOrigin: '50% 90%', opacity: 0 }} draggable="false" />
              </div>

              {/* bag hit-area + note */}
              <div className="absolute" style={{ left: ox - bw * 0.2, top: top + bh * 0.5, width: bw * 0.4, height: bh * 0.38, zIndex: 7 }}>
                <button type="button" data-bag-btn aria-pressed={selected === 'bag'} aria-label={`Blue bag — ${BAG_NOTE}`} className="absolute inset-0 w-full h-full rounded-[40%] cursor-pointer" style={{ background: 'none', border: 0 }} onClick={() => toggle('bag')} />
                <span className="bag-note" style={{ bottom: 'calc(100% - 4px)', opacity: selected === 'bag' ? 1 : undefined }} role="status">{BAG_NOTE}</span>
                <style>{`[aria-label^="Blue bag"]:hover + .bag-note,[aria-label^="Blue bag"]:focus-visible + .bag-note{opacity:1!important;transform:translate(-50%,0) rotate(-2deg)!important}`}</style>
              </div>
            </div>
          </div>
          <p className="note text-xl sm:text-2xl mt-2 text-center" aria-live="polite">{reduced ? 'tap or hover anything ✦' : hint}</p>
        </div>
      </div>
    </section>
  );
};
