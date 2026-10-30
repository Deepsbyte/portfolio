import React, { useMemo } from 'react';

/* Global SVG paint servers: stitched-patch fabrics reused by every star */
export const SvgDefs = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
    <defs>
      <pattern id="pat-denim" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="6" height="6" fill="#426D9D" /><rect width="6" height="1.1" fill="#fff" opacity=".13" /><rect y="3.2" width="6" height=".8" fill="#000" opacity=".1" />
      </pattern>
      <pattern id="pat-navydot" width="9" height="9" patternUnits="userSpaceOnUse">
        <rect width="9" height="9" fill="#233B68" /><circle cx="2.3" cy="2.3" r="1" fill="#fff" opacity=".85" /><circle cx="6.8" cy="6.8" r="1" fill="#fff" opacity=".85" />
      </pattern>
      <pattern id="pat-gingham" width="9" height="9" patternUnits="userSpaceOnUse">
        <rect width="9" height="9" fill="#fff" /><rect width="4.5" height="9" fill="#426D9D" opacity=".38" /><rect width="9" height="4.5" fill="#426D9D" opacity=".38" />
      </pattern>
      <pattern id="pat-gingham-pink" width="9" height="9" patternUnits="userSpaceOnUse">
        <rect width="9" height="9" fill="#fff" /><rect width="4.5" height="9" fill="#E9B9C9" opacity=".85" /><rect width="9" height="4.5" fill="#E9B9C9" opacity=".85" />
      </pattern>
      <pattern id="pat-butter" width="5" height="5" patternUnits="userSpaceOnUse">
        <rect width="5" height="5" fill="#F1D978" /><circle cx="1" cy="1" r=".5" fill="#fff" opacity=".35" />
      </pattern>
    </defs>
  </svg>
);

export const STAR_PATH = 'M50 7 L61.5 35.5 L92 38 L68.5 58 L76 88 L50 71.5 L24 88 L31.5 58 L8 38 L38.5 35.5 Z';
export const FILL_ID = { denim: 'pat-denim', navy: 'pat-navydot', gingham: 'pat-gingham', pink: 'pat-gingham-pink', butter: 'pat-butter' };
export const EDGE_COL = { denim: '#426D9D', navy: '#233B68', gingham: '#B8D2E8', pink: '#E9B9C9', butter: '#F1D978' };

/** Stitched patch star — the signature sticker of the site (see your star references). */
export const StarPatch = ({ size = 48, variant = 'denim', rotate = 0, className = '', style = {}, ...rest }) => (
  <svg
    viewBox="0 0 100 100" width={size} height={size} aria-hidden="true"
    className={className}
    style={{ transform: `rotate(${rotate}deg)`, filter: 'drop-shadow(1px 3px 3px rgba(35,59,104,.25))', overflow: 'visible', ...style }}
    {...rest}
  >
    <path d={STAR_PATH} fill="#fff" stroke="#fff" strokeWidth="11" strokeLinejoin="round" />
    <path d={STAR_PATH} fill={`url(#${FILL_ID[variant]})`} stroke={EDGE_COL[variant]} strokeWidth="6" strokeLinejoin="round" />
    <g transform="translate(50 52) scale(.8) translate(-50 -52)">
      <path d={STAR_PATH} fill="none" stroke={variant === 'butter' || variant === 'pink' || variant === 'gingham' ? 'rgba(35,59,104,.55)' : 'rgba(255,255,255,.8)'} strokeWidth="1.8" strokeDasharray="4 3.4" strokeLinejoin="round" />
    </g>
  </svg>
);

export const Sparkle = ({ size = 18, color = '#F1D978', className = '', style = {} }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true">
    <path d="M12 1 C12.6 7.4 16.6 11.4 23 12 C16.6 12.6 12.6 16.6 12 23 C11.4 16.6 7.4 12.6 1 12 C7.4 11.4 11.4 7.4 12 1Z" fill={color} style={{ stroke: 'var(--navy)' }} strokeWidth=".9" strokeLinejoin="round" />
  </svg>
);

