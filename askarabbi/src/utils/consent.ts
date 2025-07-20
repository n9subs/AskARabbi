// Consent management utilities

export interface ConsentState {
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
}

export const CONSENT_COOKIE_NAME = 'user_consent';
export const CONSENT_STORAGE_KEY = 'userConsent';

// Check if user is in a region that requires consent
export function isConsentRequired(): boolean {
  // This is a simplified check. In production, you'd use a geolocation service
  // or check the user's timezone/locale
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const euTimezones = [
    'Europe/', 'GB', 'CH', 'IS', 'LI', 'NO'
  ];
  
  return euTimezones.some(tz => timezone.includes(tz));
}

// Get stored consent preferences
export function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading consent from localStorage:', e);
  }
  
  // Check cookie as fallback
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(CONSENT_COOKIE_NAME + '='))
    ?.split('=')[1];
    
  if (cookieValue) {
    try {
      return JSON.parse(decodeURIComponent(cookieValue));
    } catch (e) {
      console.error('Error parsing consent cookie:', e);
    }
  }
  
  return null;
}

// Store consent preferences
export function storeConsent(consent: ConsentState): void {
  if (typeof window === 'undefined') return;
  
  // Store in localStorage
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch (e) {
    console.error('Error storing consent in localStorage:', e);
  }
  
  // Also store in cookie for server-side access
  const cookieValue = encodeURIComponent(JSON.stringify(consent));
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1); // 1 year expiry
  
  document.cookie = `${CONSENT_COOKIE_NAME}=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, string | boolean | number>
    ) => void;
  }
}

// Update Google consent state
export function updateGoogleConsent(consent: ConsentState): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', consent as unknown as Record<string, string>);
  }
}

// Initialize consent with default denied state
export function initializeConsent(): void {
  if (typeof window !== 'undefined' && window.gtag) {
    // Default to denied for EU users
    const defaultConsent: ConsentState = {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    };
    
    window.gtag('consent', 'default', defaultConsent as unknown as Record<string, string>);
    
    // Check for stored consent and update if exists
    const storedConsent = getStoredConsent();
    if (storedConsent) {
      updateGoogleConsent(storedConsent);
    }
  }
}