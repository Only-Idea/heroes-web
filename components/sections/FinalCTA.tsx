'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const t = useTranslations('CTA');
  const sectionRef = useRef<HTMLElement>(null!);
  const headlineRef = useRef<HTMLHeadingElement>(null!);
  const subtitleRef = useRef<HTMLParagraphElement>(null!);
  const buttonsRef = useRef<HTMLDivElement>(null!);
  const mockupRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline fade-up
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            once: true,
          },
        }
      );

      // Subtitle
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            once: true,
          },
        }
      );

      // Buttons scale in
      gsap.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            once: true,
          },
        }
      );

      // Device mockups float up
      gsap.fromTo(
        mockupRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            once: true,
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-void px-6 py-20 text-center md:px-10"
    >
      {/* Gradient glow background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(55, 94, 101, 0.4) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <h2
        ref={headlineRef}
        className="text-section text-ivory relative z-10"
        style={{ opacity: 0 }}
      >
        {t('title')}
      </h2>

      <p
        ref={subtitleRef}
        className="text-body-lg relative z-10 mt-4 max-w-md text-stone"
        style={{ opacity: 0 }}
      >
        {t('subtitle')}
      </p>

      <div
        ref={buttonsRef}
        className="relative z-10 mt-10 flex flex-col gap-4 sm:flex-row"
        style={{ opacity: 0 }}
      >
        <a href="#" className="btn-primary">
          {t('appStore')}
        </a>
        <a href="#" className="btn-ghost">
          {t('googlePlay')}
        </a>
      </div>

      {/* Device mockups placeholder */}
      <div ref={mockupRef} className="relative z-10 mt-16 flex gap-6" style={{ opacity: 0 }}>
        {/* iOS device */}
        <div className="phone-frame relative h-[280px] w-[130px] border border-border bg-carbon md:h-[380px] md:w-[180px]">
          <div className="phone-frame-inner absolute inset-2 overflow-hidden bg-void">
            <div className="flex h-full flex-col items-center justify-center gap-2 p-3">
              <div className="h-16 w-full rounded-sm bg-teal/20" />
              <div className="h-2 w-3/4 rounded bg-stone/20" />
              <div className="h-2 w-1/2 rounded bg-stone/15" />
              <div className="mt-auto h-6 w-full rounded-pill bg-heroes-gradient opacity-40" />
            </div>
          </div>
        </div>

        {/* Android device */}
        <div className="phone-frame relative h-[280px] w-[130px] border border-border bg-carbon md:h-[380px] md:w-[180px]">
          <div className="phone-frame-inner absolute inset-2 overflow-hidden bg-void">
            <div className="flex h-full flex-col items-center justify-center gap-2 p-3">
              <div className="h-16 w-full rounded-sm bg-coral/15" />
              <div className="h-2 w-3/4 rounded bg-stone/20" />
              <div className="h-2 w-1/2 rounded bg-stone/15" />
              <div className="mt-auto h-6 w-full rounded-pill bg-heroes-gradient opacity-40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
