'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactSection() {
  const t = useTranslations('Contact');
  const sectionRef = useRef<HTMLElement>(null!);
  const formRef = useRef<HTMLFormElement>(null!);
  const fieldsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Form fields stagger in
      fieldsRef.current.forEach((field, i) => {
        if (!field) return;
        gsap.fromTo(
          field,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              once: true,
            },
          }
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const validate = useCallback(
    (form: FormData): FormErrors => {
      const errs: FormErrors = {};
      const name = (form.get('name') as string)?.trim();
      const email = (form.get('email') as string)?.trim();
      const message = (form.get('message') as string)?.trim();

      if (!name) errs.name = t('errorName');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t('errorEmail');
      if (!message) errs.message = t('errorMessage');

      return errs;
    },
    [t]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const errs = validate(form);

      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }

      setErrors({});
      setSubmitted(true);
    },
    [validate]
  );

  return (
    <section ref={sectionRef} id="contact" aria-labelledby="contact-title" className="relative bg-carbon px-6 py-20 md:px-10">
      <div className="mx-auto max-w-xl">
        <div
          ref={(el) => {
            fieldsRef.current[0] = el;
          }}
          className="mb-10 text-center"
          style={{ opacity: 0 }}
        >
          <p className="text-label text-coral">{t('label')}</p>
          <h2 id="contact-title" className="text-section text-ivory mt-4">{t('title')}</h2>
        </div>

        {submitted ? (
          <div className="text-center">
            <p className="text-body-lg text-ivory">{t('success')}</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Name */}
            <div
              ref={(el) => {
                fieldsRef.current[1] = el;
              }}
              style={{ opacity: 0 }}
            >
              <label htmlFor="contact-name" className="text-label mb-2 block text-stone">
                {t('name')}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder={t('namePlaceholder')}
                className="w-full rounded-sm border border-border bg-void px-4 py-3 text-body text-ivory placeholder:text-ash outline-none transition-colors duration-300 focus:border-coral/60"
              />
              {errors.name && <p className="mt-1 text-sm text-coral">{errors.name}</p>}
            </div>

            {/* Email */}
            <div
              ref={(el) => {
                fieldsRef.current[2] = el;
              }}
              style={{ opacity: 0 }}
            >
              <label htmlFor="contact-email" className="text-label mb-2 block text-stone">
                {t('email')}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder={t('emailPlaceholder')}
                className="w-full rounded-sm border border-border bg-void px-4 py-3 text-body text-ivory placeholder:text-ash outline-none transition-colors duration-300 focus:border-coral/60"
              />
              {errors.email && <p className="mt-1 text-sm text-coral">{errors.email}</p>}
            </div>

            {/* Message */}
            <div
              ref={(el) => {
                fieldsRef.current[3] = el;
              }}
              style={{ opacity: 0 }}
            >
              <label htmlFor="contact-message" className="text-label mb-2 block text-stone">
                {t('message')}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder={t('messagePlaceholder')}
                className="w-full resize-none rounded-sm border border-border bg-void px-4 py-3 text-body text-ivory placeholder:text-ash outline-none transition-colors duration-300 focus:border-coral/60"
              />
              {errors.message && <p className="mt-1 text-sm text-coral">{errors.message}</p>}
            </div>

            {/* Submit */}
            <div
              ref={(el) => {
                fieldsRef.current[4] = el;
              }}
              className="text-center"
              style={{ opacity: 0 }}
            >
              <button type="submit" className="btn-primary w-full sm:w-auto">
                {t('send')}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
