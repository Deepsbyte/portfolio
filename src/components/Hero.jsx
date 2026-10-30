import React, { useRef, useState } from 'react';
import { ArrowDown, FileDown, Mail, MapPin } from 'lucide-react';
import { PROFILE } from '../data/content';
import { StarPatch, Sparkle, Paper, Tape, HandArrow, InkStar, Words, GithubIcon, LinkedinIcon } from './Doodles';
import { usePrefersReducedMotion } from '../hooks';
import { Draggable } from './Draggable';

const CHECKS = [
  `${PROFILE.degree} · KSSEM · ${PROFILE.grad}`,
  `Building with ${PROFILE.stack}`,
  'TaskFlow & CareerIQ — full-stack projects',
  `Looking for ${PROFILE.interest} roles · ${PROFILE.availability.toLowerCase()}`,
];

// where-next constellation (% of its box)
const STARS = [
  { id: 'projects', label: 'projects', x: 14, y: 30, v: 'denim' },
  { id: 'experience', label: 'journey', x: 50, y: 70, v: 'butter' },
  { id: 'bag', label: 'desk bag', x: 86, y: 26, v: 'pink' },
];

export const Hero = () => {
  const reduced = usePrefersReducedMotion();
  const [moved, setMoved] = useState(false);
  const [off, setOff] = useState({});
  const box = useRef(null);
  const grab = () => setMoved(true);

  const pop = async (e) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const { default: confetti } = await import('canvas-confetti'); // loaded only when the star is clicked
    confetti({ particleCount: 24, spread: 70, startVelocity: 22, scalar: 0.9, shapes: ['star'], colors: ['#F1D978', '#B8D2E8', '#426D9D', '#E9B9C9'], origin: { x: (r.left + r.width / 2) / innerWidth, y: (r.top + r.height / 2) / innerHeight } });
  };
  // constellation line follows the stars while they are dragged
  const line = STARS.map((s) => {
    const o = off[s.id] || { x: 0, y: 0 };
    const w = box.current ? box.current.clientWidth : 1, h = box.current ? box.current.clientHeight : 1;
    return `${s.x + (o.x / w) * 100},${s.y + (o.y / h) * 100}`;
  }).join(' ');

  return (
    <section id="hero" className="relative min-h-[100svh] pt-28 pb-16 overflow-hidden dots">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ivory pointer-events-none" aria-hidden="true" />

      {/* sparse decoration — all of it can be picked up */}
      <div className="hidden md:block absolute left-[3%] top-[22%] z-[3]"><div data-par="0.08">
        <Draggable touch onGrab={grab} hoverRot={-10}><span className="bob block" style={{ '--r': '-14deg', '--t': '8s' }}><StarPatch size={64} variant="denim" rotate={-14} /></span></Draggable>
      </div></div>
      <div className="absolute right-[5%] top-[14%] hidden sm:block z-[3]"><div data-par="-0.06">
        <Draggable touch onGrab={grab} hoverRot={10}><span className="bob block" style={{ '--r': '12deg', '--t': '9s', '--dl': '1s' }}><StarPatch size={44} variant="navy" rotate={12} /></span></Draggable>
      </div></div>
      <div className="absolute right-[11%] bottom-[6%] hidden md:block z-[3]">
        <Draggable touch onGrab={grab} hoverRot={-4}><span className="tape butter block" style={{ position: 'relative', width: 128, height: 28, transform: 'rotate(-7deg)' }} /></Draggable>
      </div>
      <div className="absolute left-[44%] top-[19%] hidden md:block z-[3]">
        <Draggable touch onGrab={grab} hoverRot={20}><Sparkle className="twinkle" size={20} style={{ '--t': '3.5s' }} /></Draggable>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        {/* — left: the introduction — */}
        <div className="lg:col-span-7">
          <Draggable subtle className="w-fit rv" style={{ '--d': 100 }} onGrab={grab}>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 label">
              <span>Deepthi.cosmo</span><span aria-hidden="true">✦</span><span className="normal-case tracking-normal font-hand text-[1.35rem] text-navy/70">a little universe, open for internships</span>
            </p>
          </Draggable>

          <div className="relative mt-4 w-fit">
            <Draggable subtle onGrab={grab}>
              <h1 className="font-display font-semibold text-navy leading-[.9] text-[clamp(3.6rem,12vw,8.5rem)]">
                <Words text="Deepthi" base={200} as="span" className="block" />
                <Words text="Kumar" base={420} as="span" className="block" />
              </h1>
            </Draggable>
            <span className="absolute -right-2 -top-8 sm:-right-12 sm:-top-5 z-[4]">
              <Draggable touch onGrab={grab} hoverRot={14}>
                <button type="button" tabIndex={-1} onClick={pop} className="block" title="psst — click the star" aria-label="Sprinkle some stars"><StarPatch size={52} variant="pink" rotate={10} /></button>
              </Draggable>
            </span>
          </div>

          <Draggable subtle className="max-w-xl mt-6 rv" style={{ '--d': 700 }} onGrab={grab}>
            <p className="font-display italic text-xl sm:text-2xl md:text-[1.7rem] leading-snug text-navy/80">
              {PROFILE.role} who loves making systems <span className="marker not-italic font-semibold">click</span> and interfaces feel kind.
            </p>
          </Draggable>

          <ul className="rv mt-5 flex flex-wrap gap-2 list-none p-0" style={{ '--d': 850 }} aria-label="Quick facts">
            {[<><MapPin size={13} /> {PROFILE.location}</>, 'Pre-final year B.E. CSE', PROFILE.stack, <><Sparkle size={12} /> {PROFILE.availability}</>].map((c, i) => (
              <li key={i}><Draggable onGrab={grab} hoverRot={i % 2 ? 2 : -2}><span className={`chip ${i === 3 ? '!bg-butter !border-solid !border-navy/40 font-medium' : ''}`}>{c}</span></Draggable></li>
            ))}
          </ul>

          <div className="rv mt-8 flex flex-wrap items-center gap-4" style={{ '--d': 1000 }}>
            <Draggable onGrab={grab} hoverRot={-1}><a href="#projects" className="btn btn-solid">See my projects <ArrowDown size={16} /></a></Draggable>
            <Draggable onGrab={grab} hoverRot={1}><a href={PROFILE.resume} download="Deepthi_Kumar_Resume.pdf" className="btn btn-paper"><FileDown size={16} /> Download resume</a></Draggable>
            <Draggable subtle onGrab={grab} className="hidden sm:block -ml-1"><span className="flex items-center gap-1" aria-hidden="true"><HandArrow variant="swoop" width={56} className="-scale-x-100 rotate-[-20deg]" delay={1500} /><span className="note text-xl rotate-[-4deg]">start here</span></span></Draggable>
          </div>

          <div className="rv mt-7 flex items-center gap-4" style={{ '--d': 1150 }}>
            {[
              { href: PROFILE.github, label: 'Deepthi on GitHub', icon: <GithubIcon width={18} height={18} />, ext: true },
              { href: PROFILE.linkedin, label: 'Deepthi on LinkedIn', icon: <LinkedinIcon width={18} height={18} />, ext: true },
              { href: `mailto:${PROFILE.email}`, label: 'Email Deepthi', icon: <Mail size={18} /> },
            ].map((s, i) => (
              <Draggable key={s.label} onGrab={grab} hoverRot={i * 6 - 6}>
                <a className="grid place-items-center w-10 h-10 rounded-full border-2 border-navy/70 hover:bg-navy hover:text-ivory transition" href={s.href} {...(s.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} aria-label={s.label}>{s.icon}</a>
              </Draggable>
            ))}
          </div>

          {/* a little joke, as a sticky note */}
          <Draggable className="rv mt-8 w-fit" style={{ '--d': 1300 }} onGrab={grab} hoverRot={-2}>
            <Paper seed={33} rot={-1.5} amp={1.4} tone="butter" className="relative px-5 py-3">
              <Tape className="left-1/2 -translate-x-1/2 -top-2 !w-14 !h-5" rotate={2} />
              <p className="note text-[1.45rem] text-navy leading-tight">dreams big, builds carefully, and has a soft spot for stars ✦</p>
            </Paper>
          </Draggable>
        </div>

        {/* — right: field notes + where-next constellation — */}
        <div className="lg:col-span-5 relative">
          <div className={`hint absolute -top-[4.2rem] left-6 hidden md:flex flex-col items-start pointer-events-none z-[5] ${moved ? 'gone' : ''}`} aria-hidden="true">
            <span className="note text-2xl leading-none">psst — try moving me</span>
            <HandArrow variant="curlDown" width={52} className="ml-8 -mt-0.5" delay={2200} />
          </div>
          <Draggable label="Currently note card" keyboard onGrab={grab} hoverRot={0}>
            <Paper seed={7} rot={2.5} amp={1.1} wrapClass="rv-paper" style={{ '--rot': '2.5deg', '--d': 500 }} className="relative px-7 pt-9 pb-8 stitch">
              <Tape className="left-8 -top-1" rotate={-4} />
              <Tape className="right-6 -top-1" rotate={5} color="butter" />
              <p className="note text-3xl text-navy">currently ✦</p>
              <ul className="mt-4 list-none p-0 grid gap-3.5">
                {CHECKS.map((c, i) => (
                  <li key={c} className="flex items-start gap-3 text-[.97rem] leading-snug">
                    <svg className="draw in mt-0.5 shrink-0" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13 C6 14 8 17 9 20 C12 11 16 6 22 3" pathLength="1" fill="none" stroke="#426D9D" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ '--d': 1200 + i * 350 }} /></svg>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Paper>
          </Draggable>

          <nav ref={box} aria-label="Where to next" className="relative mt-6 h-44 sm:h-48 rv" style={{ '--d': 1300 }}>
            <svg className="draw in absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <polyline points={line} pathLength="1" fill="none" strokeWidth="1.2" vectorEffect="non-scaling-stroke" style={{ '--d': 1600, stroke: 'var(--denim)' }} />
            </svg>
            <Draggable subtle onGrab={grab} style={{ position: 'absolute', left: 0, top: -4 }}><span className="note text-xl">where to next?</span></Draggable>
            {STARS.map((s, i) => (
              <Draggable key={s.id} onGrab={grab} hoverRot={i % 2 ? 12 : -12} style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, translate: '-50% -50%' }} onMove={(x, y) => setOff((o) => ({ ...o, [s.id]: { x, y } }))}>
                <a href={`#${s.id}`} className="group grid place-items-center" aria-label={`Go to ${s.label}`}>
                  <StarPatch size={46} variant={s.v} rotate={i * 14 - 10} />
                  <span className="note text-xl mt-0.5 group-hover:text-navy transition-colors bg-ivory/80 px-1 rounded">{s.label}</span>
                </a>
              </Draggable>
            ))}
            <Draggable touch onGrab={grab} hoverRot={20} style={{ position: 'absolute', left: '30%', top: '78%' }}><InkStar size={14} className="twinkle block" style={{ '--t': '5s' }} /></Draggable>
            <Draggable touch onGrab={grab} hoverRot={-20} style={{ position: 'absolute', left: '70%', top: '80%' }}><InkStar size={12} className="twinkle block" style={{ '--t': '4s', '--dl': '1s' }} /></Draggable>
          </nav>
        </div>
      </div>
    </section>
  );
};
