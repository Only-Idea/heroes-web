'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { heroScroll } from '@/lib/scroll-state';
import { isMobileDevice } from '@/lib/webgl';

// Fresnel glow shader for core glow layer
const fresnelVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fresnelFragmentShader = /* glsl */ `
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  uniform float opacity;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float fresnel = pow(1.0 - dot(vNormal, vViewDir), 3.0);
    vec3 gradient = mix(color1, color2, fresnel * 0.5);
    gradient = mix(gradient, color3, fresnel);
    gl_FragColor = vec4(gradient, fresnel * opacity);
  }
`;

// Generate particle data at module scope (pure, deterministic with seeded values)
// Mobile: reduce 400 → 100 for performance
const PARTICLE_COUNT = typeof window !== 'undefined' && isMobileDevice() ? 100 : 400;

function generateParticleData() {
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  const off = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Deterministic distribution using golden ratio spiral
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const theta = goldenAngle * i;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT);
    const r = 3 + (((i * 7 + 13) % PARTICLE_COUNT) / PARTICLE_COUNT) * 5;

    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);

    // Deterministic phase offsets
    off[i * 3] = ((i * 17 + 31) % 100) * 0.0628;
    off[i * 3 + 1] = ((i * 23 + 47) % 100) * 0.0628;
    off[i * 3 + 2] = ((i * 29 + 53) % 100) * 0.0628;
  }

  return { positions: pos, offsets: off, basePositions: new Float32Array(pos) };
}

const particleData = generateParticleData();

function InnerCore() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    const opacity = 0.7 + 0.3 * Math.sin((t * Math.PI * 2) / 4);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.45, 2]} />
      <meshBasicMaterial color="#F2BE5E" transparent opacity={0.85} />
    </mesh>
  );
}

function CoreGlow() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    matRef.current.uniforms.opacity.value = 0.6 + 0.2 * Math.sin((t * Math.PI * 2) / 4);
  });

  return (
    <mesh>
      <sphereGeometry args={[0.7, 32, 32]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={fresnelVertexShader}
        fragmentShader={fresnelFragmentShader}
        uniforms={{
          color1: { value: new THREE.Color('#375E65') },
          color2: { value: new THREE.Color('#F2BE5E') },
          color3: { value: new THREE.Color('#EC7A5C') },
          opacity: { value: 1.0 },
        }}
        transparent
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function WireframeShell() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.08;
    ref.current.rotation.z = t * 0.12;
    // Dissolve: opacity decreases as user scrolls past hero
    const sp = heroScroll.progress;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.25 * (1 - sp);
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.4, 1]} />
      <meshBasicMaterial color="#E8E2D6" wireframe transparent opacity={0.25} />
    </mesh>
  );
}

function OuterShell() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = -t * 0.05;
    ref.current.rotation.z = -t * 0.07;
    // Dissolve: opacity decreases on scroll
    const sp = heroScroll.progress;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.08 * (1 - sp);
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.9, 0]} />
      <meshBasicMaterial color="#E8E2D6" wireframe transparent opacity={0.08} />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const { positions, offsets, basePositions } = particleData;

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    const posAttr = ref.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;
    // Particles drift outward as user scrolls past hero
    const drift = 1 + heroScroll.progress * 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      arr[i3] = basePositions[i3] * drift + Math.sin(t * 0.3 + offsets[i3]) * 0.15;
      arr[i3 + 1] = basePositions[i3 + 1] * drift + Math.cos(t * 0.2 + offsets[i3 + 1]) * 0.15;
      arr[i3 + 2] = basePositions[i3 + 2] * drift + Math.sin(t * 0.25 + offsets[i3 + 2]) * 0.15;
    }
    posAttr.needsUpdate = true;

    // Fade particles as they drift
    (ref.current.material as THREE.PointsMaterial).opacity = 0.5 * (1 - heroScroll.progress * 0.8);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#E8E2D6" size={0.02} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

// Check reduced motion preference at module scope (SSR-safe: defaults false)
let prefersReducedMotion = false;
if (typeof window !== 'undefined') {
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function HeroOrb() {
  const groupRef = useRef<THREE.Group>(null!);
  const { size } = useThree();
  const isMobile = size.width < 768;
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }) => {
    if (!groupRef.current || prefersReducedMotion) return;

    if (isMobile) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
    } else {
      mouse.current.x += (pointer.x * 0.3 - mouse.current.x) * 0.05;
      mouse.current.y += (pointer.y * 0.2 - mouse.current.y) * 0.05;
      groupRef.current.rotation.y = mouse.current.x;
      groupRef.current.rotation.x = -mouse.current.y;
    }
  });

  return (
    <group ref={groupRef}>
      <InnerCore />
      <CoreGlow />
      <WireframeShell />
      <OuterShell />
      <Particles />

      <ambientLight color="#E8E2D6" intensity={0.3} />
      <pointLight position={[3, 2, 4]} color="#F0A07C" intensity={1.5} />
      <pointLight position={[-4, -2, 2]} color="#8AB4D4" intensity={0.8} />
    </group>
  );
}
