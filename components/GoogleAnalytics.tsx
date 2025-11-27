'use client';

import Script from 'next/script';

// plok.sh's own GA ID
const PLOK_GA_ID = process.env.NEXT_PUBLIC_GA_ID;

interface GoogleAnalyticsProps {
  customerGaId?: string;
}

export function GoogleAnalytics({ customerGaId }: GoogleAnalyticsProps) {
  const gaIds = [PLOK_GA_ID, customerGaId].filter(Boolean) as string[];
  
  if (gaIds.length === 0) return null;
  
  // Use first ID for the script src (usually ours)
  const primaryId = gaIds[0];
  
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${gaIds.map(id => `gtag('config', '${id}');`).join('\n          ')}
        `}
      </Script>
    </>
  );
}
