'use client';

import { Suspense, useSyncExternalStore } from 'react';
import { Canvas } from '@react-three/fiber';
import HeroOrb from './HeroOrb';
import { isWebGLSupported, isMobileDevice } from '@/lib/webgl';

function WebGLFallback() {
  return (
    <div className="absolute inset-0 bg-heroes-gradient opacity-20 blur-3xl rounded-full m-auto w-[60vw] h-[60vw] max-w-[500px] max-h-[500px]" />
  );
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function HeroScene() {
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isMounted) return null;
  if (!isWebGLSupported()) return <WebGLFallback />;

  const mobile = isMobileDevice();

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={mobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        fallback={<WebGLFallback />}
      >
        <Suspense fallback={null}>
          <HeroOrb />
        </Suspense>
      </Canvas>
    </div>
  );
}
