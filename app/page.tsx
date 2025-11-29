'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

const examples = [
  { github: 'github.com/you/repo/blog/post.md', plok: 'plok.sh/you/repo/post' },
  { github: 'github.com/dev/notes/blog/tip.md', plok: 'plok.sh/dev/notes/tip' },
  { github: 'github.com/jane/til/blog/rust.md', plok: 'plok.sh/jane/til/rust' },
];

function FlowAnimation() {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 3);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 mb-4 text-xl">
      {/* GitHub Logo */}
      <span 
        className="transition-all duration-300"
        style={{ 
          opacity: step === 0 ? 1 : 0.3,
          transform: step === 0 ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </span>
      
      {/* Arrow 1 */}
      <span 
        className="text-[var(--muted)] transition-all duration-300"
        style={{ 
          opacity: step >= 1 ? 0.8 : 0.2,
        }}
      >
        →
      </span>
      
      {/* Lightning */}
      <span 
        className="transition-all duration-300"
        style={{ 
          opacity: step === 1 ? 1 : 0.3,
          transform: step === 1 ? 'scale(1.2)' : 'scale(1)',
        }}
      >
        ⚡️
      </span>
      
      {/* Arrow 2 */}
      <span 
        className="text-[var(--muted)] transition-all duration-300"
        style={{ 
          opacity: step >= 2 ? 0.8 : 0.2,
        }}
      >
        →
      </span>
      
      {/* Globe */}
      <span 
        className="transition-all duration-300"
        style={{ 
          opacity: step === 2 ? 1 : 0.3,
          transform: step === 2 ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        🌐
      </span>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [exampleIndex, setExampleIndex] = useState(0);
  const [isPlok, setIsPlok] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPlok((prev) => {
        if (prev) {
          // Was showing plok, switch to next github
          setExampleIndex((i) => (i + 1) % examples.length);
          return false;
        }
        return true;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/${username.trim()}`);
    }
  };

  const current = examples[exampleIndex];

  return (
    <div 
      className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)]"
      style={{ fontFamily: 'var(--font-body)' }}
      data-theme="rose-pine"
      data-font="geist-mono"
    >
      <GoogleAnalytics />
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-lg">plok.sh</span>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/guide" className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
              guide
            </Link>
            <Link href="/themes" className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
              themes
            </Link>
            <a 
              href="https://github.com/skolhustick/plok.sh" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
              title="GitHub"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center">
          {/* Animated Flow Icon */}
          <FlowAnimation />
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            GitHub repo → Blog
          </h1>
          
          <p className="text-sm sm:text-lg text-[var(--muted)] mb-4 max-w-xl mx-auto">
            Add markdown to <code className="px-1.5 py-0.5 bg-[var(--code-bg)] text-[var(--accent)] rounded font-mono text-[0.9em]">/blog</code> → get a blog.
          </p>

          {/* URL Animation */}
          <div className="mb-10 px-4">
            <div className="p-3 bg-[var(--code-bg)] rounded-lg border border-[var(--border)] font-mono text-center max-w-xs mx-auto">
              <div className="text-[10px] text-[var(--muted)] mb-1">
                {isPlok ? '✨ your blog' : 'your repo'}
              </div>
              <div 
                className={`text-sm transition-all duration-500 ${
                  isPlok ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
                }`}
              >
                {isPlok ? current.plok : current.github}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="px-6">
            <form
              onSubmit={handleSubmit}
              className="max-w-xs mx-auto"
            >
              <div className="flex items-center bg-[var(--code-bg)] rounded-full border border-[var(--border)] pl-4 pr-1.5 py-1.5">
                <span className="text-[var(--muted)] text-sm shrink-0">plok.sh/</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="user"
                  className="flex-1 min-w-0 py-1.5 bg-transparent text-[var(--fg)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-10 h-10 flex items-center justify-center bg-[var(--accent)] text-[var(--bg)] rounded-full hover:opacity-90 transition-opacity shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
          </form>
          </div>

          <div className="mt-6 text-xs sm:text-sm text-[var(--muted)] px-4 text-center">
            <div className="sm:hidden">
              <div>
                <Link href="/themes" className="hover:text-[var(--accent)] transition-colors">21 themes</Link>
                {' • '}
                <span>Headers & footers</span>
              </div>
              <div>
                <span>Links page</span>
                {' • '}
                <span>Zero config</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <Link href="/themes" className="hover:text-[var(--accent)] transition-colors">21 themes</Link>
              {' • '}
              <span>Headers & footers</span>
              {' • '}
              <span>Links page</span>
              {' • '}
              <span>Zero config</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-xs text-[var(--muted)]">
        Just markdown. Nothing else.
      </footer>
    </div>
  );
}
