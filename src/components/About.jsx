import React from 'react';
import { PROFILE } from '../data/content';
import { SectionHead, HandArrow, Sparkle, TornEdge } from './Doodles';
import { BuilderPass } from './BuilderPass';

const EDU = [
  { y: '2023 – 2027', s: 'K S School of Engineering and Management', d: 'B.E. Computer Science & Engineering', r: 'CGPA 8.95' },
  { y: '2023', s: 'RV PU College, Bengaluru', d: 'Pre-University, Science (PCMB)', r: '89.66%' },
  { y: '2021', s: "St. Paul's English School, Bengaluru", d: 'ICSE Board', r: '91.17%' },
];

export const About = () => (
  <section id="about" className="relative py-24 md:py-32 overflow-hidden">
    <div className="absolute inset-0 dots dots-fade opacity-60 pointer-events-none" aria-hidden="true" />
    <TornEdge seed={5} color="var(--powder)" className="absolute inset-x-0 top-0 h-9 z-[1]" amp={70} />
    <TornEdge seed={12} color="var(--ivory)" className="absolute inset-x-0 top-3 h-12 z-[2]" amp={55} />
    <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHead no="01" kicker="journal page · about me" title="The person behind the pull requests" star="butter" />

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-24 -mt-6 lg:-mt-14 rv" style={{ '--d': 100 }}>
          <BuilderPass />
        </div>

        <div className="lg:col-span-8 space-y-7">
          <p className="rv font-display text-2xl sm:text-3xl lg:text-[2.2rem] leading-[1.22] font-medium max-w-3xl">
            A pre-final year CSE student obsessed with{' '}
            <span className="marker-wrap italic">making full-stack systems and intuitive interfaces click</span>.
          </p>
          <div className="rv relative pl-5 border-l-[3px] border-powder space-y-4 text-base sm:text-lg text-navy/80 leading-relaxed max-w-2xl" style={{ '--d': 100 }}>
            <p>From architecting 15+ REST endpoints with Django REST Framework, JWT authentication, and normalised PostgreSQL schemas, to drag-and-drop Kanban boards with DnD Kit and Chart.js dashboards — I love taking an idea from a blank canvas to something deployed.</p>
            <p>When I'm not chasing asynchronous state bugs or tuning API latency, I'm driving outreach for the IEEE Student Branch, teaming up at hackathons like HIRE-4-THON, or learning more about cloud architecture.</p>
          </div>
          <div className="rv flex items-center gap-3" style={{ '--d': 150 }}>
            <HandArrow variant="curlRight" width={70} flip />
            <p className="note text-2xl rotate-[-2deg]">“Always building something. Always curious about what’s next.”</p>
          </div>

          <div className="rv pt-2" style={{ '--d': 200 }}>
            <h3 className="label mb-3 flex items-center gap-2"><Sparkle size={14} /> education, at a glance</h3>
            <ol className="list-none p-0 m-0 divide-y-2 divide-dashed divide-navy/15 border-y-2 border-dashed border-navy/15">
              {EDU.map((e) => (
                <li key={e.s} className="grid grid-cols-[4.6rem_1fr_auto] gap-x-3 items-baseline py-3 group">
                  <span className="font-mono text-xs text-denim">{e.y}</span>
                  <span><span className="font-semibold block">{e.s}</span><span className="text-navy/60 text-sm">{e.d}</span></span>
                  <span className="font-mono text-sm font-medium bg-butter/70 px-2 py-0.5 rounded group-hover:-rotate-2 transition-transform">{e.r}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
);
