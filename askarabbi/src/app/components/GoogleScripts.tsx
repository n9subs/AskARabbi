"use client";

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initializeConsent } from '../../utils/consent';
import { shouldShowAds, type PageContext } from '../../utils/adsensePolicy';

interface GoogleScriptsProps {
  adsenseId?: string;
  analyticsId?: string;
  pageContext?: Partial<PageContext>;
}

export default function GoogleScripts({ adsenseId, analyticsId, pageContext }: GoogleScriptsProps) {
  const pathname = usePathname();
  
  useEffect(() => {
    // Initialize consent when component mounts
    initializeConsent();
  }, []);

  // Determine if ads should be shown based on page context
  const showAds = shouldShowAds({
    pathname,
    ...pageContext
  });

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

      {/* Google AdSense - Only load on appropriate pages */}
      {adsenseId && showAds && (
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