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
 * Parse frontmatter from markdown content
 */
export function parseFrontmatter(text: string): {
  content: string;
  hasFrontmatter: boolean;
  title?: string;
  date?: string;
  description?: string;
} {
  const frontmatterMatch = text.match(/^---\n([\s\S]*?)\n---\n?/);
  
  if (!frontmatterMatch) {
    return { content: text, hasFrontmatter: false };
  }

  const frontmatter = frontmatterMatch[1];
  const content = text.slice(frontmatterMatch[0].length);

  const titleMatch = frontmatter.match(/^title:\s*["']?(.+?)["']?$/m);
  const dateMatch = frontmatter.match(/^date:\s*["']?(.+?)["']?$/m);
  const descMatch = frontmatter.match(/^description:\s*["']?(.+?)["']?$/m);

  return {
    content,
    hasFrontmatter: true,
    title: titleMatch?.[1],
    date: dateMatch?.[1],
    description: descMatch?.[1],
  };
}

/**
 * Render markdown to HTML with syntax highlighting and TOC extraction
 */
export async function renderMarkdown(
  text: string,
  themeName: ThemeName,
  slug: string
): Promise<RenderedPost> {
  // Strip frontmatter before rendering
  const { content: markdownContent, title: frontmatterTitle, date, description, hasFrontmatter } = parseFrontmatter(text);

  const shikiTheme = mapThemeToShikiTheme(themeName);
  const highlighter = await getHighlighter(shikiTheme);

  const toc: TocItem[] = [];

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

    // Collect h1/h2/h3 for TOC
    if (level === 1 || level === 2 || level === 3) {
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

  const html = md.render(markdownContent);

  // Determine title: frontmatter title or humanized slug (let user handle their own H1s)
  const title = frontmatterTitle || humanizeSlug(slug);

  return { title, html, toc, date, description, hasFrontmatter };
}

/**
 * Render partial markdown (header/footer) to HTML.
 * Lightweight version - no TOC extraction, no frontmatter parsing.
 * Returns null if content is empty or parsing fails.
 */
export async function renderPartialMarkdown(
  text: string,
  themeName: ThemeName
): Promise<string | null> {
  // Empty or whitespace-only content
  if (!text.trim()) {
    return null;
  }

  try {
    const shikiTheme = mapThemeToShikiTheme(themeName);
    const highlighter = await getHighlighter(shikiTheme);

    const md = new MarkdownIt({
      html: false, // Security: disable raw HTML
      linkify: true,
      typographer: true,
    });

    // Custom fence renderer for Shiki syntax highlighting (same as main render)
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
        const escaped = code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        return `<pre><code class="language-${lang}">${escaped}</code></pre>`;
      }
    };

    return md.render(text);
  } catch (error) {
    // Log for debugging but don't block post rendering
    console.error('Failed to render partial markdown:', error);
    return null;
  }
}
