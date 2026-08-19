'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function Hero() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-24 pb-16">
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: High-Contrast Text Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Badge */}
            <div 
              className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-neon bg-neon/10 border border-neon/30 mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(0,217,255,0.12)] transition-all duration-700 ease-out transform ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon"></span>
              </span>
              <span>Available for SaaS & AI Engineering</span>
            </div>

            {/* Name Heading */}
            <h1 
              className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] transition-all duration-700 delay-100 ease-out transform ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Jai Lakhmani
            </h1>
            
            {/* Headline */}
            <p 
              className={`text-xl sm:text-2xl font-medium text-zinc-100 mt-5 leading-snug max-w-2xl transition-all duration-700 delay-200 ease-out transform ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Full-stack developer shipping <span className="text-neon font-semibold">real-time SaaS</span> and <span className="text-neon-glow font-semibold">RAG-powered AI</span> products.
            </p>
            
            {/* Supporting Line */}
            <p 
              className={`text-base sm:text-lg text-zinc-400 mt-4 max-w-xl leading-relaxed transition-all duration-700 delay-300 ease-out transform ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Building production-ready applications with Next.js, real-time systems, and AI integrations.
            </p>
            
            {/* CTA Buttons */}
            <div 
              className={`flex flex-wrap items-center gap-4 mt-8 transition-all duration-700 delay-400 ease-out transform ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-3 rounded-lg text-sm font-medium transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View Projects</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 border border-zinc-700/80 hover:border-zinc-500 text-zinc-300 hover:text-zinc-50 px-6 py-3 rounded-lg text-sm font-medium transition-colors bg-zinc-900/60 backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get in Touch</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </Link>
            </div>

            {/* Quick Tech Highlights */}
            <div 
              className={`mt-10 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-2 transition-all duration-700 delay-500 ease-out transform ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-xs font-mono text-zinc-500 mr-2">STACK:</span>
              {['Next.js 15', 'TypeScript', 'RAG & AI', 'Real-Time', 'Hono', 'Convex', 'Appwrite'].map((tech) => (
                <span 
                  key={tech}
                  className="inline-flex items-center rounded-md border border-zinc-800 bg-zinc-900/70 px-2.5 py-1 text-xs font-mono text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Stage for the Full-Page 3D Universe (5 Cols) */}
          <div className="hidden lg:block lg:col-span-5 h-[480px] pointer-events-none" />

        </div>
      </div>
    </section>
  );
}

export default Hero;
