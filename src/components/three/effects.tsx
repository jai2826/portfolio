'use client';

import { EffectComposer, Bloom } from '@react-three/postprocessing';

interface PostEffectsProps {
  enabled?: boolean;
}

export default function PostEffects({ enabled = true }: PostEffectsProps) {
  if (!enabled) return null;

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.35}
        luminanceSmoothing={0.7}
        mipmapBlur
      />
    </EffectComposer>
  );
}
