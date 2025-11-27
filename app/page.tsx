'use client';

import { Shell } from '@/components/Shell';
import { THEME_LIST, FONT_LIST } from '@/lib/themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/${username.trim()}`);
    }
  };

  return (
    <Shell>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[var(--fg)] mb-4">
            plok.sh
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
            Turn any GitHub repo&apos;s <code className="bg-[var(--code-bg)] px-2 py-1 rounded">/blog</code> folder
            into a fast, beautiful blog. No database. No config. Just markdown.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-6">How it works</h2>
          <div className="space-y-4 text-[var(--fg)]">
            <p>
              1. Create a <code className="bg-[var(--code-bg)] px-1 rounded">/blog</code> folder in your GitHub repo
            </p>
            <p>
              2. Add markdown files (<code className="bg-[var(--code-bg)] px-1 rounded">.md</code>)
            </p>
            <p>
              3. Visit <code className="bg-[var(--code-bg)] px-1 rounded">plok.sh/[user]/[repo]</code>
            </p>
          </div>
        </section>

        {/* URL Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-6">URL Examples</h2>
          <div className="space-y-3 font-mono text-sm">
            <div className="p-3 bg-[var(--code-bg)] rounded">
              <span className="text-[var(--muted)]">/octocat</span>
              <span className="text-[var(--muted)] ml-4">→ List repos with /blog</span>
            </div>
            <div className="p-3 bg-[var(--code-bg)] rounded">
              <span className="text-[var(--muted)]">/octocat/my-notes</span>
              <span className="text-[var(--muted)] ml-4">→ Blog index</span>
            </div>
            <div className="p-3 bg-[var(--code-bg)] rounded">
              <span className="text-[var(--muted)]">/octocat/my-notes/hello-world</span>
              <span className="text-[var(--muted)] ml-4">→ Post page</span>
            </div>
          </div>
        </section>

        {/* Config */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-6">Configuration</h2>
          <p className="text-[var(--muted)] mb-4">
            Optionally add a <code className="bg-[var(--code-bg)] px-1 rounded">blog.config.yaml</code> to your repo root:
          </p>
          <pre className="p-4 bg-[var(--code-bg)] rounded overflow-x-auto text-sm">
{`title: "My Blog"
description: "Notes and thoughts"
theme: "gruvbox-dark"
font: "jetbrains"
accent: "#fabd2f"
show_toc: true
show_repo_link: true`}
          </pre>
        </section>

        {/* Themes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-6">Available Themes</h2>
          <div className="flex flex-wrap gap-2">
            {THEME_LIST.map((theme) => (
              <span
                key={theme}
                className="px-3 py-1 bg-[var(--code-bg)] rounded text-sm text-[var(--fg)]"
              >
                {theme}
              </span>
            ))}
          </div>
        </section>

        {/* Fonts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-6">Available Fonts</h2>
          <div className="flex flex-wrap gap-2">
            {FONT_LIST.map((font) => (
              <span
                key={font}
                className="px-3 py-1 bg-[var(--code-bg)] rounded text-sm text-[var(--fg)]"
              >
                {font}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="text-[var(--muted)] mb-4">
            Ready to try? Enter a GitHub username to explore their blogs:
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 max-w-md mx-auto"
          >
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="github-username"
              className="flex-1 px-4 py-2 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-[var(--accent)] text-[var(--bg)] rounded font-medium hover:opacity-90 transition-opacity"
            >
              Go
            </button>
          </form>
        </section>
      </div>
    </Shell>
  );
}
