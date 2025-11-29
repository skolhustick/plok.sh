'use client';

import { useState } from 'react';
import type { BlogConfig } from '@/types/blog';

interface ConfigBadgeProps {
  config: BlogConfig;
  hasConfigFile: boolean;
  hasHeader: boolean;
  hasFooter: boolean;
  hasLinks: boolean;
  user: string;
  repo: string;
}

export function ConfigBadge({ config, hasConfigFile, hasHeader, hasFooter, hasLinks, user, repo }: ConfigBadgeProps) {
  const [showModal, setShowModal] = useState(false);

  if (!hasConfigFile) {
    return (
      <a
        href="/themes"
        className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add config
      </a>
    );
  }

  const configYaml = `# blog.config.yaml
title: "${config.title}"
${config.description ? `description: "${config.description}"` : '# description: "Your blog description"'}
theme: "${config.theme}"
font: "${config.font}"
${config.accent ? `accent: "${config.accent}"` : '# accent: "#c4a7e7"'}
show_toc: ${config.show_toc}
show_repo_link: ${config.show_repo_link}
${config.ga_id ? `ga_id: "${config.ga_id}"` : '# ga_id: "G-XXXXXXXXXX"'}`;

  const partialsStatus = [
    hasHeader ? '✓ blog.header.md' : '○ blog.header.md',
    hasFooter ? '✓ blog.footer.md' : '○ blog.footer.md',
  ].join('\n');

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Config
      </button>

      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-[var(--bg)] border border-[var(--border)] rounded-lg max-w-lg w-full max-h-[80vh] overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <h2 className="font-semibold text-[var(--fg)]">Blog Config</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 overflow-auto max-h-[60vh]">
              {/* Files Status */}
              <p className="text-xs text-[var(--muted)] mb-3">
                Files detected
              </p>
              <div className="bg-[var(--code-bg)] p-4 rounded text-sm font-mono space-y-1 mb-4">
                <div className={hasConfigFile ? 'text-green-500' : 'text-[var(--muted)]'}>
                  {hasConfigFile ? '✓' : '○'} blog.config.yaml
                </div>
                <div className={hasHeader ? 'text-green-500' : 'text-[var(--muted)]'}>
                  {hasHeader ? '✓' : '○'} blog.header.md
                </div>
                <div className={hasFooter ? 'text-green-500' : 'text-[var(--muted)]'}>
                  {hasFooter ? '✓' : '○'} blog.footer.md
                </div>
                <div className={hasLinks ? 'text-green-500' : 'text-[var(--muted)]'}>
                  {hasLinks ? '✓' : '○'} links.yaml
                </div>
              </div>

              <p className="text-xs text-[var(--muted)] mb-3">
                Current config
              </p>
              <pre className="bg-[var(--code-bg)] p-4 rounded text-sm overflow-x-auto font-mono text-[var(--fg)]">
                {configYaml}
              </pre>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-[var(--border)] bg-[var(--code-bg)]">
              <a
                href={`https://github.com/${user}/${repo}/blob/main/blog/blog.config.yaml`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                Edit on GitHub →
              </a>
              <a
                href="/themes"
                className="text-xs text-[var(--accent)] hover:underline"
              >
                Browse themes
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
