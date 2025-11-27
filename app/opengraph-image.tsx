import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'plok.sh - GitHub to blog, instantly';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const colors = {
  bg: '#191724',
  fg: '#e0def4',
  accent: '#c4a7e7',
  muted: '#6e6a86',
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.bg,
          padding: '60px',
        }}
      >
        {/* Logo */}
        <h1
          style={{
            fontSize: '96px',
            fontWeight: 700,
            color: colors.fg,
            marginBottom: '24px',
          }}
        >
          plok.sh
        </h1>
        
        {/* Tagline */}
        <p
          style={{
            fontSize: '36px',
            color: colors.muted,
            marginBottom: '48px',
          }}
        >
          GitHub to blog, instantly
        </p>

        {/* Feature pills */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
          }}
        >
          {['No database', 'No auth', 'No dashboard'].map((text) => (
            <div
              key={text}
              style={{
                padding: '12px 24px',
                borderRadius: '999px',
                border: `2px solid ${colors.accent}`,
                color: colors.accent,
                fontSize: '20px',
              }}
            >
              {text}
            </div>
          ))}
        </div>

        {/* URL example */}
        <div
          style={{
            marginTop: '60px',
            padding: '16px 32px',
            borderRadius: '12px',
            backgroundColor: colors.muted + '20',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: colors.muted, fontSize: '24px' }}>plok.sh/</span>
          <span style={{ color: colors.accent, fontSize: '24px' }}>username</span>
          <span style={{ color: colors.muted, fontSize: '24px' }}>/</span>
          <span style={{ color: colors.accent, fontSize: '24px' }}>repo</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
