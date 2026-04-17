'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TREES_TARGET = 12480;

export default function ImpactSection() {
  const t = useTranslations('Impact');
  const sectionRef = useRef<HTMLElement>(null!);
  const leftRef = useRef<HTMLDivElement>(null!);
  const rightRef = useRef<HTMLDivElement>(null!);
  const counterRef = useRef<HTMLSpanElement>(null!);
  const treeRowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const counter = counterRef.current;
    if (!section || !left || !right || !counter) return;

    const ctx = gsap.context(() => {
      // Left column slides in from left
      gsap.fromTo(
        left,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            once: true,
          },
        }
      );

      // Right column slides in from right
      gsap.fromTo(
        right,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            once: true,
          },
        }
      );

      // Animated tree rows grow in
      treeRowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 50%',
              once: true,
            },
          }
        );
      });

      // Counter animation
      const obj = { val: 0 };
      gsap.to(obj, {
        val: TREES_TARGET,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          once: true,
        },
        onUpdate: () => {
          counter.textContent = Math.round(obj.val).toLocaleString();
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="impact"
      aria-labelledby="impact-title"
      className="relative min-h-screen bg-void px-6 py-20 md:px-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:items-center md:gap-16">
        {/* Left: Animated illustration */}
        <div
          ref={leftRef}
          className="flex flex-1 flex-col items-center gap-8"
          style={{ opacity: 0 }}
        >
          {/* Tree illustration */}
          <div className="relative flex h-64 w-full max-w-sm flex-col items-center justify-end gap-1">
            {[5, 7, 9, 11, 13].map((count, i) => (
              <div
                key={i}
                ref={(el) => {
                  treeRowsRef.current[i] = el;
                }}
                className="flex origin-center gap-1"
                style={{ transform: 'scaleX(0)' }}
              >
                {Array.from({ length: count }).map((_, j) => (
                  <div
                    key={j}
                    className="h-6 w-4 rounded-t-full"
                    style={{
                      background:
                        j % 3 === 0
                          ? 'var(--color-teal)'
                          : j % 3 === 1
                            ? 'rgba(55, 94, 101, 0.7)'
                            : 'rgba(55, 94, 101, 0.4)',
                    }}
                  />
                ))}
              </div>
            ))}
            {/* Ground line */}
            <div className="h-px w-full bg-teal/30" />
          </div>

          {/* Ocean wave illustration */}
          <div className="flex w-full max-w-sm flex-col items-center gap-2">
            <svg viewBox="0 0 300 60" className="w-full" aria-hidden="true">
              <path
                d="M0 30 Q25 10 50 30 T100 30 T150 30 T200 30 T250 30 T300 30 V60 H0 Z"
                fill="rgba(55, 94, 101, 0.2)"
              />
              <path
                d="M0 35 Q25 20 50 35 T100 35 T150 35 T200 35 T250 35 T300 35 V60 H0 Z"
                fill="rgba(55, 94, 101, 0.1)"
              />
            </svg>
          </div>

          {/* Counter */}
          <div className="text-center">
            <p className="text-label text-coral">{t('counterLabel')}</p>
            <p className="text-stat text-heroes-gradient mt-2">
              <span ref={counterRef}>0</span>
            </p>
            <p className="text-body text-stone mt-1">{t('treesPlanted')}</p>
          </div>
        </div>

        {/* Right: Text content */}
        <div ref={rightRef} className="flex-1 text-center md:text-left" style={{ opacity: 0 }}>
          <p className="text-label text-coral">{t('label')}</p>
          <h2 id="impact-title" className="text-section text-ivory mt-4">{t('title')}</h2>

          <div className="mt-8 space-y-8">
            {/* Tree Care */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal/20">
                <span className="text-lg" aria-hidden="true">
                  🌳
                </span>
              </div>
              <div>
                <h3 className="text-body font-medium text-ivory">{t('treeTitle')}</h3>
                <p className="mt-1 text-sm text-stone">{t('treeDesc')}</p>
              </div>
            </div>

            {/* Clean Ocean */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal/20">
                <span className="text-lg" aria-hidden="true">
                  🌊
                </span>
              </div>
              <div>
                <h3 className="text-body font-medium text-ivory">{t('oceanTitle')}</h3>
                <p className="mt-1 text-sm text-stone">{t('oceanDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
