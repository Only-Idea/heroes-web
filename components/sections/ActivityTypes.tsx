'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const activities = [
  { key: 'step', icon: '👟' },
  { key: 'running', icon: '🏃' },
  { key: 'walking', icon: '🚶' },
  { key: 'cycling', icon: '🚴' },
  { key: 'swimming', icon: '🏊' },
  { key: 'rowing', icon: '🚣' },
  { key: 'elliptical', icon: '⭕' },
  { key: 'skiing', icon: '⛷' },
  { key: 'wheelchair', icon: '♿' },
] as const;

export default function ActivityTypes() {
  const t = useTranslations('Activities');
  const sectionRef = useRef<HTMLElement>(null!);
  const ribbonRef = useRef<HTMLDivElement>(null!);
  const headerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const section = sectionRef.current;
    const ribbon = ribbonRef.current;
    const header = headerRef.current;
    if (!section || !ribbon || !header) return;

    const ctx = gsap.context(() => {
      // Header fade in
      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
        }
      );

      // Infinite horizontal scroll via GSAP
      const ribbonWidth = ribbon.scrollWidth / 2;
      gsap.to(ribbon, {
        x: -ribbonWidth,
        duration: 20,
        ease: 'none',
        repeat: -1,
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  // Double the items for seamless infinite scroll
  const doubledActivities = [...activities, ...activities];

  return (
    <section ref={sectionRef} aria-labelledby="activities-title" className="relative overflow-hidden bg-void py-20">
      {/* Section header */}
      <div ref={headerRef} className="mx-auto max-w-7xl px-6 pb-12 md:px-10" style={{ opacity: 0 }}>
        <p className="text-label text-coral">{t('label')}</p>
        <h2 id="activities-title" className="text-section text-ivory mt-4">{t('title')}</h2>
      </div>

      {/* Infinite ribbon */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-void to-transparent md:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-void to-transparent md:w-20" />

        <div ref={ribbonRef} className="flex w-max gap-6">
          {doubledActivities.map(({ key, icon }, i) => (
            <div
              key={`${key}-${i}`}
              className="flex flex-shrink-0 flex-col items-center gap-3 rounded-2xl border border-border bg-carbon px-6 py-5 transition-colors duration-300 hover:border-coral/40 md:px-8 md:py-6"
            >
              <span className="text-3xl" aria-hidden="true">
                {icon}
              </span>
              <span className="text-label text-stone whitespace-nowrap">{t(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
