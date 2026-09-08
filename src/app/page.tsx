'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { SmartlyInfra } from "@/components/sections/smartly-infra";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

const SceneLoader = dynamic(() => import('@/components/three/scene-loader'), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#0a0a0a] text-zinc-50 overflow-x-hidden">
        {/* Full-Page Interconnected 3D Universe */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Suspense fallback={null}>
            <SceneLoader />
          </Suspense>
        </div>

        {/* Directional Dark Vignette Protecting Left-Side Text Readability */}
        <div className="fixed inset-0 z-1 pointer-events-none bg-linear-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a] lg:bg-linear-to-r lg:from-[#0a0a0a] lg:via-[#0a0a0a]/80 lg:to-transparent" />

        {/* Sticky Minimal Navbar */}
        <Navbar />

        {/* Interactive Page Sections */}
        <main className="relative z-10 flex flex-col">
          <Hero />
          <About />
          <Experience />
          <SmartlyInfra />
          <Projects />
          <Skills />
          <Contact />
        </main>

        {/* Footer */}
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </SmoothScrollProvider>
  );
}
