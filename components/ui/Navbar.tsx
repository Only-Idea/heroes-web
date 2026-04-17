'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const navLinks = ['challenges', 'features', 'impact', 'contact'] as const;

export default function Navbar() {
  const t = useTranslations('Nav');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-colors duration-500 md:px-10 ${
        scrolled ? 'bg-slate/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <a href="#top" className="font-display text-lg font-bold text-ivory">
        {t('logo')}
      </a>

      {/* Desktop nav links */}
      <ul className="hidden items-center gap-8 md:flex">
        {navLinks.map((key) => (
          <li key={key}>
            <a
              href={`#${key}`}
              className="text-nav text-stone opacity-70 transition-opacity duration-300 hover:opacity-100"
            >
              {t(key)}
            </a>
          </li>
        ))}
      </ul>

      {/* Download CTA */}
      <a
        href="#download"
        className="hidden rounded-pill border border-coral/60 px-5 py-2 text-btn text-ivory transition-colors duration-300 hover:border-coral md:inline-flex"
      >
        {t('download')}
      </a>

      {/* Mobile hamburger */}
      <button
        className="flex flex-col gap-1.5 md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span
          className={`block h-0.5 w-6 bg-ivory transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
        />
        <span
          className={`block h-0.5 w-6 bg-ivory transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`block h-0.5 w-6 bg-ivory transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
        />
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 top-0 left-0 z-40 flex flex-col items-center justify-center gap-8 bg-void/95 backdrop-blur-xl md:hidden">
          {navLinks.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-section text-ivory"
              onClick={() => setMenuOpen(false)}
            >
              {t(key)}
            </a>
          ))}
          <a href="#download" className="btn-primary mt-4" onClick={() => setMenuOpen(false)}>
            {t('download')}
          </a>
        </div>
      )}
    </nav>
  );
}
