import React, { useRef, useState } from 'react';
import { PROFILE } from '../data/content';
import { StarPatch, Sparkle, Tape } from './Doodles';

/* A small, soft name-badge on a lanyard — whimsical, not a billboard */
export const BuilderPass = () => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    setTilt({ x: -((e.clientY - r.top) / r.height - 0.5) * 6, y: ((e.clientX - r.left) / r.width - 0.5) * 8 });
  };

  return (
    <div className="pass-hang rv relative mx-auto w-[270px] sm:w-[290px] pt-[96px]">
      {/* lanyard, taped to the page */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-[30px] pointer-events-none" aria-hidden="true">
        <div className="lanyard h-[78px]" />
        <Tape color="butter" style={{ width: 64, height: 18, left: -17, top: 4 }} rotate={-5} />
        <svg viewBox="0 0 30 44" width="30" height="44" className="block -mt-[2px]" style={{ filter: 'drop-shadow(1px 2px 1.5px rgba(35,59,104,.3))' }}>
          <rect x="9" y="0" width="12" height="7" rx="1.5" fill="#233B68" />
          <rect x="7" y="12" width="16" height="20" rx="5" fill="#233B68" />
          <rect x="10" y="16" width="10" height="2.4" rx="1.2" fill="#fff" opacity=".28" />
          <circle cx="15" cy="37" r="5.2" fill="none" stroke="#c4ccd8" strokeWidth="2.4" />
        </svg>
      </div>

      <div
        ref={ref} onMouseMove={move} onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="relative transition-transform duration-300 ease-out"
        style={{ transform: `perspective(900px) rotate(-2deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <article className="badge" aria-label="Builder’s pass for Deepthi Kumar">
          <div className="badge-top" aria-hidden="true"><i className="badge-slot" /></div>
          <Sparkle size={14} className="badge-spark twinkle" style={{ left: 22, top: 74, '--t': '4s' }} />
          <Sparkle size={10} color="#B8D2E8" className="badge-spark twinkle" style={{ right: 28, top: 98, '--t': '5s', '--dl': '1s' }} />

          <p className="badge-label">builder’s pass</p>
          <div className="badge-photo">
            <div className="badge-photo-frame">
              <img src="/photo/deepthi.webp" alt="Deepthi smiling in a blue and white striped dress, standing among green plants" width="430" height="537" loading="lazy" draggable="false" />
              {[['top-0 left-0', 0], ['top-0 right-0', 90], ['bottom-0 right-0', 180], ['bottom-0 left-0', 270]].map(([pos, r]) => (
                <span key={pos} className={`absolute ${pos} w-[15px] h-[15px] denim`} style={{ clipPath: 'polygon(0 0,100% 0,0 100%)', transform: `rotate(${r}deg)` }} aria-hidden="true" />
              ))}
            </div>
            <StarPatch size={42} variant="butter" rotate={14} className="badge-photo-star" />
          </div>
          <h3 className="badge-name">{PROFILE.name}</h3>
          <p className="badge-sub">full-stack engineer ✦</p>

          <dl className="badge-rows">
            <div><dt>born</dt><dd>2 Dec 2004</dd></div>
            <div><dt>from</dt><dd>{PROFILE.location}</dd></div>
            <div><dt>builds</dt><dd>{PROFILE.stack}</dd></div>
          </dl>

          <span className="badge-chip">{PROFILE.availability}</span>
          <div><span className="badge-sign">Deepthi</span></div>

          <svg viewBox="0 0 120 120" className="badge-stamp" aria-hidden="true">
            <defs><path id="stamp-arc" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" /></defs>
            <g fill="none" stroke="currentColor"><circle cx="60" cy="60" r="57" strokeWidth="3" /><circle cx="60" cy="60" r="50" strokeWidth="1.2" /></g>
            <text fontFamily="DM Mono, monospace" fontWeight="500" fontSize="11" fill="currentColor"><textPath href="#stamp-arc" textLength="262" lengthAdjust="spacing">ADMIT ONE · CURIOUS RECRUITER ·</textPath></text>
            <path d="M60 38 L66 54 L83 55 L70 66 L74 82 L60 72.5 L46 82 L50 66 L37 55 L54 54 Z" fill="currentColor" />
          </svg>
        </article>
      </div>
    </div>
  );
};
