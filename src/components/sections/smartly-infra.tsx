'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { useTilt } from '@/hooks/use-tilt';
import smartlyData from '@/data/smartly-infra.json';

// Number counting animation hook
function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return { count, ref };
}

function StatCard({ stat }: { stat: typeof smartlyData.stats[0] }) {
  const { ref, style } = useTilt(6);
  const { count, ref: countRef } = useCountUp(stat.value, 1500);

  return (
    <div
      ref={ref}
      style={{ ...style, transformStyle: 'preserve-3d' }}
      className="group relative rounded-xl border border-zinc-800/80 bg-[#0a0a0a]/80 backdrop-blur-md p-5 transition-all duration-300 hover:border-[#38BDF8]/40 hover:shadow-[0_0_25px_rgba(56,189,248,0.12)] flex flex-col justify-between"
    >
      <div style={{ transform: 'translateZ(15px)' }}>
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-zinc-400">
          <span>{stat.label}</span>
          {stat.detail && (
            <span className="text-[10px] text-neon/80 bg-neon/10 px-2 py-0.5 rounded-full border border-neon/20">
              {stat.detail}
            </span>
          )}
        </div>

        <div ref={countRef} className="mt-3 flex items-baseline gap-1">
          {stat.prefix && (
            <span className="text-xl font-bold font-mono text-[#38BDF8]">{stat.prefix}</span>
          )}
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-100 tracking-tight tabular-nums">
            {count}
          </span>
          {stat.suffix && (
            <span className="text-xs font-mono text-zinc-400 ml-1">{stat.suffix}</span>
          )}
        </div>
      </div>

      {stat.change && (
        <div style={{ transform: 'translateZ(10px)' }} className="mt-3 pt-2 border-t border-zinc-800/50 flex items-center gap-1 text-[11px] font-mono text-emerald-400">
          <span>▲</span>
          <span>{stat.change}</span>
        </div>
      )}
    </div>
  );
}

function AgentCard({ agent }: { agent: typeof smartlyData.agents[0] }) {
  const { ref, style } = useTilt(5);

  return (
    <div
      ref={ref}
      style={{ ...style, transformStyle: 'preserve-3d' }}
      className="rounded-xl border border-zinc-800/80 bg-[#0a0a0a]/70 backdrop-blur-md p-5 transition-all duration-300 hover:border-[#38BDF8]/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.1)] flex flex-col justify-between"
    >
      <div style={{ transform: 'translateZ(15px)' }}>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-neon bg-neon/10 px-2.5 py-0.5 rounded-full border border-neon/20">
            {agent.type}
          </span>
          <span className="text-[11px] font-mono text-zinc-500">{agent.date}</span>
        </div>

        <h4 className="text-lg font-bold text-zinc-100 mt-1 flex items-center justify-between">
          <span>{agent.name}</span>
          <span className="text-xs font-mono text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded bg-zinc-900/60">
            {agent.version}
          </span>
        </h4>

        <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-sans">
          {agent.description}
        </p>
      </div>

      <div style={{ transform: 'translateZ(10px)' }} className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono">
        <span className="text-emerald-400 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Deployed to Network
        </span>
        <span className="text-zinc-500">Auto-Validated</span>
      </div>
    </div>
  );
}

export function SmartlyInfra() {
  return (
    <section id="contributions" className="py-10 md:py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-neon bg-neon/10 border border-neon/30 mb-3 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon"></span>
                </span>
                <span>Live Operational Benchmark</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-50">Smartly Infra Contributions</h2>
              <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl">
                Active contributor across the <span className="text-zinc-200 font-medium">Hybrid Intelligence Track</span> — building autonomous agent workflows, precision evaluation prompts, and deployed tools.
              </p>
            </div>

            {/* Direct Verification CTA */}
            <a
              href={smartlyData.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start md:self-auto rounded-lg border border-zinc-700 bg-zinc-900/80 px-4 py-2.5 text-sm font-medium text-zinc-200 hover:border-[#38BDF8]/60 hover:text-white hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all group"
            >
              <span>Verify Smartly Profile</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-neon"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>

          {/* Key Metrics Grid with Count-Up Animations */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {smartlyData.stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>

          {/* Trophy Board & Shipped Agents */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Trophy Showcase Card */}
            <div className="rounded-xl border border-zinc-800/80 bg-[#0a0a0a]/80 backdrop-blur-md p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                    <span>🏆</span>
                    <span>Trophy Board</span>
                  </h3>
                  <span className="text-[11px] font-mono text-neon">3 Unlocked</span>
                </div>
                <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                  Earned recognition on Smartly Infra for accepted agent tuning benchmarks and reliable task deployment.
                </p>

                <div className="space-y-3">
                  {smartlyData.trophies.map((trophy) => (
                    <div
                      key={trophy.title}
                      className="flex items-center justify-between p-3 rounded-lg border border-zinc-800/70 bg-zinc-900/50 hover:border-[#38BDF8]/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon/10 border border-neon/20 text-neon text-sm">
                          {trophy.icon === 'spark' ? '⚡' : trophy.icon === 'heart' ? '❤️' : '🚀'}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-zinc-200">{trophy.title}</p>
                          <p className="text-[10px] font-mono text-zinc-500">{trophy.category} Award</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Achieved
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Location: Bangalore</span>
                <span className="text-[#38BDF8]">Top 5 in City</span>
              </div>
            </div>

            {/* Deployed AI Agents Showcase (Span 2) */}
            <div className="lg:col-span-2 rounded-xl border border-zinc-800/80 bg-[#0a0a0a]/80 backdrop-blur-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                    <span>🤖</span>
                    <span>Deployed Autonomous Agents</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Public operational agents designed and evaluated on Smartly Infra
                  </p>
                </div>
                <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline-block">3 Shipped</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {smartlyData.agents.map((agent) => (
                  <AgentCard key={agent.name} agent={agent} />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default SmartlyInfra;
