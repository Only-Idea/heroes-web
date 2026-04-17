'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';
import { medalScroll } from '@/lib/scroll-state';

let prefersReducedMotion = false;
if (typeof window !== 'undefined') {
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function MedalDisc() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    // Gentle float: Y-axis oscillation (amplitude 0.1, period 3s)
    groupRef.current.position.y = Math.sin(t * ((Math.PI * 2) / 3)) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Main disc */}
      <mesh>
        <cylinderGeometry args={[1.2, 1.2, 0.15, 64]} />
        <meshStandardMaterial color="#D4A84B" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Rim edge */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.04, 16, 64]} />
        <meshStandardMaterial color="#D4A84B" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Embossed center ring */}
      <mesh position={[0, 0.076, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.7, 64]} />
        <meshStandardMaterial color="#C49A3D" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Center emblem placeholder */}
      <mesh position={[0, 0.077, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.35, 32]} />
        <meshStandardMaterial color="#E0B84A" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function Medal() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!groupRef.current) return;
    const sp = medalScroll.progress;
    // Scroll-driven rotation: 80° profile → 0° front-facing
    const targetY = THREE.MathUtils.degToRad(80 * (1 - sp));
    groupRef.current.rotation.y = targetY;
    // Scale: 0.8 → 1.0
    const scale = 0.8 + sp * 0.2;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef} rotation={[0, THREE.MathUtils.degToRad(80), 0]} scale={0.8}>
      <MedalDisc />

      {/* Lighting */}
      <ambientLight color="#F2EEE4" intensity={0.4} />
      <directionalLight position={[3, 3, 5]} color="#F0A07C" intensity={1.2} />
      <directionalLight position={[-3, -1, 3]} color="#8AB4D4" intensity={0.6} />
      <pointLight position={[0, 2, 3]} color="#F5CA72" intensity={0.8} />

      {/* Environment reflection using Heroes gradient colors */}
      <Environment background={false} environmentIntensity={0.5} files={undefined}>
        <mesh scale={50}>
          <sphereGeometry />
          <meshBasicMaterial color="#3F7680" side={THREE.BackSide} />
        </mesh>
        <directionalLight position={[5, 5, 5]} color="#F5CA72" intensity={0.3} />
        <directionalLight position={[-5, 3, -5]} color="#F08870" intensity={0.2} />
      </Environment>
    </group>
  );
}
