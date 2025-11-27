import { ImageResponse } from 'next/og';
import { getRepoConfig } from '@/lib/config';

export const runtime = 'edge';
export const alt = 'Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const THEME_COLORS: Record<string, { bg: string; fg: string; accent: string; muted: string }> = {
  'github-light': { bg: '#ffffff', fg: '#24292f', accent: '#0969da', muted: '#656d76' },
  'github-dark': { bg: '#0d1117', fg: '#e6edf3', accent: '#58a6ff', muted: '#7d8590' },
  'rose-pine': { bg: '#191724', fg: '#e0def4', accent: '#c4a7e7', muted: '#6e6a86' },
  'rose-pine-moon': { bg: '#232136', fg: '#e0def4', accent: '#c4a7e7', muted: '#6e6a86' },
  'rose-pine-dawn': { bg: '#faf4ed', fg: '#575279', accent: '#907aa9', muted: '#9893a5' },
  'nord': { bg: '#2e3440', fg: '#eceff4', accent: '#88c0d0', muted: '#4c566a' },
  'dracula': { bg: '#282a36', fg: '#f8f8f2', accent: '#bd93f9', muted: '#6272a4' },
  'tokyo-night': { bg: '#1a1b26', fg: '#a9b1d6', accent: '#7aa2f7', muted: '#565f89' },
  'gruvbox-dark': { bg: '#282828', fg: '#ebdbb2', accent: '#fe8019', muted: '#928374' },
  'one-dark': { bg: '#282c34', fg: '#abb2bf', accent: '#61afef', muted: '#5c6370' },
  'monokai': { bg: '#272822', fg: '#f8f8f2', accent: '#a6e22e', muted: '#75715e' },
  'solarized-dark': { bg: '#002b36', fg: '#839496', accent: '#2aa198', muted: '#586e75' },
  'solarized-light': { bg: '#fdf6e3', fg: '#657b83', accent: '#2aa198', muted: '#93a1a1' },
  'gruvbox-light': { bg: '#fbf1c7', fg: '#3c3836', accent: '#af3a03', muted: '#928374' },
};

export default async function Image({
  params,
}: {
  params: Promise<{ user: string; repo: string }>;
}) {
  const { user, repo } = await params;

  const configResult = await getRepoConfig(user, repo);
  const config = configResult.ok ? configResult.value : null;
  
  const theme = config?.theme || 'rose-pine';
  const colors = THEME_COLORS[theme] || THEME_COLORS['rose-pine'];
  
  const title = config?.title || repo;
  const description = config?.description || `Blog posts from ${user}/${repo}`;

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
            marginBottom: '60px',
          }}
        >
          <span style={{ fontSize: '28px', fontWeight: 700, color: colors.fg }}>
            plok.sh
          </span>
          <span style={{ color: colors.muted, fontSize: '28px' }}>/</span>
          <span style={{ color: colors.muted, fontSize: '28px' }}>{user}</span>
          <span style={{ color: colors.muted, fontSize: '28px' }}>/</span>
          <span style={{ color: colors.accent, fontSize: '28px', fontWeight: 600 }}>{repo}</span>
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
              fontSize: '72px',
              fontWeight: 700,
              color: colors.fg,
              lineHeight: 1.1,
              marginBottom: '24px',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: colors.muted,
              lineHeight: 1.4,
              maxWidth: '800px',
            }}
          >
            {description}
          </p>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: colors.muted, fontSize: '22px' }}>📝</span>
            <span style={{ color: colors.muted, fontSize: '22px' }}>Blog</span>
          </div>
          <span style={{ color: colors.accent, fontSize: '20px' }}>
            plok.sh/{user}/{repo}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
