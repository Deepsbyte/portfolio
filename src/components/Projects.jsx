import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Maximize2, X } from 'lucide-react';
import { PROJECTS, PROFILE } from '../data/content';
import { SectionHead, Paper, Tape, StarPatch, InkStar, HandArrow, GithubIcon } from './Doodles';

/* Hand-drawn sketches of each project's idea (NOT screenshots — none exist yet). */
const ink = { stroke: '#233B68', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
const Art = ({ kind }) => {
  if (kind === 'kanban') return (
    <svg viewBox="0 0 400 280" fill="none" className="w-full h-auto rounded-xl" style={{ background: '#FFFDF8' }} role="img" aria-label="Sketch of a Kanban board with three columns and a chart">
      {[0, 1, 2].map((c) => (
        <g key={c} className={`layer l${c + 1}`}>
          <rect x={14 + c * 128} y="16" width="116" height="170" rx="10" fill={['#E6EDF2', '#F8EDB8', '#E9B9C9'][c]} {...ink} />
          <text x={26 + c * 128} y="40" fontFamily="Caveat" fontSize="20" fill="#233B68">{['to do', 'in progress', 'done'][c]}</text>
          {[0, 1].slice(0, c === 1 ? 2 : c === 0 ? 2 : 1).map((r) => <g key={r}><rect x={24 + c * 128} y={54 + r * 52} width="96" height="40" rx="6" fill="#FFFDF8" {...ink} /><path d={`M32 ${68 + r * 52} h50 M32 ${80 + r * 52} h32`} {...ink} strokeWidth="1.6" /></g>)}
        </g>
      ))}
      <g className="layer l2"><rect x="150" y="82" width="96" height="40" rx="6" fill="#B8D2E8" {...ink} transform="rotate(-6 198 102)" /></g>
      <g className="layer l3">{[0, 1, 2, 3, 4].map((i) => <rect key={i} x={30 + i * 26} y={250 - [20, 34, 26, 44, 38][i]} width="16" height={[20, 34, 26, 44, 38][i]} fill="#426D9D" {...ink} strokeWidth="1.6" />)}<text x="190" y="248" fontFamily="Caveat" fontSize="20" fill="#233B68">analytics</text></g>
    </svg>
  );
  if (kind === 'ats') return (
    <svg viewBox="0 0 400 280" fill="none" className="w-full h-auto rounded-xl" style={{ background: '#FFFDF8' }} role="img" aria-label="Sketch of a resume sheet beside an ATS score ring">
      <g className="layer l1"><rect x="24" y="20" width="170" height="236" rx="8" fill="#FFFDF8" {...ink} /><path d="M44 52 h70 M44 76 h120 M44 92 h100 M44 108 h112 M44 140 h60 M44 160 h120 M44 176 h90 M44 192 h110" {...ink} strokeWidth="1.8" /><rect x="40" y="132" width="130" height="12" fill="#F1D978" opacity=".7" /></g>
      <g className="layer l2"><circle cx="292" cy="96" r="52" {...ink} stroke="#B8D2E8" strokeWidth="14" /><path d="M292 44 A52 52 0 1 1 245 118" {...ink} stroke="#426D9D" strokeWidth="14" /><text x="266" y="104" fontFamily="Caveat" fontSize="26" fill="#233B68">ATS</text></g>
      <g className="layer l3">{[0, 1, 2].map((i) => <g key={i}><path d={`M232 ${186 + i * 24} h${[110, 80, 94][i]}`} stroke="#E9B9C9" strokeWidth="9" strokeLinecap="round" /></g>)}<text x="232" y="176" fontFamily="Caveat" fontSize="18" fill="#233B68">role match</text></g>
    </svg>
  );
  if (kind === 'suite') return (
    <svg viewBox="0 0 400 280" fill="none" className="w-full h-auto rounded-xl" style={{ background: '#FFFDF8' }} role="img" aria-label="Sketch of four small apps: calculator, to-do list, login and tribute page">
      {[[24, 20, 'calc'], [208, 20, 'todo'], [24, 148, 'login'], [208, 148, 'tribute']].map(([x, y, k], i) => (
        <g key={k} className={`layer l${(i % 3) + 1}`}><rect x={x} y={y} width="168" height="112" rx="10" fill={['#E6EDF2', '#FFFDF8', '#B8D2E8', '#F8EDB8'][i]} {...ink} />
          {k === 'calc' && <><rect x={x + 14} y={y + 12} width="140" height="22" rx="4" fill="#FFFDF8" {...ink} strokeWidth="1.6" />{[0, 1, 2, 3].map((c) => [0, 1].map((r) => <circle key={c + '-' + r} cx={x + 30 + c * 36} cy={y + 56 + r * 30} r="9" fill="#426D9D" {...ink} strokeWidth="1.4" />))}</>}
          {k === 'todo' && [0, 1, 2].map((r) => <g key={r}><rect x={x + 16} y={y + 18 + r * 30} width="16" height="16" rx="3" {...ink} strokeWidth="1.6" fill={r === 0 ? '#F1D978' : 'none'} /><path d={`M${x + 42} ${y + 27 + r * 30} h${[90, 70, 80][r]}`} {...ink} strokeWidth="1.6" /></g>)}
          {k === 'login' && <><rect x={x + 22} y={y + 18} width="124" height="22" rx="4" fill="#FFFDF8" {...ink} strokeWidth="1.6" /><rect x={x + 22} y={y + 50} width="124" height="22" rx="4" fill="#FFFDF8" {...ink} strokeWidth="1.6" /><rect x={x + 50} y={y + 82} width="68" height="20" rx="10" fill="#233B68" /></>}
          {k === 'tribute' && <><path d={`M${x + 84} ${y + 86} c-34 -22 -34 -48 -12 -48 c10 0 12 8 12 12 c0 -4 2 -12 12 -12 c22 0 22 26 -12 48z`} fill="#E9B9C9" {...ink} /><path d={`M${x + 24} ${y + 100} h120`} {...ink} strokeWidth="1.6" /></>}
        </g>
      ))}
    </svg>
  );
  return (
    <svg viewBox="0 0 400 280" fill="none" className="w-full h-auto rounded-xl" style={{ background: '#FFFDF8' }} role="img" aria-label="Sketch of an idea flowing through an API to a database and the cloud">
      <g className="layer l1"><rect x="20" y="104" width="92" height="64" rx="10" fill="#F8EDB8" {...ink} /><text x="38" y="143" fontFamily="Caveat" fontSize="24" fill="#233B68">idea</text></g>
      <g className="layer l2"><rect x="154" y="104" width="92" height="64" rx="10" fill="#B8D2E8" {...ink} /><text x="176" y="143" fontFamily="Caveat" fontSize="24" fill="#233B68">API</text></g>
      <g className="layer l3"><ellipse cx="322" cy="64" rx="48" ry="16" fill="#E6EDF2" {...ink} /><path d="M274 64 v44 c0 9 22 16 48 16 s48 -7 48 -16 v-44" fill="#E6EDF2" {...ink} /><path d="M300 210 c-30 0 -34 -34 -6 -36 c2 -26 44 -26 48 -2 c32 -2 34 38 -2 38z" fill="#FFFDF8" {...ink} /><text x="304" y="204" fontFamily="Caveat" fontSize="20" fill="#233B68">cloud</text></g>
      <path d="M112 136 h42 M246 128 C262 110 262 96 274 90 M246 148 C262 168 262 180 284 190" {...ink} strokeDasharray="5 5" />
    </svg>
  );
};

const host = (u) => { try { return new URL(u).host; } catch { return ''; } };

/* Screenshot dressed as a printed photo: denim photo-corners, window bar, tape */
const Shot = ({ p, onOpen }) => (
  <button type="button" onClick={() => onOpen(p)} className="group relative block w-full text-left p-3" aria-label={`Open full-size screenshot of ${p.title}`}>
    <div className="relative overflow-hidden rounded-[6px] border-[3px] border-white shadow-[0_2px_10px_rgba(35,59,104,.25)] bg-[#0f1117]">
      <div className="denim flex items-center gap-1.5 px-3 h-7">
        <span className="w-2 h-2 rounded-full bg-butter" /><span className="w-2 h-2 rounded-full bg-blush" /><span className="w-2 h-2 rounded-full bg-powder" />
        <span className="ml-2 font-mono text-[10px] text-white/85 truncate">{host(p.demo) || p.title}</span>
      </div>
      <img src={p.shot.src} alt={p.shot.alt} width={p.shot.w} height={p.shot.h} loading="lazy" className="block w-full h-auto transition-transform duration-[900ms] ease-out group-hover:scale-[1.05] origin-top-left" />
      <span className="absolute right-2 bottom-2 grid place-items-center w-8 h-8 rounded-full bg-ivory/90 text-navy opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" aria-hidden="true"><Maximize2 size={15} /></span>
    </div>
    {[['top-0 left-0', 0], ['top-0 right-0', 90], ['bottom-0 right-0', 180], ['bottom-0 left-0', 270]].map(([pos, r]) => (
      <span key={pos} className={`absolute ${pos} w-7 h-7 denim`} style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)', transform: `rotate(${r}deg)`, filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,.25))' }} aria-hidden="true" />
    ))}
  </button>
);

