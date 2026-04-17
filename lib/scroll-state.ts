// Shared mutable scroll state readable by R3F useFrame loops.
// Updated by GSAP ScrollTrigger, consumed by 3D components.

export const heroScroll = {
  /** 0 = top of hero, 1 = fully scrolled past hero */
  progress: 0,
};

export const medalScroll = {
  /** 0 = medal not in view, 1 = fully scrolled through medal section */
  progress: 0,
};
