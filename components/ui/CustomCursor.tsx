'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const onEnterInteractive = () => {
      isHovering.current = true;
      ringRef.current?.classList.add('cursor-hover');
    };

    const onLeaveInteractive = () => {
      isHovering.current = false;
      ringRef.current?.classList.remove('cursor-hover');
    };

    let raf: number;
    const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.18);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.18);

      if (ringRef.current) {
        const size = isHovering.current ? 64 : 36;
        const offset = size / 2;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.transform = `translate(${ring.current.x - offset}px, ${ring.current.y - offset}px)`;
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    // Observe interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    // MutationObserver for dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll('a, button, [role="button"]');
      newInteractives.forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Dot — instant tracking */}
      <div
        ref={dotRef}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[200] h-1.5 w-1.5 rounded-full bg-ivory"
        aria-hidden="true"
      />
      {/* Ring — lerped tracking */}
      <div
        ref={ringRef}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[200] h-9 w-9 rounded-full border border-ivory/40 transition-[width,height,border-color] duration-200 [&.cursor-hover]:border-coral"
        aria-hidden="true"
      />
    </>
  );
}
