'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StickyDownloadBar() {
  const t = useTranslations('Download');
  const barRef = useRef<HTMLDivElement>(null!);
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: '100vh top',
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });

    return () => {
      trigger.kill();
    };
  }, [dismissed]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || dismissed) return;

    if (visible) {
      gsap.to(bar, {
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      gsap.to(bar, {
        y: 80,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [visible, dismissed]);

  const handleDismiss = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;
    gsap.to(bar, {
      y: 80,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setDismissed(true),
    });
  }, []);

  if (dismissed) return null;

  return (
    <div
      ref={barRef}
      className="fixed bottom-0 left-0 right-0 z-50 flex h-[60px] items-center justify-center gap-4 border-t border-border bg-carbon/90 px-4 backdrop-blur-md md:hidden"
      style={{ transform: 'translateY(80px)' }}
      role="banner"
    >
      {/* Store icons */}
      <div className="flex items-center gap-2">
        <svg
          className="h-5 w-5 text-ivory"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <svg
          className="h-5 w-5 text-ivory"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M3.18 23.73c.44.22.98.21 1.42-.01l11.54-6.55-2.77-2.77L3.18 23.73zM.47 1.28C.17 1.62 0 2.1 0 2.7v18.6c0 .6.17 1.08.47 1.42l.08.07 10.42-10.42v-.24L.55 1.21.47 1.28zM17.6 14.44l-3.16-3.16v-.24l3.16-3.16.07.04 3.74 2.13c1.07.6 1.07 1.59 0 2.2l-3.74 2.13-.07.06zM14.44 11.04L4.02.62C4.5.31 5.1.29 5.6.56l11.54 6.56-2.7 2.92z" />
        </svg>
      </div>

      {/* Text */}
      <a href="#" className="btn-primary py-2 px-5 text-[11px]">
        {t('text')}
      </a>

      {/* Dismiss */}
      <button
        onClick={handleDismiss}
        className="absolute right-3 flex h-8 w-8 items-center justify-center text-stone transition-colors duration-200 hover:text-ivory"
        aria-label={t('dismiss')}
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
