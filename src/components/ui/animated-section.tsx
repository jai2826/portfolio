'use client';

import React, { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce });

  const style = {
    transitionDuration: '700ms',
    transitionTimingFunction: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'transition-all will-change-[opacity,transform]',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
