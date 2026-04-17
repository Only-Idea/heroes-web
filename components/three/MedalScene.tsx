'use client';

import { Suspense, useSyncExternalStore } from 'react';
import { Canvas } from '@react-three/fiber';
import Medal from './Medal';
import { isWebGLSupported, isMobileDevice } from '@/lib/webgl';

function MedalFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-48 w-48 rounded-full bg-heroes-gradient opacity-40 blur-xl" />
    </div>
  );
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function MedalScene() {
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isMounted) return null;
  if (!isWebGLSupported()) return <MedalFallback />;

  const mobile = isMobileDevice();

  return (
    <div className="relative h-[400px] w-[400px] max-w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        dpr={mobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        fallback={<MedalFallback />}
      >
        <Suspense fallback={null}>
          <Medal />
        </Suspense>
      </Canvas>
    </div>
  );
}
