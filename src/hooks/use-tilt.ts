'use client';

import { useRef, useEffect, CSSProperties } from 'react';
import { prefersReducedMotion } from '@/lib/device-capability';

export function useTilt<T extends HTMLElement = HTMLDivElement>(maxRotation = 6) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    let animationFrameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const centerX = rect.left + width / 2;
        const centerY = rect.top + height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = (mouseY / (height / 2)) * -maxRotation;
        const rotateY = (mouseX / (width / 2)) * maxRotation;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        element.style.transition = 'transform 0.1s ease-out';
        element.style.willChange = 'transform';
      });
    };

    const handleMouseLeave = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      element.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [maxRotation]);

  const style: CSSProperties = {
    transformStyle: 'preserve-3d',
  };

  return { ref, style };
}
