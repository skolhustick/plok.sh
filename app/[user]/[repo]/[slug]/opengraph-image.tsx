import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Theme colors for OG images
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

// Simple frontmatter parser for edge
function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = match[1];
  const title = fm.match(/^title:\s*["']?(.+?)["']?$/m)?.[1];
  const date = fm.match(/^date:\s*["']?(.+?)["']?$/m)?.[1];
  const description = fm.match(/^description:\s*["']?(.+?)["']?$/m)?.[1];
  return { title, date, description };
}

export default async function Image({
  params,
}: {
  params: Promise<{ user: string; repo: string; slug: string }>;
}) {
  const { user, repo, slug } = await params;

  let theme = 'rose-pine';
  let blogTitle = repo;
  let title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  let description = '';
  let date = '';

  try {
    // Fetch config (lightweight)
    const configRes = await fetch(
      `https://raw.githubusercontent.com/${user}/${repo}/main/blog/blog.config.yaml`
    );
    if (configRes.ok) {
      const yaml = await configRes.text();
      const themeMatch = yaml.match(/^theme:\s*["']?(.+?)["']?$/m);
      const titleMatch = yaml.match(/^title:\s*["']?(.+?)["']?$/m);
      if (themeMatch) theme = themeMatch[1];
      if (titleMatch) blogTitle = titleMatch[1];
    }

    // Fetch post content
    const postRes = await fetch(
      `https://raw.githubusercontent.com/${user}/${repo}/main/blog/${slug}.md`
    );
    if (postRes.ok) {
      const content = await postRes.text();
      const parsed = parseFrontmatter(content);
      if (parsed.title) title = parsed.title;
      if (parsed.description) description = parsed.description;
      if (parsed.date) date = parsed.date;
    }
  } catch {
    // Use defaults on error
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
        {/* Top bar with branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: colors.fg,
              }}
            >
              plok.sh
            </span>
            <span style={{ color: colors.muted, fontSize: '24px' }}>/</span>
            <span style={{ color: colors.muted, fontSize: '24px' }}>{user}</span>
            <span style={{ color: colors.muted, fontSize: '24px' }}>/</span>
            <span style={{ color: colors.accent, fontSize: '24px' }}>{repo}</span>
          </div>
          {date && (
            <span style={{ color: colors.muted, fontSize: '20px' }}>
              {new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
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
              fontSize: title.length > 50 ? '48px' : '64px',
              fontWeight: 700,
              color: colors.fg,
              lineHeight: 1.2,
              marginBottom: '20px',
              maxWidth: '900px',
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
                maxWidth: '800px',
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
            paddingTop: '30px',
          }}
        >
          <span style={{ color: colors.muted, fontSize: '22px' }}>{blogTitle}</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: colors.accent,
              fontSize: '20px',
            }}
          >
            <span>Read on plok.sh →</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
