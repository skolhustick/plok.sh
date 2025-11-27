'use client';

import { useState } from 'react';
import Link from 'next/link';
import { THEME_LIST, FONT_LIST } from '@/lib/themes';

// Theme color palettes for previews
const THEME_COLORS: Record<string, { bg: string; fg: string; accent: string; muted: string; code: string }> = {
  'github-light': { bg: '#ffffff', fg: '#24292f', accent: '#0969da', muted: '#656d76', code: '#f6f8fa' },
  'github-dark': { bg: '#0d1117', fg: '#e6edf3', accent: '#58a6ff', muted: '#7d8590', code: '#161b22' },
  'one-dark': { bg: '#282c34', fg: '#abb2bf', accent: '#61afef', muted: '#5c6370', code: '#21252b' },
  'gruvbox-dark': { bg: '#282828', fg: '#ebdbb2', accent: '#fe8019', muted: '#928374', code: '#1d2021' },
  'gruvbox-light': { bg: '#fbf1c7', fg: '#3c3836', accent: '#af3a03', muted: '#928374', code: '#f2e5bc' },
  'solarized-dark': { bg: '#002b36', fg: '#839496', accent: '#2aa198', muted: '#586e75', code: '#073642' },
  'solarized-light': { bg: '#fdf6e3', fg: '#657b83', accent: '#2aa198', muted: '#93a1a1', code: '#eee8d5' },
  'nord': { bg: '#2e3440', fg: '#eceff4', accent: '#88c0d0', muted: '#4c566a', code: '#3b4252' },
  'dracula': { bg: '#282a36', fg: '#f8f8f2', accent: '#bd93f9', muted: '#6272a4', code: '#21222c' },
  'tokyo-night': { bg: '#1a1b26', fg: '#a9b1d6', accent: '#7aa2f7', muted: '#565f89', code: '#16161e' },
  'monokai': { bg: '#272822', fg: '#f8f8f2', accent: '#a6e22e', muted: '#75715e', code: '#1e1f1c' },
  'rose-pine': { bg: '#191724', fg: '#e0def4', accent: '#c4a7e7', muted: '#6e6a86', code: '#1f1d2e' },
  'rose-pine-moon': { bg: '#232136', fg: '#e0def4', accent: '#c4a7e7', muted: '#6e6a86', code: '#2a273f' },
  'rose-pine-dawn': { bg: '#faf4ed', fg: '#575279', accent: '#907aa9', muted: '#9893a5', code: '#f2e9e1' },
};

interface ThemeShowcaseProps {
  initialHtml: string;
}

