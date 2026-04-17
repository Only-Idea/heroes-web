'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroScroll } from '@/lib/scroll-state';

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
});

export default function HeroSection() {
  const t = useTranslations('Hero');
  const sectionRef = useRef<HTMLElement>(null!);
  const contentRef = useRef<HTMLDivElement>(null!);
  const orbRef = useRef<HTMLDivElement>(null!);
  const scrollHintRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const orb = orbRef.current;
    const scrollHint = scrollHintRef.current;
    if (!section || !content || !orb || !scrollHint) return;

    // Text content fades out and moves up past 50vh
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          heroScroll.progress = self.progress;
        },
      },
    });

    contentTl.to(content, {
      opacity: 0,
      y: -40,
      ease: 'none',
    });

    // Scroll hint fades out quickly
    contentTl.to(
      scrollHint,
      {
        opacity: 0,
        ease: 'none',
      },
      0
    );

    // Orb scales down
    contentTl.to(
      orb,
      {
        scale: 0.85,
        ease: 'none',
      },
      0
    );

    return () => {
      contentTl.kill();
      heroScroll.progress = 0;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-void"
    >
      {/* 3D Orb — behind text */}
      <div ref={orbRef} className="hero-stagger-orb absolute inset-0">
        <HeroScene />
      </div>

      {/* Text overlay */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center px-6 pointer-events-none"
      >
        <p className="hero-stagger hero-stagger-label text-label text-stone">{t('label')}</p>

        <h1 className="mt-6 text-center">
          <span className="hero-stagger hero-stagger-title-1 block text-hero text-heroes-gradient">
            {t('titleLine1')}
          </span>
          <span className="hero-stagger hero-stagger-title-2 block text-hero text-heroes-gradient">
            {t('titleLine2')}
          </span>
        </h1>

        <p className="hero-stagger hero-stagger-subtitle text-body-lg mt-4 max-w-md text-center text-stone">
          {t('subtitle')}
        </p>

        <div className="hero-stagger-cta mt-10 flex gap-4 pointer-events-auto">
          <a href="#download" className="btn-primary">
            {t('ctaPrimary')}
          </a>
          <a href="#challenges" className="btn-ghost">
            {t('ctaSecondary')}
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="hero-stagger hero-stagger-scroll absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-label text-stone/60 text-[10px]">{t('scroll')}</span>
        <div className="h-8 w-px bg-stone/30">
          <div className="hero-scroll-line h-full w-full bg-stone/60" />
        </div>
      </div>
    </section>
  );
}
