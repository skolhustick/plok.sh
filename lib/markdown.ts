import MarkdownIt from 'markdown-it';
import { createHighlighter, type Highlighter } from 'shiki';
import type { RenderedPost, TocItem } from '@/types/blog';
import { slugifyHeading, humanizeSlug } from '@/lib/slug';
import { mapThemeToShikiTheme, type ThemeName } from '@/lib/themes';

// Module-level highlighter cache
const highlighterCache = new Map<string, Promise<Highlighter>>();

async function getHighlighter(theme: string): Promise<Highlighter> {
  if (!highlighterCache.has(theme)) {
    highlighterCache.set(
      theme,
      createHighlighter({
        themes: [theme],
        langs: [
          'javascript',
          'typescript',
          'jsx',
          'tsx',
          'json',
          'yaml',
          'markdown',
          'bash',
          'shell',
          'css',
          'html',
          'python',
          'rust',
          'go',
          'sql',
          'graphql',
        ],
      })
    );
  }
  return highlighterCache.get(theme)!;
}

/**
 * Render markdown to HTML with syntax highlighting and TOC extraction
 */
export async function renderMarkdown(
  text: string,
  themeName: ThemeName,
  slug: string
): Promise<RenderedPost> {
  const shikiTheme = mapThemeToShikiTheme(themeName);
  const highlighter = await getHighlighter(shikiTheme);

  const toc: TocItem[] = [];
  let firstH1: string | null = null;

  // Configure markdown-it
  const md = new MarkdownIt({
    html: false, // Security: disable raw HTML
    linkify: true,
    typographer: true,
  });

  // Custom heading renderer for TOC extraction and anchor IDs
  const defaultHeadingRenderer =
    md.renderer.rules.heading_open ||
    ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));

  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const level = parseInt(token.tag.slice(1), 10);
    const contentToken = tokens[idx + 1];
    const text = contentToken?.content || '';
    const id = slugifyHeading(text);

    // Extract first H1 as title
    if (level === 1 && firstH1 === null) {
      firstH1 = text;
    }

    // Collect h2/h3 for TOC
    if (level === 2 || level === 3) {
      toc.push({ level, text, id });
    }

    // Add id attribute to heading
    token.attrSet('id', id);

    return defaultHeadingRenderer(tokens, idx, options, env, self);
  };

  // Custom fence renderer for Shiki syntax highlighting
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    const lang = token.info.trim() || 'text';
    const code = token.content;

    try {
      const html = highlighter.codeToHtml(code, {
        lang: highlighter.getLoadedLanguages().includes(lang) ? lang : 'text',
        theme: shikiTheme,
      });
      return html;
    } catch {
      // Fallback to escaped code block
      const escaped = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<pre><code class="language-${lang}">${escaped}</code></pre>`;
    }
  };

  const html = md.render(text);

  // Determine title: first H1 or humanized slug
  const title = firstH1 || humanizeSlug(slug);

  return { title, html, toc };
}
