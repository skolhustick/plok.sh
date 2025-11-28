'use client';

import { useEffect, useState } from 'react';

export function TerminalLoaderWave() {
  const [frame, setFrame] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 24);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Smooth sine wave across 5 dots
  const dots = Array.from({ length: 5 }, (_, i) => {
    // Create a traveling wave effect
    const phase = (frame / 24) * Math.PI * 2 + (i * Math.PI * 0.4);
    const intensity = (Math.sin(phase) + 1) / 2; // 0 to 1
    return intensity;
  });

  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex items-center gap-1">
        {dots.map((intensity, i) => (
          <span
            key={i}
            className="text-[var(--accent)] transition-opacity duration-75"
            style={{ 
              opacity: 0.2 + intensity * 0.8,
              transform: `scale(${0.8 + intensity * 0.4})`,
              display: 'inline-block',
              fontSize: '10px',
            }}
          >
            ●
          </span>
        ))}
      </div>
    </div>
  );
}