export function ThemeShowcase({ initialHtml }: ThemeShowcaseProps) {
  const [selectedTheme, setSelectedTheme] = useState('rose-pine');
  const [selectedFont, setSelectedFont] = useState('geist-mono');
  const [copied, setCopied] = useState(false);
  const [title, setTitle] = useState('My Blog');
  const [description, setDescription] = useState('');

  const colors = THEME_COLORS[selectedTheme] || THEME_COLORS['rose-pine'];

  const generateYaml = () => {
    const lines = [`theme: "${selectedTheme}"`, `font: "${selectedFont}"`];
    if (title && title !== 'My Blog') lines.unshift(`title: "${title}"`);
    if (description) lines.splice(1, 0, `description: "${description}"`);
    return lines.join('\n');
  };

  const copyConfig = async () => {
    await navigator.clipboard.writeText(generateYaml());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="min-h-screen bg-[var(--bg)] text-[var(--fg)]"
      style={{ fontFamily: 'var(--font-body)' }}
      data-theme={selectedTheme}
      data-font={selectedFont}
    >
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="font-bold text-lg text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
          >
            plok.sh
          </Link>
          <nav className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <span>/</span>
            <span className="text-[var(--fg)]">themes</span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[var(--fg)] mb-4">
            Pick your vibe ✨
          </h1>
          <p className="text-lg text-[var(--muted)] max-w-md mx-auto">
            14 beautiful themes to make your blog feel like home
          </p>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-16">
          {THEME_LIST.map((theme) => {
            const c = THEME_COLORS[theme];
            const isSelected = theme === selectedTheme;
            return (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                  isSelected 
                    ? 'border-[var(--accent)] ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--bg)] scale-105' 
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: c.bg }}
              >
                {/* Mini preview */}
                <div className="absolute inset-2 flex flex-col gap-1">
                  <div className="h-1.5 rounded-full w-3/4" style={{ backgroundColor: c.fg, opacity: 0.8 }} />
                  <div className="h-1 rounded-full w-1/2" style={{ backgroundColor: c.muted }} />
                  <div className="flex-1 mt-1 rounded" style={{ backgroundColor: c.code }}>
                    <div className="p-1 space-y-0.5">
                      <div className="h-0.5 rounded-full w-2/3" style={{ backgroundColor: c.accent }} />
                      <div className="h-0.5 rounded-full w-1/2" style={{ backgroundColor: c.muted }} />
                    </div>
                  </div>
                </div>
                {/* Theme name tooltip */}
                <div 
                  className="absolute bottom-0 inset-x-0 py-1.5 text-[10px] font-medium text-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: c.code, color: c.fg }}
                >
                  {theme}
                </div>
                {/* Selected checkmark */}
                {isSelected && (
                  <div 
                    className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                    style={{ backgroundColor: c.accent, color: c.bg }}
                  >
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Font Selection */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-sm font-medium text-[var(--muted)] mb-4 uppercase tracking-wide">
            Choose your font
          </h2>
          <div className="flex gap-2">
            {FONT_LIST.map((font) => (
              <button
                key={font}
                onClick={() => setSelectedFont(font)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  font === selectedFont
                    ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                    : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--fg)]'
                }`}
              >
                <span className="text-sm">{font}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Config Generator */}
        <div className="max-w-md mx-auto mb-16">
          <div className="bg-[var(--code-bg)] rounded-xl p-6 border border-[var(--border)]">
            <h2 className="text-lg font-semibold text-[var(--fg)] mb-4 text-center">
              Your config
            </h2>
            
            <div className="space-y-3 mb-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog title (optional)"
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--muted)]"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--muted)]"
              />
            </div>

            <pre className="p-4 rounded-lg bg-[var(--bg)] text-sm font-mono text-[var(--fg)] mb-4 overflow-x-auto">
              {generateYaml()}
            </pre>

            <button
              onClick={copyConfig}
              className="w-full py-3 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-medium hover:opacity-90 transition-opacity"
            >
              {copied ? '✓ Copied to clipboard!' : 'Copy config'}
            </button>

            <p className="text-xs text-[var(--muted)] text-center mt-4">
              Save as <code className="bg-[var(--bg)] px-1.5 py-0.5 rounded">/blog/blog.config.yaml</code>
            </p>
          </div>
        </div>

        {/* Live Preview */}
        <div className="mb-16">
          <h2 className="text-center text-sm font-medium text-[var(--muted)] mb-6 uppercase tracking-wide">
            Live Preview
          </h2>
          <div className="bg-[var(--code-bg)] rounded-xl border border-[var(--border)] overflow-hidden">
            {/* Fake browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-[var(--bg)] rounded-md px-3 py-1 text-xs text-[var(--muted)] font-mono">
                  plok.sh/you/your-repo
                </div>
              </div>
            </div>
            
            {/* Preview content */}
            <div className="p-8">
              <article className="max-w-2xl mx-auto">
                <header className="mb-8 pb-6 border-b border-[var(--border)]">
                  <h1 className="text-2xl font-bold text-[var(--fg)] mb-2">
                    {title || 'My Blog'}
                  </h1>
                  {description && (
                    <p className="text-[var(--muted)]">{description}</p>
                  )}
                </header>
                <div
                  className="prose prose-invert max-w-none
                    prose-headings:text-[var(--fg)]
                    prose-p:text-[var(--fg)]
                    prose-a:text-[var(--link)] hover:prose-a:text-[var(--link-hover)]
                    prose-strong:text-[var(--fg)]
                    prose-code:text-[var(--code-fg)] prose-code:bg-[var(--code-bg)]
                    prose-pre:bg-[var(--code-bg)]
                    prose-blockquote:border-[var(--accent)] prose-blockquote:text-[var(--muted)]
                    prose-li:text-[var(--fg)]"
                  dangerouslySetInnerHTML={{ __html: initialHtml }}
                />
              </article>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center">
          <p className="text-[var(--muted)] mb-4">
            Ready to start blogging?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-medium hover:opacity-90 transition-opacity"
          >
            Get started →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <a 
            href="https://plok.sh" 
            className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            <span className="font-bold">plok.sh</span>
            <span className="mx-2">·</span>
            <span>GitHub to blog, instantly</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
