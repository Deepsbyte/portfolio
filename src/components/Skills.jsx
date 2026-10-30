import React, { useMemo, useState } from 'react';
import { SKILLS, PROJECTS } from '../data/content';
import { SectionHead, Paper, Tape, StarPatch, HandArrow, STAR_PATH, FILL_ID, EDGE_COL } from './Doodles';

const SHORT = { taskflow: 'TaskFlow', careeriq: 'CareerIQ', 'oasis-suite': 'Web Dev Suite', 'cloud-lab': 'Cloud & AI' };
const MAPLABEL = { 'Django REST Framework': 'DRF', 'JavaScript (ES6+)': 'JavaScript', 'Responsive UI/UX': 'Responsive UI', 'REST API design': 'REST APIs', 'Cloud fundamentals': 'Cloud', 'System design': 'System design', 'JWT auth': 'JWT' };
const TONE = { denim: 'denim', butter: 'butter', navy: 'navy', pink: 'pink', gingham: 'gingham' };
const patch = { denim: 'denim text-white', butter: 'bg-butter text-navy', navy: 'bg-[#233B68] text-white', pink: 'bg-blush text-navy', gingham: 'gingham text-navy' };
const TONE_FILL = { denim: '#426D9D', butter: '#F1D978', navy: '#233B68', pink: '#E9B9C9', gingham: '#B8D2E8' };

const projectsFor = (use) => (use.length ? PROJECTS.filter((p) => p.stack.some((s) => use.some((u) => s.toLowerCase().includes(u.toLowerCase())))).map((p) => p.id) : []);

// ── star map geometry ──
const W = 1000, H = 470, PY = 235;
const PX = [140, 380, 620, 860];

