'use client';

import { useEffect, useState, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/device-capability';

interface ScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useScrollAnimation({ threshold = 0.1, triggerOnce = true }: ScrollAnimationOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) return;

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(currentRef);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce]);

  const shouldBeVisible = isVisible || (typeof window !== 'undefined' && prefersReducedMotion());

  return { ref, isVisible: shouldBeVisible };
}
