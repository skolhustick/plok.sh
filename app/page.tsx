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
            >
              github
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            GitHub repo → Blog
          </h1>
          
          <p className="text-xl text-[var(--muted)] mb-12 max-w-xl mx-auto">
            Add a <code className="text-[var(--accent)]">/blog</code> folder with markdown files.
            <br />
            Get a beautiful blog instantly.
          </p>

          {/* URL Animation */}
          <div className="mb-12 px-4">
            <div className="p-4 bg-[var(--code-bg)] rounded-lg border border-[var(--border)] font-mono text-center max-w-sm mx-auto">
              <div className="text-xs text-[var(--muted)] mb-2">
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
              className="flex gap-2 max-w-xs mx-auto"
            >
              <div className="flex-1 flex items-center bg-[var(--code-bg)] rounded-lg border border-[var(--border)] px-3">
                <span className="text-[var(--muted)] text-sm shrink-0">plok.sh/</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="user"
                  className="w-full min-w-0 py-3 bg-transparent text-[var(--fg)] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[var(--accent)] text-[var(--bg)] rounded-lg font-medium hover:opacity-90 transition-opacity shrink-0"
            >
              Go
            </button>
          </form>
          </div>

          <p className="mt-6 text-sm text-[var(--muted)] px-4">
            <Link href="/themes" className="hover:text-[var(--accent)] transition-colors">14 themes</Link>
            {' • '}
            <span>Syntax highlighting</span>
            {' • '}
            <span>Zero config</span>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-xs text-[var(--muted)]">
        Just markdown. Nothing else.
      </footer>
    </div>
  );
}
