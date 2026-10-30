import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Journey } from './components/Journey';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { DeskBag } from './components/DeskBag';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SvgDefs } from './components/Doodles';
import { StarCursor } from './components/StarCursor';
import { useParallax, usePrefersReducedMotion, useRevealObserver } from './hooks';

export default function App() {
  const reduced = usePrefersReducedMotion();
  useRevealObserver();
  useParallax(reduced);
  return (
    <>
      <SvgDefs />
      <div className="night-sky" aria-hidden="true" />
      <StarCursor />
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-navy focus:text-white focus:px-4 focus:py-2 focus:rounded-full">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Journey />
        <Projects />
        <Skills />
        <DeskBag />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
