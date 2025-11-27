'use client';

import { useState, useEffect } from 'react';
import { ConfigBuilder, type ConfigState } from '@/components/ConfigBuilder';
import { Toc } from '@/components/Toc';
import type { TocItem } from '@/types/blog';

interface ThemePreviewClientProps {
  initialTheme: string;
  initialHtml: string;
  initialToc: TocItem[];
}

export function ThemePreviewClient({ 
  initialTheme, 
  initialHtml, 
  initialToc 
}: ThemePreviewClientProps) {
  const [config, setConfig] = useState<ConfigState>({
    title: 'My Blog',
    description: 'A blog powered by plok.sh',
    theme: initialTheme,
    font: 'system',
    accent: '',
    show_toc: true,
    show_repo_link: true,
  });

  // Apply custom accent color as CSS variable
  const customStyles = config.accent ? {
    '--accent': config.accent,
    '--link-hover': config.accent,
  } as React.CSSProperties : {};

  return (
    <div 
      className="min-h-screen bg-[var(--bg)] text-[var(--fg)]"
      style={{ fontFamily: 'var(--font-body)', ...customStyles }}
      data-theme={config.theme}
      data-font={config.font}
    >
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <a
            href="/"
            className="font-bold text-lg text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
          >
            plok.sh
          </a>
          <nav className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <span>/</span>
            <span className="text-[var(--fg)]">themes</span>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Config Builder at top */}
        <div className="mb-8">
          <ConfigBuilder
            initialTheme={initialTheme}
            onConfigChange={setConfig}
          />
        </div>

        {/* Simulated blog header */}
        <header className="mb-8 pb-8 border-b border-[var(--border)]">
          <h1 className="text-3xl font-bold text-[var(--fg)]">
            {config.title || 'My Blog'}
          </h1>
          {config.description && (
            <p className="mt-2 text-[var(--muted)]">{config.description}</p>
          )}
          {config.show_repo_link && (
            <a
              href="#"
              className="inline-block mt-4 text-sm text-[var(--link)] hover:text-[var(--link-hover)]"
            >
              View on GitHub →
            </a>
          )}
        </header>

        {/* Post content */}
        <div className="flex gap-8">
          <article className="flex-1 min-w-0">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-[var(--fg)]">Theme Preview</h1>
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
                prose-li:text-[var(--fg)]
                prose-th:text-[var(--fg)]
                prose-td:text-[var(--fg)]"
              dangerouslySetInnerHTML={{ __html: initialHtml }}
            />
          </article>

          {/* TOC */}
          {config.show_toc && initialToc.length > 0 && (
            <aside className="hidden lg:block w-48 flex-shrink-0">
              <div className="sticky top-8">
                <Toc items={initialToc} />
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto px-4 py-4 text-sm text-[var(--muted)]">
          Powered by{' '}
          <a
            href="https://github.com"
            className="text-[var(--link)] hover:text-[var(--link-hover)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
