'use client';

import { useState } from 'react';
import Link from 'next/link';
import { THEME_LIST, FONT_LIST } from '@/lib/themes';

export function ThemeShowcase() {
  const [selectedTheme, setSelectedTheme] = useState('rose-pine');
  const [selectedFont, setSelectedFont] = useState('geist-mono');
  const [title, setTitle] = useState('My Blog');
  const [description, setDescription] = useState('Thoughts on code and life');
  const [showToc, setShowToc] = useState(true);
  const [showRepoLink, setShowRepoLink] = useState(true);
  const [gaId, setGaId] = useState('');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const generateYaml = () => {
    const lines: string[] = [];
    if (title) lines.push(`title: "${title}"`);
    if (description) lines.push(`description: "${description}"`);
    lines.push(`theme: "${selectedTheme}"`);
    lines.push(`font: "${selectedFont}"`);
    lines.push(`show_toc: ${showToc}`);
    lines.push(`show_repo_link: ${showRepoLink}`);
    if (gaId) lines.push(`ga_id: "${gaId}"`);
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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/" className="font-bold text-lg text-[var(--fg)] hover:text-[var(--accent)] transition-colors">
            plok.sh
          </Link>
          <nav className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <span>/</span>
            <span className="text-[var(--fg)]">themes</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Compact Hero */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--fg)] mb-2">
            Pick your vibe ✨
          </h1>
          <p className="text-sm text-[var(--muted)]">
            21 themes · 8 fonts · fully customizable
          </p>
        </div>

        {/* Desktop Layout: Side by side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 mb-8">
          {/* Left: Config Builder */}
          <div className="space-y-4">
            <div className="bg-[var(--code-bg)] rounded-lg border border-[var(--border)] p-4">
              <h2 className="text-sm font-semibold text-[var(--fg)] mb-4">Theme</h2>
              <div className="grid grid-cols-3 gap-2">
                {THEME_LIST.map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setSelectedTheme(theme)}
                    className={`px-2 py-1.5 rounded border-2 transition-all text-[10px] truncate ${
                      theme === selectedTheme 
                        ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                        : 'border-[var(--border)] hover:border-[var(--accent)]/50'
                    }`}
                    data-theme={theme}
                    style={{ background: 'var(--bg)', color: 'var(--fg)' }}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[var(--code-bg)] rounded-lg border border-[var(--border)] p-4">
              <h2 className="text-sm font-semibold text-[var(--fg)] mb-4">Font</h2>
              <div className="grid grid-cols-2 gap-2">
                {FONT_LIST.map((font) => (
                  <button
                    key={font}
                    onClick={() => setSelectedFont(font)}
                    data-font={font}
                    className={`px-3 py-2 rounded border text-sm transition-all ${
                      font === selectedFont
                        ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                        : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/50'
                    }`}
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {font}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[var(--code-bg)] rounded-lg border border-[var(--border)] p-4">
              <h2 className="text-sm font-semibold text-[var(--fg)] mb-4">Options</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="show_toc"
                    checked={showToc}
                    onChange={(e) => setShowToc(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="show_toc" className="text-sm text-[var(--fg)]">Show table of contents</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="show_repo_link"
                    checked={showRepoLink}
                    onChange={(e) => setShowRepoLink(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="show_repo_link" className="text-sm text-[var(--fg)]">Show GitHub link</label>
                </div>
                <input
                  type="text"
                  placeholder="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded text-sm text-[var(--fg)] placeholder:text-[var(--muted)]"
                />
                <input
                  type="text"
                  placeholder="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded text-sm text-[var(--fg)] placeholder:text-[var(--muted)]"
                />
                <input
                  type="text"
                  placeholder="GA ID (optional)"
                  value={gaId}
                  onChange={(e) => setGaId(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded text-sm text-[var(--fg)] placeholder:text-[var(--muted)]"
                />
              </div>
            </div>
          </div>

          {/* Right: Config Preview + Live Preview */}
          <div className="flex flex-col gap-4">
            <div className="bg-[var(--code-bg)] rounded-lg border border-[var(--border)] p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-[var(--fg)]">blog.config.yaml</h2>
                <button
                  onClick={copyConfig}
                  className="px-3 py-1.5 text-xs bg-[var(--accent)] text-[var(--bg)] rounded hover:opacity-90 transition-opacity"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="text-sm font-mono text-[var(--fg)] whitespace-pre-wrap">
                {generateYaml()}
              </pre>
            </div>

            {/* Live Preview in right column */}
            <div className="flex-1 flex flex-col bg-[var(--code-bg)] rounded-lg border border-[var(--border)] p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-[var(--fg)]">Preview</h2>
                <div className="flex gap-1">
                  <button
                    onClick={() => setViewMode('desktop')}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      viewMode === 'desktop'
                        ? 'bg-[var(--accent)] text-[var(--bg)]'
                        : 'text-[var(--muted)] hover:text-[var(--fg)]'
                    }`}
                  >
                    Desktop
                  </button>
                  <button
                    onClick={() => setViewMode('mobile')}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      viewMode === 'mobile'
                        ? 'bg-[var(--accent)] text-[var(--bg)]'
                        : 'text-[var(--muted)] hover:text-[var(--fg)]'
                    }`}
                  >
                    Mobile
                  </button>
                </div>
              </div>
              <div className={`flex-1 flex transition-all ${viewMode === 'mobile' ? 'max-w-[280px] mx-auto' : ''}`}>
                <div className="flex-1 bg-[var(--bg)] rounded border border-[var(--border)] p-4 overflow-auto">
                  <h3 className="text-lg font-bold text-[var(--fg)] mb-1">{title || 'My Blog'}</h3>
                  {description && <p className="text-xs text-[var(--muted)] mb-4">{description}</p>}
                  <div className="space-y-3 text-[var(--fg)]">
                    <h4 className="text-sm font-semibold">Getting Started ✨</h4>
                    <p className="text-xs leading-relaxed">
                      This is how your blog looks with <strong>bold</strong>, <em>italic</em>, and <code className="px-1 py-0.5 bg-[var(--code-bg)] rounded text-[10px]">inline code</code>.
                    </p>
                    
                    <blockquote className="border-l-2 border-[var(--accent)] pl-3 text-xs text-[var(--muted)] italic">
                      "The best blog is the one you actually write."
                    </blockquote>

                    <pre className="bg-[var(--code-bg)] rounded p-2 text-[10px] overflow-x-auto">
                      <code>
                        <span className="text-[var(--accent)]">const</span> blog = <span className="text-[var(--muted)]">'plok.sh'</span>;{'\n'}
                        console.log(<span className="text-[var(--muted)]">`Hello, </span><span className="text-[var(--accent)]">${'{'}blog{'}'}</span><span className="text-[var(--muted)]">!`</span>);
                      </code>
                    </pre>

                    <h5 className="text-xs font-semibold">Features</h5>
                    <ul className="text-xs space-y-0.5 list-disc list-inside">
                      <li>Markdown support</li>
                      <li>Syntax highlighting</li>
                      <li><a href="#" className="text-[var(--accent)] hover:underline">Links work too</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout: Horizontal scrollers */}
        <div className="lg:hidden space-y-4 mb-8">
          <div>
            <h2 className="text-sm font-semibold text-[var(--fg)] mb-3">Themes</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6">
              {THEME_LIST.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`flex-shrink-0 px-3 py-2 rounded border-2 transition-all text-xs ${
                    theme === selectedTheme 
                      ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                      : 'border-[var(--border)]'
                  }`}
                  data-theme={theme}
                  style={{ background: 'var(--bg)', color: 'var(--fg)' }}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[var(--fg)] mb-3">Fonts</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6">
              {FONT_LIST.map((font) => (
                <button
                  key={font}
                  onClick={() => setSelectedFont(font)}
                  data-font={font}
                  className={`flex-shrink-0 px-4 py-2 rounded border text-sm transition-all ${
                    font === selectedFont
                      ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                      : 'border-[var(--border)] text-[var(--muted)]'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[var(--code-bg)] rounded-lg border border-[var(--border)] p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[var(--fg)]">Config</h2>
              <button
                onClick={copyConfig}
                className="px-3 py-1.5 text-xs bg-[var(--accent)] text-[var(--bg)] rounded"
              >
                {copied ? '✓' : 'Copy'}
              </button>
            </div>
            <pre className="text-xs font-mono text-[var(--fg)] whitespace-pre-wrap mb-3">
              {generateYaml()}
            </pre>
            <div className="space-y-2 pt-3 border-t border-[var(--border)]">
              <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded text-sm"
              />
              <input
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Mobile Preview */}
        <div className="lg:hidden border-t border-[var(--border)] pt-6">
          <h2 className="text-sm font-semibold text-[var(--fg)] mb-3">Preview</h2>
          <div className="bg-[var(--code-bg)] rounded-lg border border-[var(--border)] p-4">
            <h3 className="text-lg font-bold text-[var(--fg)] mb-1">{title || 'My Blog'}</h3>
            {description && <p className="text-xs text-[var(--muted)] mb-4">{description}</p>}
            <div className="space-y-3 text-[var(--fg)]">
              <h4 className="text-sm font-semibold">Getting Started ✨</h4>
              <p className="text-xs leading-relaxed">
                This is how your blog looks with <strong>bold</strong>, <em>italic</em>, and <code className="px-1 py-0.5 bg-[var(--bg)] rounded text-[10px]">inline code</code>.
              </p>
              
              <blockquote className="border-l-2 border-[var(--accent)] pl-3 text-xs text-[var(--muted)] italic">
                "The best blog is the one you actually write."
              </blockquote>

              <pre className="bg-[var(--bg)] rounded p-2 text-[10px] overflow-x-auto">
                <code>
                  <span className="text-[var(--accent)]">const</span> blog = <span className="text-[var(--muted)]">'plok.sh'</span>;
                </code>
              </pre>

              <h5 className="text-xs font-semibold">Features</h5>
              <ul className="text-xs space-y-0.5 list-disc list-inside">
                <li>Markdown support</li>
                <li>Syntax highlighting</li>
                <li><a href="#" className="text-[var(--accent)] hover:underline">Links work too</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
