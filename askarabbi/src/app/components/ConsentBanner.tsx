"use client";

import { useState, useEffect } from 'react';
import { 
  ConsentState, 
  getStoredConsent, 
  storeConsent, 
  updateGoogleConsent,
  isConsentRequired 
} from '../../utils/consent';

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });

  useEffect(() => {
    // Only show banner if consent is required and not already given
    if (isConsentRequired() && !getStoredConsent()) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent: ConsentState = {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    };
    
    storeConsent(fullConsent);
    updateGoogleConsent(fullConsent);
    setShowBanner(false);
  };

  const handleSaveSettings = () => {
    storeConsent(consent);
    updateGoogleConsent(consent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const toggleConsent = (key: keyof ConsentState) => {
    setConsent(prev => ({
      ...prev,
      [key]: prev[key] === 'granted' ? 'denied' : 'granted'
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 z-50" dir="rtl">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {!showSettings ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-1">אנחנו מעריכים את הפרטיות שלך</p>
              <p>
                אנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה שלך, להציג פרסומות מותאמות אישית ולנתח את התנועה באתר שלנו.
                על ידי לחיצה על &quot;הסכמה&quot;, אתה מסכים לשימוש שלנו בעוגיות.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                ניהול אפשרויות
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 text-sm font-medium text-white bg-[var(--primary)] hover:bg-[var(--secondary)] rounded-full transition-colors"
              >
                הסכמה
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">הגדרות פרטיות</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">עוגיות פרסום</p>
                  <p className="text-sm text-gray-600">מאפשר הצגת פרסומות רלוונטיות</p>
                </div>
                <button
                  onClick={() => toggleConsent('ad_storage')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    consent.ad_storage === 'granted' ? 'bg-[var(--primary)]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      consent.ad_storage === 'granted' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">התאמה אישית של פרסומות</p>
                  <p className="text-sm text-gray-600">מאפשר פרסומות מותאמות אישית</p>
                </div>
                <button
                  onClick={() => toggleConsent('ad_personalization')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    consent.ad_personalization === 'granted' ? 'bg-[var(--primary)]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      consent.ad_personalization === 'granted' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">עוגיות אנליטיקה</p>
                  <p className="text-sm text-gray-600">עוזר לנו להבין כיצד משתמשים באתר</p>
                </div>
                <button
                  onClick={() => toggleConsent('analytics_storage')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    consent.analytics_storage === 'granted' ? 'bg-[var(--primary)]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      consent.analytics_storage === 'granted' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                ביטול
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-6 py-2 text-sm font-medium text-white bg-[var(--primary)] hover:bg-[var(--secondary)] rounded-full transition-colors"
              >
                שמור הגדרות
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}