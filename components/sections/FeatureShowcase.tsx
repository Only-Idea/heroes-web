'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { key: 'map', icon: '🗺' },
  { key: 'tracking', icon: '📍' },
  { key: 'team', icon: '👥' },
  { key: 'achievements', icon: '🏆' },
  { key: 'streaks', icon: '🔥' },
  { key: 'feed', icon: '💬' },
] as const;

export default function FeatureShowcase() {
  const t = useTranslations('Features');
  const sectionRef = useRef<HTMLElement>(null!);
  const phoneRef = useRef<HTMLDivElement>(null!);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;
    if (!section || !phone) return;

    const ctx = gsap.context(() => {
      // Phone floats in from bottom
      gsap.fromTo(
        phone,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
        }
      );

      // Feature cards stagger in
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 50%',
              once: true,
            },
          }
        );
      });

      // SVG annotation lines draw in (desktop)
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 0.8,
          delay: 0.3 + i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            once: true,
          },
        });
      });
    }, section);

    // Cursor tilt on desktop
    const handleMouseMove = (e: MouseEvent) => {
      const rect = phone.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      phone.style.transform = `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg)`;
    };

    const handleMouseLeave = () => {
      phone.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    };

    const mql = window.matchMedia('(min-width: 768px)');
    if (mql.matches) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      ctx.revert();
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative min-h-screen bg-void px-6 py-20 md:px-10"
    >
      {/* Section header */}
      <div className="mx-auto max-w-7xl pb-12">
        <p className="text-label text-coral">{t('label')}</p>
        <h2 className="text-section text-ivory mt-4">{t('title')}</h2>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 md:flex-row md:gap-16">
        {/* Phone mockup */}
        <div
          ref={phoneRef}
          className="relative flex-shrink-0 transition-transform duration-200"
          style={{ opacity: 0 }}
        >
          <div className="phone-frame relative h-[420px] w-[200px] border border-border bg-carbon md:h-[520px] md:w-[250px]">
            <div className="phone-frame-inner absolute inset-2 overflow-hidden bg-void">
              {/* Placeholder screen content */}
              <div className="flex h-full flex-col items-center justify-center gap-3 p-4">
                <div className="h-32 w-full rounded-sm bg-teal/20" />
                <div className="h-3 w-3/4 rounded bg-stone/20" />
                <div className="h-3 w-1/2 rounded bg-stone/15" />
                <div className="mt-auto h-8 w-full rounded-pill bg-heroes-gradient opacity-40" />
              </div>
            </div>
          </div>

          {/* Desktop SVG annotation lines */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
            style={{ left: '100%', width: '120px', height: '100%' }}
          >
            {features.map((_, i) => {
              const startY = 80 + i * 70;
              const endY = startY;
              return (
                <line
                  key={i}
                  ref={(el) => {
                    linesRef.current[i] = el;
                  }}
                  x1="0"
                  y1={startY}
                  x2="100"
                  y2={endY}
                  stroke="var(--color-coral)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.5"
                />
              );
            })}
          </svg>
        </div>

        {/* Feature cards grid */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map(({ key, icon }, i) => (
            <div
              key={key}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="card group flex items-start gap-4 p-5 transition-colors duration-300 hover:border-coral/40"
              style={{ opacity: 0 }}
            >
              <span className="text-2xl" aria-hidden="true">
                {icon}
              </span>
              <div>
                <h3 className="text-body font-medium text-ivory">
                  {t(key as 'map' | 'tracking' | 'team' | 'achievements' | 'streaks' | 'feed')}
                </h3>
                <p className="mt-1 text-sm text-stone">
                  {t(
                    `${key}Desc` as
                      | 'mapDesc'
                      | 'trackingDesc'
                      | 'teamDesc'
                      | 'achievementsDesc'
                      | 'streaksDesc'
                      | 'feedDesc'
                  )}
                </p>
              </div>

              {/* Mobile: pill badge */}
              <span className="ml-auto flex-shrink-0 rounded-pill border border-coral/30 px-2 py-0.5 text-[9px] font-mono text-coral/70 md:hidden">
                {t('label')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