const Lightbox = ({ p, onClose }) => {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (p && d && !d.open) d.showModal();
    if (!p && d && d.open) d.close();
  }, [p]);
  return (
    <dialog ref={ref} onClose={onClose} onClick={(e) => { if (e.target === ref.current) ref.current.close(); }} className="p-0 bg-transparent w-[min(96vw,1280px)] max-w-none max-h-[94vh] backdrop:bg-navy/70 backdrop:backdrop-blur-sm" aria-label={p ? `${p.title} screenshot` : undefined}>
      {p && (
        <figure className="m-0 bg-paper p-3 sm:p-5 rounded-md shadow-2xl relative overflow-auto max-h-[94vh]">
          <button type="button" onClick={() => ref.current.close()} className="sticky float-right top-0 z-10 grid place-items-center w-10 h-10 rounded-full bg-navy text-ivory hover:bg-denim transition" aria-label="Close screenshot"><X size={18} /></button>
          <img src={p.shot.src} alt={p.shot.alt} className="block w-full h-auto rounded border-[3px] border-white shadow" />
          <figcaption className="note text-2xl mt-3 text-center">{p.title} · screenshot from the live demo</figcaption>
        </figure>
      )}
    </dialog>
  );
};

export const Projects = () => {
  const [open, setOpen] = useState(null);
  return (
  <>
  <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
    <div className="absolute inset-0 dots dots-fade opacity-50 pointer-events-none" aria-hidden="true" />
    <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHead no="03" kicker="engineering case studies" title="Things I’ve built, taken apart and put back together" intro="Four write-ups with the problem, the stack, and what’s actually inside. Screenshots come from the live demos; the hand-drawn sketches are ideas for the projects that don’t have one yet." star="denim" />

      <div className="space-y-24 md:space-y-32">
        {PROJECTS.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={p.id} className="grid md:grid-cols-12 gap-8 md:gap-12 items-center" aria-labelledby={`p-${p.id}`}>
              <div className={`md:col-span-6 ${flip ? 'md:order-2' : ''} relative`}>
                <Paper seed={i + 21} rot={flip ? 1.6 : -1.6} amp={1} wrapClass="rv-paper proj-art" style={{ '--rot': flip ? '1.6deg' : '-1.6deg' }} className="relative p-5 sm:p-7 stitch">
                  <Tape className="left-10 -top-1" rotate={-5} color={p.tape} />
                  <Tape className="right-10 -top-1" rotate={4} />
                  {p.shot ? <Shot p={p} onOpen={setOpen} /> : <Art kind={p.art} />}
                  <p className="note text-lg text-right mt-1">{p.shot ? 'screenshot from the live demo · tap to enlarge' : `hand-drawn sketch · ${p.title.toLowerCase()}`}</p>
                </Paper>
                <StarPatch size={44} variant={['denim', 'butter', 'navy', 'pink'][i]} rotate={i * 20 - 10} className={`absolute -bottom-5 ${flip ? '-right-3' : '-left-3'} lift`} />
              </div>

              <div className={`md:col-span-6 ${flip ? 'md:order-1' : ''}`}>
                <div className="flex items-center gap-3 rv">
                  <span className="font-display font-bold text-5xl text-powder leading-none">{p.n}</span>
                  <span className="chip bg-butter/60 border-solid border-navy/40">{p.badge}</span>
                </div>
                <h3 id={`p-${p.id}`} className="font-display font-semibold text-3xl sm:text-4xl leading-tight mt-3 rv" style={{ '--d': 60 }}>{p.title}</h3>
                <p className="note text-2xl mt-1 rv" style={{ '--d': 100 }}>{p.subtitle}</p>
                <p className="mt-4 text-navy/80 leading-relaxed rv" style={{ '--d': 140 }}>{p.summary}</p>

                <div className="rv mt-5 flex gap-3 items-start" style={{ '--d': 180 }}>
                  <HandArrow variant="curlDown" width={42} className="shrink-0 mt-1" />
                  <p><span className="label block mb-0.5">the problem it addresses</span><span className="text-navy/85">{p.solves}</span></p>
                </div>

                {p.role && <p className="rv mt-4 text-[.95rem]" style={{ '--d': 200 }}><span className="label mr-2">my role</span><span className="marker-wrap">{p.role}</span></p>}

                <h4 className="label mt-6 mb-2 rv">what’s inside</h4>
                <ul className="list-none p-0 grid gap-2 text-[.95rem] rv" style={{ '--d': 220 }}>
                  {p.features.map((f) => (<li key={f} className="flex gap-2.5"><InkStar size={14} className="mt-1 shrink-0" fill="#B8D2E8" /><span>{f}</span></li>))}
                </ul>

                <h4 className="label mt-6 mb-2 rv">stack</h4>
                <div className="flex flex-wrap gap-2 rv" style={{ '--d': 260 }}>{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>

                <div className="flex flex-wrap gap-3 mt-6 rv" style={{ '--d': 300 }}>
                  {p.repo && <a className="btn btn-paper" href={p.repo} target="_blank" rel="noopener noreferrer"><GithubIcon width={16} height={16} /> Code</a>}
                  {p.demo && <a className="btn btn-solid" href={p.demo} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} /> Live demo</a>}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-24 text-center rv">
        <p className="note text-2xl mb-3">there’s more in the attic ↓</p>
        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-paper"><GithubIcon width={17} height={17} /> Browse everything on GitHub</a>
      </div>
    </div>
  </section>
  <Lightbox p={open} onClose={() => setOpen(null)} />
  </>
  );
};
