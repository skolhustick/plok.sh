import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'User blogs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Default rose-pine theme
const colors = {
  bg: '#191724',
  fg: '#e0def4',
  accent: '#c4a7e7',
  muted: '#6e6a86',
};

export default async function Image({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await params;

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
          <span style={{ color: colors.accent, fontSize: '28px', fontWeight: 600 }}>{user}</span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* GitHub-style avatar placeholder */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '60px',
              backgroundColor: colors.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
              fontSize: '48px',
              color: colors.bg,
              fontWeight: 700,
            }}
          >
            {user.charAt(0).toUpperCase()}
          </div>
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: colors.fg,
              marginBottom: '16px',
            }}
          >
            @{user}
          </h1>
          <p
            style={{
              fontSize: '28px',
              color: colors.muted,
            }}
          >
            Blogs on plok.sh
          </p>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: `2px solid ${colors.accent}`,
            paddingTop: '30px',
          }}
        >
          <span style={{ color: colors.accent, fontSize: '22px' }}>
            GitHub to blog, instantly
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
