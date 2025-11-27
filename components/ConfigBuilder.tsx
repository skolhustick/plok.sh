'use client';

import { useState } from 'react';
import { THEME_LIST, FONT_LIST } from '@/lib/themes';

interface ConfigBuilderProps {
  initialTheme: string;
  onConfigChange: (config: ConfigState) => void;
}

export interface ConfigState {
  title: string;
  description: string;
  theme: string;
  font: string;
  accent: string;
  show_toc: boolean;
  show_repo_link: boolean;
}

export function ConfigBuilder({ initialTheme, onConfigChange }: ConfigBuilderProps) {
  const [config, setConfig] = useState<ConfigState>({
    title: 'My Blog',
    description: 'A blog powered by plok.sh',
    theme: initialTheme,
    font: 'system',
    accent: '',
    show_toc: true,
    show_repo_link: true,
  });

  const [copied, setCopied] = useState(false);

  const updateConfig = (updates: Partial<ConfigState>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  const generateYaml = () => {
    const lines = [
      `title: "${config.title}"`,
      `description: "${config.description}"`,
      `theme: "${config.theme}"`,
      `font: "${config.font}"`,
    ];
    
    if (config.accent) {
      lines.push(`accent: "${config.accent}"`);
    }
    
    lines.push(`show_toc: ${config.show_toc}`);
    lines.push(`show_repo_link: ${config.show_repo_link}`);
    
    return lines.join('\n');
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generateYaml());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--code-bg)]">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Title & Description */}
        <div className="space-y-2">
          <input
            type="text"
            value={config.title}
            onChange={(e) => updateConfig({ title: e.target.value })}
            placeholder="title"
            className="w-full px-2 py-1.5 text-sm rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
          />
          <input
            type="text"
            value={config.description}
            onChange={(e) => updateConfig({ description: e.target.value })}
            placeholder="description"
            className="w-full px-2 py-1.5 text-sm rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>

        {/* Accent & Toggles */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={config.accent}
              onChange={(e) => updateConfig({ accent: e.target.value })}
              placeholder="accent #hex"
              className="flex-1 px-2 py-1.5 text-sm rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)] font-mono"
            />
            <input
              type="color"
              value={config.accent || '#888888'}
              onChange={(e) => updateConfig({ accent: e.target.value })}
              className="w-8 h-8 rounded border border-[var(--border)] bg-[var(--bg)] cursor-pointer"
            />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={config.show_toc}
                onChange={(e) => updateConfig({ show_toc: e.target.checked })}
                className="w-3.5 h-3.5 rounded border-[var(--border)] accent-[var(--accent)]"
              />
              <span className="text-xs text-[var(--muted)]">toc</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={config.show_repo_link}
                onChange={(e) => updateConfig({ show_repo_link: e.target.checked })}
                className="w-3.5 h-3.5 rounded border-[var(--border)] accent-[var(--accent)]"
              />
              <span className="text-xs text-[var(--muted)]">repo link</span>
            </label>
          </div>
        </div>

        {/* Font */}
        <div>
          <div className="text-xs text-[var(--muted)] mb-1">font</div>
          <div className="flex flex-wrap gap-1">
            {FONT_LIST.map((f) => (
              <button
                key={f}
                onClick={() => updateConfig({ font: f })}
                className={`px-2 py-1 text-xs rounded border transition-colors ${
                  f === config.font
                    ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10'
                    : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--fg)]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Copy Config */}
        <div>
          <button
            onClick={copyToClipboard}
            className="w-full px-3 py-1.5 text-sm rounded border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
          >
            {copied ? '✓ Copied!' : 'Copy config'}
          </button>
          <pre className="mt-2 p-2 rounded bg-[var(--bg)] text-[10px] font-mono text-[var(--muted)] overflow-hidden max-h-16 leading-tight">
            {generateYaml()}
          </pre>
        </div>
      </div>

      {/* Theme selector */}
      <div className="mt-4 pt-4 border-t border-[var(--border)]">
        <div className="flex flex-wrap gap-1.5">
          {THEME_LIST.map((t) => (
            <button
              key={t}
              onClick={() => updateConfig({ theme: t })}
              className={`px-2 py-1 text-xs rounded border transition-colors ${
                t === config.theme
                  ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10'
                  : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--fg)]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
