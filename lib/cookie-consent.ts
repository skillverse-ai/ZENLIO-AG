export type CookieStatus = "accepted" | "rejected" | "custom" | null;

export interface CookieCategories {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsentState {
  status: CookieStatus;
  categories: CookieCategories;
  timestamp: string | null;
  version: string;
}

export const COOKIE_CONSENT_KEY = "zenlio_cookie_consent";
export const COOKIE_CONSENT_VERSION = "1.0.0";

export const DEFAULT_CONSENT: CookieConsentState = {
  status: null,
  categories: {
    necessary: true,
    analytics: false,
    marketing: false,
  },
  timestamp: null,
  version: COOKIE_CONSENT_VERSION,
};

/**
 * Reads cookie consent from localStorage safely (Next.js server-side compatible)
 */
export function getStoredConsent(): CookieConsentState {
  if (typeof window === "undefined") {
    return DEFAULT_CONSENT;
  }
  
  try {
    const item = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!item) return DEFAULT_CONSENT;
    
    const parsed = JSON.parse(item) as CookieConsentState;
    
    // Check version matching
    if (parsed.version !== COOKIE_CONSENT_VERSION) {
      return DEFAULT_CONSENT;
    }
    
    return parsed;
  } catch (error) {
    console.error("Error reading cookie consent from localStorage:", error);
    return DEFAULT_CONSENT;
  }
}

/**
 * Writes cookie consent to localStorage safely (Next.js server-side compatible)
 */
export function setStoredConsent(state: CookieConsentState): void {
  if (typeof window === "undefined") return;
  
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Error writing cookie consent to localStorage:", error);
  }
}