export const Skills = () => {
  const [pin, setPin] = useState(null);     // {kind,id} chosen by click/tap
  const [hover, setHover] = useState(null); // {kind,id} transient
  const active = hover || pin;

  const { nodes, links } = useMemo(() => {
    const flat = SKILLS.flatMap((g) => g.items.map((it) => ({ key: g.id + it.n, name: it.n, tone: g.tone, projects: projectsFor(it.use) })));
    const linked = flat.filter((s) => s.projects.length);
    const idx = (id) => PROJECTS.findIndex((p) => p.id === id);
    linked.forEach((s) => { s.mean = s.projects.reduce((a, id) => a + idx(id), 0) / s.projects.length; });
    linked.sort((a, b) => a.mean - b.mean || a.name.localeCompare(b.name));
    const n = linked.length, step = (W - 120) / Math.max(1, Math.ceil(n / 2) - 1);
    const out = linked.map((s, i) => {
      const top = i % 2 === 0, col = Math.floor(i / 2);
      return { ...s, x: 60 + col * step, y: top ? 70 + (col % 2) * 34 : H - 70 - (col % 2) * 34, top };
    });
    return { nodes: out, links: out.flatMap((s) => s.projects.map((id) => ({ s, id }))) };
  }, []);

  const skillOn = (s) => !active || (active.kind === 'skill' ? active.id === s.key : s.projects.includes(active.id));
  const projOn = (id) => !active || (active.kind === 'project' ? active.id === id : (nodes.find((n) => n.key === active.id) || { projects: [] }).projects.includes(id));
  const linkOn = (l) => !active || (active.kind === 'skill' ? active.id === l.s.key : active.id === l.id);

  const toggle = (kind, id) => setPin((p) => (p && p.kind === kind && p.id === id ? null : { kind, id }));
  const hot = (kind, id) => ({ onMouseEnter: () => setHover({ kind, id }), onMouseLeave: () => setHover(null) });

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead no="04" kicker="the toolbox" title="Sewn together from real projects" intro="Every patch is something I’ve actually used. Pick a project to see which skills it needed, or hover a star on the map." star="gingham" />

        {/* see-by-project filter (works everywhere, including touch) */}
        <div className="rv flex flex-wrap items-center gap-2 mb-8" role="group" aria-label="Highlight skills by project">
          <span className="note text-xl mr-1">see it by project:</span>
          {PROJECTS.map((p) => {
            const on = pin && pin.kind === 'project' && pin.id === p.id;
            return (
              <button key={p.id} type="button" aria-pressed={on} onClick={() => toggle('project', p.id)} {...hot('project', p.id)} onFocus={() => setHover({ kind: 'project', id: p.id })} onBlur={() => setHover(null)}
                className={`chip transition-all hover:-translate-y-0.5 ${on ? '!bg-butter !border-solid !border-navy/50 font-medium' : ''}`}>
                {SHORT[p.id]}
              </button>
            );
          })}
          {pin && <button type="button" onClick={() => setPin(null)} className="note text-lg underline decoration-dashed underline-offset-4 ml-1">clear</button>}
        </div>

        {/* constellation of skills ↔ projects */}
        <div className="hidden lg:block rv mb-16" aria-hidden="true">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible select-none">
            {links.map((l, i) => {
              const px = PX[PROJECTS.findIndex((p) => p.id === l.id)], my = (l.s.y + PY) / 2, on = linkOn(l), lit = !!active && on;
              return <path key={i} d={`M${l.s.x} ${l.s.y} C${l.s.x} ${my} ${px} ${my} ${px} ${PY}`} fill="none" strokeLinecap="round" className={lit ? 'map-flow' : ''}
                style={{ stroke: 'var(--denim)', strokeWidth: lit ? 2 : 1.1, opacity: lit ? 1 : active ? 0.06 : 0.26, strokeDasharray: lit ? '5 5' : undefined, transition: 'opacity .35s, stroke-width .35s' }} />;
            })}
            {nodes.map((s) => {
              const on = skillOn(s);
              return (
                <g key={s.key} {...hot('skill', s.key)} onClick={() => toggle('skill', s.key)} style={{ cursor: 'pointer', opacity: on ? 1 : 0.22, transition: 'opacity .35s' }}>
                  <circle cx={s.x} cy={s.y} r="22" fill="transparent" />
                  <g transform={`translate(${s.x - 11} ${s.y - 11}) scale(.22)`} style={{ transition: 'transform .3s' }}>
                    <path d={STAR_PATH} fill="#fff" stroke="#fff" strokeWidth="14" strokeLinejoin="round" />
                    <path d={STAR_PATH} fill={TONE_FILL[s.tone]} stroke={TONE_FILL[s.tone]} strokeWidth="6" strokeLinejoin="round" />
                  </g>
                  <text x={s.x} y={s.top ? s.y - 20 : s.y + 31} textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="12.5" fontWeight={on && active ? 600 : 400} style={{ fill: 'var(--navy)' }}>{MAPLABEL[s.name] || s.name}</text>
                </g>
              );
            })}
            {PROJECTS.map((p, i) => {
              const on = projOn(p.id), v = ['denim', 'butter', 'navy', 'pink'][i];
              return (
                <g key={p.id} {...hot('project', p.id)} onClick={() => toggle('project', p.id)} style={{ cursor: 'pointer', opacity: on ? 1 : 0.3, transition: 'opacity .35s' }}>
                  <circle cx={PX[i]} cy={PY} r="48" fill="transparent" />
                  <g transform={`translate(${PX[i] - 36} ${PY - 38}) scale(.72)`}>
                    <path d={STAR_PATH} fill="#fff" stroke="#fff" strokeWidth="11" strokeLinejoin="round" />
                    <path d={STAR_PATH} fill={`url(#${FILL_ID[v]})`} stroke={EDGE_COL[v]} strokeWidth="6" strokeLinejoin="round" />
                  </g>
                  <text x={PX[i]} y={PY + 62} textAnchor="middle" fontFamily="Caveat, cursive" fontSize="25" fontWeight="600" style={{ fill: 'var(--navy)' }}>{SHORT[p.id]}</text>
                </g>
              );
            })}
          </svg>
          <p className="note text-xl text-center -mt-2">a little star map · hover or tap a star</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-14">
          {SKILLS.map((g, gi) => (
            <Paper key={g.id} seed={gi + 40} rot={[-1.2, 1, -.6, 1.3, -1][gi]} amp={.9} wrapClass={`rv-paper ${gi < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`} style={{ '--rot': `${[-1.2, 1, -.6, 1.3, -1][gi]}deg`, '--d': gi * 80 }} className="relative p-6 pt-8 stitch h-full">
              <Tape className="left-1/2 -translate-x-1/2 -top-1" rotate={gi % 2 ? 3 : -3} color={gi % 2 ? 'butter' : ''} />
              <div className="flex items-start justify-between gap-3">
                <div><h3 className="font-display font-semibold text-2xl">{g.title}</h3><p className="note text-xl">{g.note}</p></div>
                <StarPatch size={36} variant={TONE[g.tone]} rotate={gi * 25} className="shrink-0" />
              </div>
              <ul className="list-none p-0 mt-5 flex flex-wrap gap-2.5">
                {g.items.map((it, ii) => {
                  const key = g.id + it.n, ids = projectsFor(it.use), where = ids.map((id) => SHORT[id]);
                  const tipOn = pin && pin.kind === 'skill' && pin.id === key;
                  const lit = !active ? true : active.kind === 'skill' ? active.id === key : ids.includes(active.id);
                  return (
                    <li key={it.n} className="relative">
                      <button type="button" onClick={() => toggle('skill', key)} onMouseEnter={() => setHover({ kind: 'skill', id: key })} onMouseLeave={() => setHover(null)} onFocus={() => setHover({ kind: 'skill', id: key })} onBlur={() => setHover(null)} aria-pressed={tipOn} aria-describedby={`d-${key.replace(/\W/g, '')}`}
                        className={`group peer relative rounded-lg px-3 py-1.5 text-sm font-medium border-2 border-white/70 shadow-[0_0_0_1.5px_rgba(35,59,104,.35)_inset,1px_3px_4px_rgba(35,59,104,.18)] transition-all duration-300 hover:-translate-y-1 hover:rotate-[-2deg] focus-visible:-translate-y-1 ${patch[g.tone]} ${lit ? '' : 'opacity-25 saturate-50'}`}
                        style={{ outline: '1.5px dashed rgba(255,255,255,.6)', outlineOffset: '-5px', rotate: `${((ii * 7) % 5) - 2}deg` }}>
                        {it.n}
                      </button>
                      <span id={`d-${key.replace(/\W/g, '')}`} role="tooltip" className={`pointer-events-none absolute z-20 left-1/2 -translate-x-1/2 bottom-[calc(100%+6px)] whitespace-nowrap bg-paper note text-lg text-navy px-3 py-1 rounded shadow-lg outline outline-1 outline-dashed outline-navy/30 transition-all duration-200 ${tipOn ? 'opacity-100' : 'opacity-0 peer-hover:opacity-100 peer-focus-visible:opacity-100'}`}>
                        {where.length ? `used in ${where.join(' · ')}` : 'part of my coursework & foundations'}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Paper>
          ))}
        </div>
        <div className="hidden md:flex justify-end mt-6 rv"><span className="note text-xl flex items-center gap-2">no percentages — just things I’ve built with <HandArrow variant="curlRight" width={50} /></span></div>
      </div>
    </section>
  );
};
