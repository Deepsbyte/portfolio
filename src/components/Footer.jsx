import React from 'react';
import { PROFILE } from '../data/content';
import { InkStar, StarPatch } from './Doodles';

const PTS = [[8, 62], [30, 30], [52, 54], [74, 18], [92, 40]];

export const Footer = () => (
  <footer className="relative pt-20 pb-10 overflow-hidden dots">
    <div className="absolute inset-0 bg-gradient-to-b from-ivory to-transparent pointer-events-none" aria-hidden="true" />
    <div className="relative mx-auto max-w-4xl px-5 text-center">
      {/* a small constellation that draws itself */}
      <svg viewBox="0 0 100 80" className="draw mx-auto w-56 h-auto overflow-visible" aria-hidden="true">
        <polyline points={PTS.map((p) => p.join(',')).join(' ')} pathLength="1" fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ stroke: 'var(--denim)' }} />
        {PTS.map(([x, y], i) => (<g key={i} transform={`translate(${x - 5} ${y - 5})`} className="no-draw"><InkStar size={10} fill={i === 3 ? '#F1D978' : 'var(--ivory)'} /></g>))}
      </svg>
      <p className="rv font-display italic text-3xl sm:text-4xl mt-4">thanks for stopping by.</p>
      <p className="rv note text-4xl sm:text-5xl mt-2 text-navy -rotate-2" style={{ '--d': 150 }}>— Deepthi ✦</p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-navy/65">
        <a className="hover:text-navy underline decoration-dashed underline-offset-4" href="#hero">back to the top</a>
        <a className="hover:text-navy underline decoration-dashed underline-offset-4" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a className="hover:text-navy underline decoration-dashed underline-offset-4" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a className="hover:text-navy underline decoration-dashed underline-offset-4" href={`mailto:${PROFILE.email}`}>Email</a>
      </div>
      <p className="mt-6 font-mono text-xs text-navy/50 flex items-center justify-center gap-2"><StarPatch size={16} variant="butter" /> hand-built with care · © 2026 {PROFILE.name}</p>
    </div>
  </footer>
);
