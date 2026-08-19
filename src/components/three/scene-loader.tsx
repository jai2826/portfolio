'use client';

import { useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import { getDeviceTier, prefersReducedMotion, DeviceTier } from '@/lib/device-capability';

const DynamicScene = dynamic(() => import('./scene'), {
  ssr: false,
  loading: () => <FallbackGlow />,
});

function FallbackGlow() {
  return (
    <div className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden pr-0 lg:pr-28">
      <div 
        className="w-[400px] h-[400px] lg:w-[550px] lg:h-[550px] rounded-full blur-[150px] opacity-25 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle, #00D9FF 0%, #a855f7 40%, transparent 70%)',
        }}
      />
    </div>
  );
}

const emptySubscribe = () => () => {};

export default function SceneLoader() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return <FallbackGlow />;
  }

  const tier: DeviceTier = getDeviceTier();
  const reducedMotion = prefersReducedMotion();

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none">
      <FallbackGlow />
      <DynamicScene tier={tier} reducedMotion={reducedMotion} />
    </div>
  );
}
