import React, { useEffect, useState } from 'react';
import { FileDown, Menu, X, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { NAV, PROFILE } from '../data/content';
import { useActiveSection, useTheme } from '../hooks';
import { StarPatch } from './Doodles';
import { sounds } from '../utils/sound';

const IDS = ['hero', ...NAV.map((n) => n.id)];

export const Navbar = () => {
  const active = useActiveSection(IDS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sound, setSound] = useState(false);
  const [night, toggleNight] = useTheme();

  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  const toggleSound = () => { sounds.enabled = !sound; setSound(!sound); if (!sound) sounds.playPop(); };
  sounds.enabled = sound;

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 pt-3 pointer-events-none">
      <nav aria-label="Primary" className={`nav-pill pointer-events-auto relative w-full max-w-5xl flex items-center justify-between rounded-full border-2 border-navy bg-ivory/95 backdrop-blur-sm ${scrolled ? 'py-1.5 px-3 shadow-[3px_4px_0_var(--powder)]' : 'py-2.5 px-4 shadow-[4px_5px_0_var(--powder)]'}`}>
        <a href="#hero" className="flex items-center gap-2 font-display font-semibold text-lg sm:text-xl" aria-label="Deepthi.cosmo — back to top">
          <StarPatch size={28} variant="denim" rotate={-12} />
          <span>Deepthi<span className="text-denim">.cosmo</span></span>
        </a>

        <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
          {NAV.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className="nav-link relative z-0 block" aria-current={active === n.id ? 'true' : undefined}>
                <span className="hl" />{n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleNight} aria-pressed={night} aria-label={night ? 'Lights on: switch to the day scrapbook' : 'Lights off, stars on: switch to the night sky'} title={night ? 'lights on' : 'lights off, stars on'} className="grid place-items-center w-9 h-9 rounded-full text-navy/70 hover:text-navy hover:bg-powder/40 transition">
            {night ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button type="button" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? 'Mute click sounds' : 'Turn on click sounds'} className="hidden sm:grid place-items-center w-9 h-9 rounded-full text-navy/60 hover:text-navy hover:bg-mist transition">
            {sound ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>
          <a href={PROFILE.resume} download="Deepthi_Kumar_Resume.pdf" className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-navy text-ivory text-sm font-semibold px-4 py-2 hover:bg-denim transition">
            <FileDown size={15} /> Resume
          </a>
          <button type="button" className="lg:hidden grid place-items-center w-10 h-10 rounded-full border-2 border-navy" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* scroll progress: dashed thread with a travelling star */}
        <div className="absolute left-8 right-8 -bottom-[7px] h-3 pointer-events-none hidden sm:block" aria-hidden="true">
          <div className="absolute top-1/2 inset-x-0 border-t-2 border-dashed border-denim/30" />
          <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: `${progress * 100}%` }}>
            <StarPatch size={16} variant="butter" />
          </span>
        </div>

        {open && (
          <div id="mobile-menu" className="lg:hidden absolute top-[calc(100%+12px)] inset-x-0 rounded-3xl border-2 border-navy bg-ivory p-3 shadow-[4px_5px_0_var(--powder)]">
            <ul className="list-none m-0 p-0 grid gap-1">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className={`flex items-center justify-between rounded-2xl px-4 py-3 font-medium ${active === n.id ? 'bg-butter text-[#233B68]' : 'hover:bg-mist'}`}>
                    {n.label}<span className="note text-lg">{active === n.id ? 'you are here ✦' : ''}</span>
                  </a>
                </li>
              ))}
              <li><a href={PROFILE.resume} download="Deepthi_Kumar_Resume.pdf" className="flex items-center gap-2 rounded-2xl bg-navy text-ivory px-4 py-3 font-semibold"><FileDown size={16} /> Download resume</a></li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};
