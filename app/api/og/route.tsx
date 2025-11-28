import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const THEME_COLORS: Record<string, { bg: string; fg: string; accent: string; muted: string }> = {
  'github-light': { bg: '#ffffff', fg: '#24292f', accent: '#0969da', muted: '#656d76' },
  'github-dark': { bg: '#0d1117', fg: '#e6edf3', accent: '#58a6ff', muted: '#7d8590' },
  'one-dark': { bg: '#282c34', fg: '#abb2bf', accent: '#61afef', muted: '#5c6370' },
  'gruvbox-dark': { bg: '#282828', fg: '#ebdbb2', accent: '#fe8019', muted: '#928374' },
  'gruvbox-light': { bg: '#fbf1c7', fg: '#3c3836', accent: '#af3a03', muted: '#928374' },
  'solarized-dark': { bg: '#002b36', fg: '#839496', accent: '#2aa198', muted: '#586e75' },
  'solarized-light': { bg: '#fdf6e3', fg: '#657b83', accent: '#2aa198', muted: '#93a1a1' },
  'nord': { bg: '#2e3440', fg: '#eceff4', accent: '#88c0d0', muted: '#4c566a' },
  'dracula': { bg: '#282a36', fg: '#f8f8f2', accent: '#bd93f9', muted: '#6272a4' },
  'tokyo-night': { bg: '#1a1b26', fg: '#a9b1d6', accent: '#7aa2f7', muted: '#565f89' },
  'monokai': { bg: '#272822', fg: '#f8f8f2', accent: '#a6e22e', muted: '#75715e' },
  'rose-pine': { bg: '#191724', fg: '#e0def4', accent: '#c4a7e7', muted: '#6e6a86' },
  'rose-pine-moon': { bg: '#232136', fg: '#e0def4', accent: '#c4a7e7', muted: '#6e6a86' },
  'rose-pine-dawn': { bg: '#faf4ed', fg: '#575279', accent: '#907aa9', muted: '#9893a5' },
  'vesper': { bg: '#101010', fg: '#b0b0b0', accent: '#ffc799', muted: '#606060' },
  'everforest': { bg: '#2d353b', fg: '#d3c6aa', accent: '#a7c080', muted: '#859289' },
  'catppuccin-latte': { bg: '#eff1f5', fg: '#4c4f69', accent: '#8839ef', muted: '#8c8fa1' },
  'catppuccin-frappe': { bg: '#303446', fg: '#c6d0f5', accent: '#ca9ee6', muted: '#a5adce' },
  'catppuccin-macchiato': { bg: '#24273a', fg: '#cad3f5', accent: '#c6a0f6', muted: '#a5adcb' },
  'catppuccin-mocha': { bg: '#1e1e2e', fg: '#cdd6f4', accent: '#cba6f7', muted: '#a6adc8' },
  'ayu-dark': { bg: '#0d1017', fg: '#bfbdb6', accent: '#ffb454', muted: '#636a72' },
};

function humanizeSlug(slug: string): string {
  const baseName = slug.split('/').pop() || slug;
  return baseName
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user') || '';
  const repo = searchParams.get('repo') || '';
  const slug = searchParams.get('slug') || '';
  
  let theme = 'rose-pine';
  let title = humanizeSlug(slug);
  let description = '';
  let blogTitle = repo;

  // Fetch blog config for theme
  try {
    const configRes = await fetch(
      `https://raw.githubusercontent.com/${user}/${repo}/main/blog/blog.config.yaml`
    );
    if (configRes.ok) {
      const yaml = await configRes.text();
      const themeMatch = yaml.match(/^theme:\s*["']?(.+?)["']?$/m);
      const blogTitleMatch = yaml.match(/^title:\s*["']?(.+?)["']?$/m);
      if (themeMatch) theme = themeMatch[1];
      if (blogTitleMatch) blogTitle = blogTitleMatch[1];
    }
  } catch {
    // Use defaults
  }

  // Fetch post content for title/description
  try {
    const postRes = await fetch(
      `https://raw.githubusercontent.com/${user}/${repo}/main/blog/${slug}.md`
    );
    if (postRes.ok) {
      const content = await postRes.text();
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const titleMatch = frontmatter.match(/^title:\s*["']?(.+?)["']?$/m);
        const descMatch = frontmatter.match(/^description:\s*["']?(.+?)["']?$/m);
        if (titleMatch) title = titleMatch[1];
        if (descMatch) description = descMatch[1];
      }
    }
  } catch {
    // Use defaults
  }

  const colors = THEME_COLORS[theme] || THEME_COLORS['rose-pine'];

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors.bg,
          padding: '60px',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <span style={{ fontSize: '24px', fontWeight: 700, color: colors.fg }}>
            plok.sh
          </span>
          <span style={{ color: colors.muted, fontSize: '24px' }}>/</span>
          <span style={{ color: colors.muted, fontSize: '24px' }}>{user}</span>
          <span style={{ color: colors.muted, fontSize: '24px' }}>/</span>
          <span style={{ color: colors.accent, fontSize: '24px' }}>{repo}</span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: colors.fg,
              lineHeight: 1.1,
              marginBottom: '20px',
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                fontSize: '28px',
                color: colors.muted,
                lineHeight: 1.4,
                maxWidth: '900px',
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `2px solid ${colors.accent}`,
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: colors.muted, fontSize: '20px' }}>📝</span>
            <span style={{ color: colors.muted, fontSize: '20px' }}>{blogTitle}</span>
          </div>
          <span style={{ color: colors.accent, fontSize: '18px' }}>
            plok.sh/{user}/{repo}/{slug}
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
