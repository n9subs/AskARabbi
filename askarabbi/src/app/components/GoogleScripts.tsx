"use client";

import Script from 'next/script';
import { useEffect } from 'react';
import { initializeConsent } from '../../utils/consent';

interface GoogleScriptsProps {
  adsenseId?: string;
  analyticsId?: string;
}

export default function GoogleScripts({ adsenseId, analyticsId }: GoogleScriptsProps) {
  useEffect(() => {
    // Initialize consent when component mounts
    initializeConsent();
  }, []);

  return (
    <>
      {/* Google Tag Manager / Analytics */}
      {analyticsId && (
        <>
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
          />
          <Script
            id="google-analytics-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                
                // Default consent mode (will be updated by consent banner)
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'analytics_storage': 'denied',
                  'region': ['EEA', 'GB', 'CH']
                });
                
                // Configure analytics
                gtag('config', '${analyticsId}');
              `,
            }}
          />
        </>
      )}

      {/* Google AdSense */}
      {adsenseId && (
        <Script
          id="google-adsense"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
        />
      )}
    </>
  );
}