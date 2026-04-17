'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { key: 'routes', value: 3, suffix: '' },
  { key: 'activities', value: 12, suffix: '' },
  { key: 'countries', value: 32, suffix: '+' },
] as const;

export default function StatsBar() {
  const t = useTranslations('Stats');
  const sectionRef = useRef<HTMLElement>(null!);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    counterRefs.current.forEach((el, i) => {
      if (!el) return;
      const target = { val: 0 };
      const endVal = stats[i].value;

      const tween = gsap.to(target, {
        val: endVal,
        duration: 1.5,
        delay: i * 0.2,
        ease: 'power2.out',
        paused: true,
        onUpdate: () => {
          el.textContent = Math.round(target.val).toString();
        },
      });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => tween.play(),
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label={t('routes') + ' / ' + t('activities') + ' / ' + t('countries')}
      className="relative border-y border-y-transparent py-16 md:py-20"
      style={{ borderImage: 'var(--gradient-heroes) 1' }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-around gap-10 px-6 md:flex-row md:gap-0 md:px-10">
        {stats.map(({ key, suffix }, i) => (
          <div key={key} className="flex flex-col items-center gap-2 text-center">
            <span className="text-stat text-ivory">
              <span
                ref={(el) => {
                  counterRefs.current[i] = el;
                }}
              >
                0
              </span>
              {suffix}
            </span>
            <span className="text-label text-stone">{t(key)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
