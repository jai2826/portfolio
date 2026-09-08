import { AnimatedSection } from '@/components/ui/animated-section';

export function About() {
  return (
    <section id="about" className="py-10 md:py-20 relative z-10 text-zinc-50">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="max-w-3xl rounded-2xl border border-zinc-800/60 bg-[#0a0a0a]/75 backdrop-blur-md p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-50 mb-6">About</h2>
            <p className="text-zinc-300 text-lg leading-relaxed font-sans">
              Full Stack AI Engineer experienced in building scalable SaaS applications and AI-powered products. My core stack includes Next.js, React, TypeScript, Node.js, Hono, Appwrite, Convex, MongoDB, SQL, and Tailwind CSS. I specialize in responsive web applications, real-time systems, authentication, state management, and cloud deployment. Passionate about shipping production-ready applications with modern JavaScript technologies.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default About;
