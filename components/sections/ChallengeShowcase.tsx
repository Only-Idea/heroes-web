'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const challenges = [
  { key: 'fuji', gradient: 'from-teal/40 to-teal/10' },
  { key: 'ronin', gradient: 'from-coral/40 to-coral/10' },
  { key: 'railway', gradient: 'from-amber/40 to-amber/10' },
] as const;

export default function ChallengeShowcase() {
  const t = useTranslations('Challenges');
  const sectionRef = useRef<HTMLElement>(null!);
  const trackRef = useRef<HTMLDivElement>(null!);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    const triggers: (ScrollTrigger | gsap.core.Tween | gsap.core.Timeline)[] = [];

    // Desktop: horizontal scroll with pin
    mm.add('(min-width: 768px)', () => {
      const scrollWidth = track.scrollWidth - track.clientWidth;

      const tween = gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      triggers.push(tween);
    });

    // Mobile: staggered entrance
    mm.add('(max-width: 767px)', () => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const tween = gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        );
        triggers.push(tween);
      });
    });

    // Desktop card slide-in
    mm.add('(min-width: 768px)', () => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: i * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              once: true,
            },
          }
        );
      });
    });

    return () => {
      mm.revert();
      triggers.forEach((t) => {
        if ('kill' in t) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="challenges" aria-labelledby="challenges-title" className="relative min-h-screen bg-void py-20">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6 pb-12 md:px-10">
        <p className="text-label text-coral">{t('label')}</p>
        <h2 id="challenges-title" className="text-section text-ivory mt-4">{t('title')}</h2>
      </div>

      {/* Card track */}
      <div ref={trackRef} className="flex flex-col gap-6 px-6 md:flex-row md:gap-8 md:px-10">
        {challenges.map(({ key, gradient }, i) => (
          <div
            key={key}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="card card-hover group flex w-full flex-shrink-0 flex-col overflow-hidden md:w-[420px]"
          >
            {/* Placeholder image area */}
            <div
              className={`flex h-56 items-center justify-center bg-gradient-to-br ${gradient} md:h-64`}
            >
              <span className="text-section text-ivory/30 select-none">
                {t(key as 'fuji' | 'ronin' | 'railway')}
              </span>
            </div>

            {/* Card content */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-challenge text-ivory">
                {t(key as 'fuji' | 'ronin' | 'railway')}
              </h3>
              <p className="text-body mt-3 flex-1 text-stone">
                {t(`${key}Desc` as 'fujiDesc' | 'roninDesc' | 'railwayDesc')}
              </p>
              <a
                href={`#${key}`}
                className="mt-6 inline-flex items-center gap-2 text-btn text-coral transition-opacity hover:opacity-80"
              >
                {t('cta')}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
