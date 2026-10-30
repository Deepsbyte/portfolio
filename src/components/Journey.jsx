import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { MILESTONES } from '../data/content';
import { SectionHead, Paper, Tape, StarPatch, InkStar, TornEdge } from './Doodles';
import { usePrefersReducedMotion } from '../hooks';

export const Journey = () => {
  const reduced = usePrefersReducedMotion();
  const wrap = useRef(null);
  const [fill, setFill] = useState(reduced ? 1 : 0);
  const [open, setOpen] = useState('academics');
  const [lit, setLit] = useState(reduced ? MILESTONES.map((m) => m.id) : []);
  const nodes = useRef({});

  useEffect(() => {
    if (reduced) return undefined;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = wrap.current.getBoundingClientRect();
      const line = window.innerHeight * 0.55;
      setFill(Math.max(0, Math.min(1, (line - r.top) / r.height)));
      setLit(MILESTONES.filter((m) => nodes.current[m.id] && nodes.current[m.id].getBoundingClientRect().top < line).map((m) => m.id));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [reduced]);

  return (
    <section id="experience" className="relative py-24 md:py-32 bg-mist/60 overflow-hidden">
      <div className="absolute inset-0 dots opacity-50 pointer-events-none" aria-hidden="true" />
      <TornEdge flip seed={21} color="var(--ivory)" className="absolute inset-x-0 top-0 h-9 z-[2]" amp={70} />
      <TornEdge seed={22} color="var(--ivory)" className="absolute inset-x-0 bottom-0 h-9 z-[2]" amp={70} />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHead no="02" kicker="stardust archives · 2023 — present" title="A journey, connected dot to dot" intro="Studies, community, hackathons and a first internship — traced as a constellation. Open a star to read its journal page." star="pink" />

        <div ref={wrap} className="relative">
          {/* the constellation thread */}
          <div className="absolute top-2 bottom-2 left-[19px] md:left-1/2 md:-translate-x-1/2 w-0 border-l-2 border-dashed border-denim/30" aria-hidden="true" />
          <div className="absolute top-2 left-[19px] md:left-1/2 md:-translate-x-1/2 w-[3px] bg-denim rounded-full origin-top" style={{ bottom: 8, transform: `scaleY(${fill})`, marginLeft: -1.5 }} aria-hidden="true" />

          <ol className="list-none m-0 p-0 space-y-12 md:space-y-16">
            {MILESTONES.map((m, i) => {
              const left = i % 2 === 0;
              const isOpen = open === m.id;
              return (
                <li key={m.id} className="relative md:grid md:grid-cols-2 md:gap-20 pl-14 md:pl-0">
                  <span ref={(el) => (nodes.current[m.id] = el)} className={`j-node ${lit.includes(m.id) ? 'lit' : ''} absolute left-0 top-3 md:left-1/2 md:-translate-x-1/2 md:top-6 z-10`} aria-hidden="true">
                    <StarPatch size={40} variant={m.star} rotate={i * 17 - 12} />
                  </span>
                  <div className={`${left ? 'md:col-start-1 md:text-right' : 'md:col-start-2'} hidden md:flex flex-col justify-center ${left ? 'md:items-end' : 'md:items-start'} md:row-start-1 pt-5`}>
                    <span className="font-mono text-sm text-denim">{m.period}</span>
                    <span className="note text-3xl mt-1">{m.note}</span>
                  </div>

                  <div className={`md:row-start-1 ${left ? 'md:col-start-2' : 'md:col-start-1'}`}>
                    <Paper seed={i + 11} rot={left ? 0.8 : -0.8} amp={.9} wrapClass="rv-paper" style={{ '--rot': left ? '0.8deg' : '-0.8deg' }} className="relative p-6 sm:p-7 stitch">
                      <Tape className={`-top-1 ${left ? 'left-8' : 'right-8'}`} rotate={left ? -4 : 4} color={i % 2 ? 'butter' : ''} />
                      <p className="md:hidden font-mono text-xs text-denim mb-1">{m.period}</p>
                      <h3 className="font-display font-semibold text-2xl sm:text-[1.7rem] leading-tight">{m.title}</h3>
                      <p className="font-medium text-navy/75 mt-1">{m.role}</p>
                      <p className="flex items-center gap-1.5 text-sm text-navy/55 mt-1"><MapPin size={13} /> {m.place}</p>
                      <p className="font-display italic text-navy/70 mt-4 leading-snug">“{m.quote}”</p>

                      <div className="grid transition-[grid-template-rows] duration-500 ease-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                        <div className="overflow-hidden" id={`j-${m.id}`}>
                          <ul className="mt-4 space-y-2.5 pl-0 list-none text-[.95rem] text-navy/80">
                            {m.bullets.map((b) => (<li key={b} className="flex gap-2.5"><InkStar size={14} className="mt-1 shrink-0" fill="#F1D978" /><span>{b}</span></li>))}
                          </ul>
                          <div className="flex flex-wrap gap-2 mt-4 pb-1">{m.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                        </div>
                      </div>

                      <button type="button" className="mt-4 inline-flex items-center gap-1.5 note text-xl hover:text-navy" aria-expanded={isOpen} aria-controls={`j-${m.id}`} onClick={() => setOpen(isOpen ? null : m.id)}>
                        {isOpen ? 'close this page' : 'open this page'}
                        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </Paper>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
