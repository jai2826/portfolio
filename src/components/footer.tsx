import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-center sm:text-left text-sm text-zinc-500 font-sans">
          © {new Date().getFullYear()} Jai Lakhmani. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-600">
          <Link href="/admin" className="hover:text-neon transition-colors flex items-center gap-1">
            <span>●</span>
            <span>Studio Dashboard</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
