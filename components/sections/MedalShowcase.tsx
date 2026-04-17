'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { medalScroll } from '@/lib/scroll-state';

gsap.registerPlugin(ScrollTrigger);

const MedalScene = dynamic(() => import('@/components/three/MedalScene'), {
  ssr: false,
});

export default function MedalShowcase() {
  const t = useTranslations('Medal');
  const sectionRef = useRef<HTMLElement>(null!);
  const textRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    // Drive medalScroll.progress via scrub
    const progressTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        medalScroll.progress = self.progress;
      },
    });

    // Text fade-in at ~40% scroll through section
    const textTween = gsap.fromTo(
      text,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 40%',
          once: true,
        },
      }
    );

    return () => {
      progressTrigger.kill();
      textTween.kill();
      medalScroll.progress = 0;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-void px-6 py-20 md:flex-row md:gap-16 md:px-10"
    >
      {/* 3D Medal */}
      <div className="flex items-center justify-center">
        <MedalScene />
      </div>

      {/* Text content */}
      <div
        ref={textRef}
        className="mt-10 max-w-md text-center md:mt-0 md:text-left"
        style={{ opacity: 0 }}
      >
        <p className="text-label text-coral">{t('label')}</p>
        <h2 className="text-section text-ivory mt-4">{t('title')}</h2>
        <p className="text-body-lg mt-6 text-stone">{t('description')}</p>
      </div>
    </section>
  );
}
