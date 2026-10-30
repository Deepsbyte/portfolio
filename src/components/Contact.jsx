import React, { useState } from 'react';
import { Check, Copy, FileDown, Mail, Phone } from 'lucide-react';
import { PROFILE } from '../data/content';
import { ResumeEnvelope } from './ResumeEnvelope';
import { SectionHead, Paper, Tape, StarPatch, HandArrow, GithubIcon, LinkedinIcon, TornEdge } from './Doodles';

export const Contact = () => {
  const [f, setF] = useState({ name: '', from: '', msg: '' });
  const [copied, setCopied] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`Hello from ${f.name || 'a visitor'} (via Deepthi.cosmo)`)}&body=${encodeURIComponent(`${f.msg}\n\n— ${f.name}${f.from ? ` (${f.from})` : ''}`)}`;
  const copy = async (what, text) => {
    try { await navigator.clipboard.writeText(text); setCopied(what); setTimeout(() => setCopied(''), 1800); } catch { setCopied(''); }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-mist/60 overflow-hidden">
      <div className="absolute inset-0 dots opacity-50 pointer-events-none" aria-hidden="true" />
      <TornEdge flip seed={31} color="var(--ivory)" className="absolute inset-x-0 top-0 h-9 z-[2]" amp={70} />
      <TornEdge seed={32} color="var(--ivory)" className="absolute inset-x-0 bottom-0 h-9 z-[2]" amp={70} />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead no="05" kicker="the last page · post letter" title="Write me a letter" intro="I’m looking for software engineering internships and full-stack roles, and I’m available immediately. If something here caught your eye, I’d love to hear from you." star="pink" />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* the letter */}
          <div className="lg:col-span-7 relative">
            <Paper seed={91} rot={-1} amp={1} wrapClass="rv-paper" style={{ '--rot': '-1deg' }} className="relative px-6 sm:px-10 pt-10 pb-8 letter-line stitch">
              <Tape className="left-12 -top-1" rotate={-4} color="butter" />
              <StarPatch size={52} variant="gingham" rotate={8} className="absolute right-4 top-4" />
              <p className="hidden sm:block absolute right-[5.4rem] top-12 font-mono text-[10px] tracking-widest text-navy/40 rotate-[-8deg] border-2 border-navy/25 rounded-full px-2 py-0.5" aria-hidden="true">BENGALURU · IN</p>
              <p className="note text-3xl">Dear Deepthi,</p>
              <div className="mt-5 grid gap-4">
                <label className="block"><span className="label">my name</span><input className="field" value={f.name} onChange={set('name')} placeholder="your name" autoComplete="name" /></label>
                <label className="block"><span className="label">where you can reach me back</span><input className="field" type="email" value={f.from} onChange={set('from')} placeholder="you@company.com" autoComplete="email" /></label>
                <label className="block"><span className="label">my message</span><textarea className="field resize-none" rows={5} value={f.msg} onChange={set('msg')} placeholder="write something kind…" /></label>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a href={href} className="btn btn-solid"><Mail size={16} /> Open in my email app</a>
                <p className="note text-lg max-w-[16rem] leading-tight">this opens your own mail app with the letter filled in — nothing is sent from this page.</p>
              </div>
              <p className="note text-2xl text-right mt-4">with love, you ✦</p>
            </Paper>
          </div>

          {/* direct links */}
          <div className="lg:col-span-5 space-y-8">
            <ResumeEnvelope />
            <p className="note text-2xl rv flex items-center gap-2"><HandArrow variant="curlDown" width={34} /> or reach me directly</p>
            {[
              { k: 'email', icon: <Mail size={18} />, label: 'Email', val: PROFILE.email, href: `mailto:${PROFILE.email}`, copy: PROFILE.email },
              { k: 'phone', icon: <Phone size={18} />, label: 'Phone', val: PROFILE.phone, href: PROFILE.phoneHref, copy: PROFILE.phone },
            ].map((r, i) => (
              <div key={r.k} className="rv flex items-center gap-3" style={{ '--d': i * 80 }}>
                <a href={r.href} className="flex-1 flex items-center gap-3 rounded-2xl bg-paper border-2 border-navy px-4 py-3 shadow-[3px_4px_0_var(--powder)] hover:-translate-y-0.5 hover:shadow-[4px_6px_0_var(--powder)] transition">
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-butter text-[#233B68]">{r.icon}</span>
                  <span className="min-w-0"><span className="label block">{r.label}</span><span className="font-medium break-all">{r.val}</span></span>
                </a>
                <button type="button" onClick={() => copy(r.k, r.copy)} className="grid place-items-center w-11 h-11 rounded-full border-2 border-navy bg-paper hover:bg-powder transition" aria-label={`Copy ${r.label.toLowerCase()}`}>
                  {copied === r.k ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            ))}
            <div className="rv flex flex-wrap gap-3 pt-2" style={{ '--d': 200 }}>
              <a className="btn btn-paper" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon width={16} height={16} /> LinkedIn</a>
              <a className="btn btn-paper" href={PROFILE.github} target="_blank" rel="noopener noreferrer"><GithubIcon width={16} height={16} /> GitHub</a>
              <a className="btn btn-solid" href={PROFILE.resume} download="Deepthi_Kumar_Resume.pdf"><FileDown size={16} /> Resume</a>
            </div>
            <p className="sr-only" role="status" aria-live="polite">{copied && `${copied} copied to clipboard`}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