/** Little outlined doodle star (navy ink) for constellations */
export const InkStar = ({ size = 16, className = '', style = {}, fill = 'none' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true">
    <path d="M12 2.5l2.7 6.3 6.8.6-5.2 4.5 1.6 6.7L12 17l-5.9 3.6 1.6-6.7L2.5 9.4l6.8-.6z" fill={fill} style={{ stroke: 'var(--navy)' }} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

export const Tape = ({ className = '', color = '', style = {}, rotate = -3 }) => (
  <span className={`tape ${color} ${className}`} style={{ transform: `rotate(${rotate}deg)`, ...style }} aria-hidden="true" />
);

/* deterministic torn-edge polygon */
const tornPolygon = (seed, amp = 1.4, steps = 26, sides = true) => {
  let s = seed * 9301 + 49297;
  const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const pts = [];
  for (let i = 0; i <= steps; i++) pts.push(`${((i / steps) * 100).toFixed(2)}% ${(r() * amp).toFixed(2)}%`);
  if (sides) for (let i = 1; i < 8; i++) pts.push(`${(100 - r() * amp * 0.5).toFixed(2)}% ${((i / 8) * 100).toFixed(2)}%`);
  for (let i = steps; i >= 0; i--) pts.push(`${((i / steps) * 100).toFixed(2)}% ${(100 - r() * amp).toFixed(2)}%`);
  if (sides) for (let i = 7; i > 0; i--) pts.push(`${(r() * amp * 0.5).toFixed(2)}% ${((i / 8) * 100).toFixed(2)}%`);
  return `polygon(${pts.join(',')})`;
};

/** Torn-paper sheet. `wrapClass` carries the drop shadow; the inner element is clipped. */
export const Paper = ({ children, seed = 1, className = '', wrapClass = '', style = {}, rot = 0, amp = 1.2, tone = 'paper', ...rest }) => {
  const clip = useMemo(() => tornPolygon(seed, amp), [seed, amp]);
  const bg = tone === 'mist' ? { background: 'var(--mist)' } : tone === 'butter' ? { background: '#F8EDB8' } : {};
  return (
    <div className={`torn-wrap ${wrapClass}`} style={{ transform: `rotate(${rot}deg)`, ...style }} {...rest}>
      <div className={`paper-card ${className}`} style={{ clipPath: clip, ...bg }}>{children}</div>
    </div>
  );
};

/* Hand-drawn arrows that draw themselves (use inside a .draw wrapper by passing `draw`) */
const ARROWS = {
  curlDown: { vb: '0 0 120 90', d: 'M8 8 C60 4 112 26 90 58 C78 74 52 62 66 46 C78 36 96 52 84 78', head: 'M74 68 L84 80 L98 70' },
  curlRight: { vb: '0 0 130 60', d: 'M6 46 C30 6 78 4 112 32', head: 'M98 40 L114 33 L108 16' },
  swoop: { vb: '0 0 110 70', d: 'M6 10 C20 62 74 70 102 30', head: 'M88 28 L103 28 L99 44' },
  up: { vb: '0 0 70 110', d: 'M40 104 C8 78 66 44 36 8', head: 'M24 20 L36 7 L50 20' },
};
export const HandArrow = ({ variant = 'curlRight', className = '', color = 'var(--navy)', width = 110, flip = false, delay = 0 }) => {
  const a = ARROWS[variant];
  const [, , w, h] = a.vb.split(' ').map(Number);
  return (
    <svg viewBox={a.vb} width={width} height={(width * h) / w} className={`draw ${className}`} style={{ '--d': delay, transform: flip ? 'scaleX(-1)' : undefined, overflow: 'visible' }} aria-hidden="true">
      <path d={a.d} pathLength="1" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: color }} />
      <path d={a.head} pathLength="1" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ '--d': delay + 700, stroke: color }} />
    </svg>
  );
};

export const Squiggle = ({ className = '', width = 180, color = 'var(--denim)' }) => (
  <svg viewBox="0 0 180 14" width={width} className={`draw ${className}`} aria-hidden="true" style={{ overflow: 'visible' }}>
    <path d="M2 8 C14 0 22 14 34 7 S54 1 66 8 S86 14 98 7 S118 1 130 8 S152 13 178 5" pathLength="1" fill="none" style={{ stroke: color }} strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

/** Headline whose words rise in one by one */
export const Words = ({ text, className = '', base = 0, as: Tag = 'span' }) => (
  <Tag className={`words rv ${className}`} style={{ '--base': base }}>
    <span className="sr-only">{text}</span>
    <span aria-hidden="true">
      {text.split(' ').map((w, i) => (
        <React.Fragment key={i}>
          <span className="w"><span style={{ '--i': i }}>{w}</span></span>{' '}
        </React.Fragment>
      ))}
    </span>
  </Tag>
);

/** Reusable section header: handwritten kicker + display title with drawn underline */
export const SectionHead = ({ kicker, title, intro, star = 'denim', align = 'left', no, children }) => (
  <header className={`relative mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto' : ''} max-w-3xl`}>
    <div className={`flex items-center gap-3 mb-3 rv ${align === 'center' ? 'justify-center' : ''}`}>
      <StarPatch size={30} variant={star} rotate={-10} className="twinkle" style={{ '--t': '6s' }} />
      <span className="note text-2xl">{kicker}</span>
      {no && <span className="font-mono text-[11px] tracking-[.22em] text-denim border-l border-denim/40 pl-3 ml-1">№ {no}</span>}
    </div>
    <h2 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.02] text-navy">
      <Words text={title} />
    </h2>
    <Squiggle className="mt-3" width={170} />
    {intro && <p className="rv mt-5 text-base sm:text-lg text-navy/70 max-w-xl leading-relaxed" style={{ '--d': 150 }}>{intro}</p>}
    {children}
  </header>
);

/* Brand marks (kept inline: lucide dropped brand icons) */
export const GithubIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" /></svg>
);
export const LinkedinIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" /></svg>
);

/** Torn top edge of a sheet of paper; stack two in different colours for a layered tear. */
export const TornEdge = ({ seed = 1, color = '#FCFAF5', className = '', amp = 24, steps = 80, flip = false }) => {
  const clip = useMemo(() => {
    let s = seed * 9301 + 49297;
    const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    let y = amp / 2; const pts = [];
    for (let i = 0; i <= steps; i++) { y = Math.min(amp, Math.max(0, y + (r() - 0.5) * amp * 0.8)); pts.push(`${((i / steps) * 100).toFixed(2)}% ${y.toFixed(1)}%`); }
    return `polygon(${pts.join(',')}, 100% 100%, 0% 100%)`;
  }, [seed, amp, steps]);
  return (
    <div className={`torn-edge ${className}`} aria-hidden="true" style={flip ? { transform: 'scaleY(-1)' } : undefined}>
      <div className="torn-sheet w-full h-full" style={{ clipPath: clip, backgroundColor: color }} />
    </div>
  );
};
