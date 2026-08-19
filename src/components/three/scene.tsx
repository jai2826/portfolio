'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import FullPageUniverse from './full-page-universe';
import PostEffects from './effects';
import { DeviceTier } from '@/lib/device-capability';

interface SceneProps {
  tier: DeviceTier;
  reducedMotion: boolean;
}

function DynamicLighting({
  reducedMotion,
  mouseRef,
}: {
  reducedMotion: boolean;
  mouseRef: React.RefObject<{ x: number; y: number }>;
}) {
  const primaryLightRef = useRef<THREE.PointLight>(null);
  const specularLightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!reducedMotion) {
      const mouse = mouseRef.current;
      if (primaryLightRef.current) {
        primaryLightRef.current.position.x = THREE.MathUtils.lerp(
          primaryLightRef.current.position.x,
          2.3 + mouse.x * 4.0,
          0.1
        );
        primaryLightRef.current.position.y = THREE.MathUtils.lerp(
          primaryLightRef.current.position.y,
          mouse.y * 3.0,
          0.1
        );
      }
      if (specularLightRef.current) {
        specularLightRef.current.position.x = THREE.MathUtils.lerp(
          specularLightRef.current.position.x,
          mouse.x * 4.5,
          0.12
        );
        specularLightRef.current.position.y = THREE.MathUtils.lerp(
          specularLightRef.current.position.y,
          mouse.y * 3.5,
          0.12
        );
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.45} color="#e2e8f0" />
      <directionalLight position={[6, 7, 5]} intensity={1.1} color="#ffffff" />
      <pointLight
        ref={primaryLightRef}
        position={[2.5, 1, 3]}
        intensity={2.4}
        color="#00D9FF"
        distance={10}
      />
      <pointLight
        ref={specularLightRef}
        position={[0, 0, 3.5]}
        intensity={1.5}
        color="#38BDF8"
        distance={8}
      />
      <pointLight position={[-4, -2, -2]} intensity={1.5} color="#a855f7" distance={12} />
      <pointLight position={[3, -3, 2]} intensity={1.0} color="#38BDF8" distance={8} />
    </>
  );
}

function CameraRig({
  scrollProgress,
  reducedMotion,
}: {
  scrollProgress: number;
  reducedMotion: boolean;
}) {
  useFrame((state) => {
    if (reducedMotion) return;

    // Smooth camera drift across sections
    const targetZ = THREE.MathUtils.lerp(5.0, 5.8, Math.sin(scrollProgress * Math.PI));
    const targetY = THREE.MathUtils.lerp(0.0, -0.3, scrollProgress);

    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
  });

  return null;
}

function UniverseOrchestrator({
  scrollProgress,
  tier,
  reducedMotion,
  isDesktop,
}: {
  scrollProgress: number;
  tier: DeviceTier;
  reducedMotion: boolean;
  isDesktop: boolean;
}) {
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    velocity: 0,
  });
  const prevTargetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  useFrame(() => {
    // Smooth lerp mouse coordinates
    const m = mouseRef.current;
    m.x = THREE.MathUtils.lerp(m.x, m.targetX, 0.1);
    m.y = THREE.MathUtils.lerp(m.y, m.targetY, 0.1);

    const dx = m.targetX - prevTargetRef.current.x;
    const dy = m.targetY - prevTargetRef.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    m.velocity = THREE.MathUtils.lerp(m.velocity, speed * 12, 0.1);
    prevTargetRef.current = { x: m.targetX, y: m.targetY };
  });

  return (
    <>
      <DynamicLighting reducedMotion={reducedMotion} mouseRef={mouseRef} />

      <CameraRig scrollProgress={scrollProgress} reducedMotion={reducedMotion} />

      <FullPageUniverse
        scrollProgress={scrollProgress}
        tier={tier}
        reducedMotion={reducedMotion}
        isDesktop={isDesktop}
        mouseRef={mouseRef}
      />
    </>
  );
}

export default function Scene({ tier, reducedMotion }: SceneProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
          setScrollProgress(progress);
        }
      });
    };

    handleResize();
    handleScroll();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 45 }}
        gl={{
          antialias: tier !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={tier === 'high' ? [1, 2] : [1, 1.5]}
      >
        <AdaptiveDpr pixelated={false} />

        <UniverseOrchestrator
          scrollProgress={scrollProgress}
          tier={tier}
          reducedMotion={reducedMotion}
          isDesktop={isDesktop}
        />

        <PostEffects enabled={tier === 'high' && !reducedMotion} />
      </Canvas>
    </div>
  );
}
