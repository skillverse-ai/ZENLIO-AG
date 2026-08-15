"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  CookieConsentState,
  CookieCategories,
  getStoredConsent,
  setStoredConsent,
  DEFAULT_CONSENT,
  COOKIE_CONSENT_VERSION,
} from "@/lib/cookie-consent";

interface CookieConsentContextType {
  consentState: CookieConsentState;
  isPreferencesOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  saveCustomPreferences: (categories: Omit<CookieCategories, "necessary">) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  hasConsent: (category: keyof CookieCategories) => boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consentState, setConsentState] = useState<CookieConsentState>(DEFAULT_CONSENT);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  // Load stored state on mount
  useEffect(() => {
    setConsentState(getStoredConsent());
  }, []);

  const acceptAll = () => {
    const newState: CookieConsentState = {
      status: "accepted",
      categories: {
        necessary: true,
        analytics: true,
        marketing: true,
      },
      timestamp: new Date().toISOString(),
      version: COOKIE_CONSENT_VERSION,
    };
    setConsentState(newState);
    setStoredConsent(newState);
  };

  const rejectNonEssential = () => {
    const newState: CookieConsentState = {
      status: "rejected",
      categories: {
        necessary: true,
        analytics: false,
        marketing: false,
      },
      timestamp: new Date().toISOString(),
      version: COOKIE_CONSENT_VERSION,
    };
    setConsentState(newState);
    setStoredConsent(newState);
  };

  const saveCustomPreferences = (customCategories: Omit<CookieCategories, "necessary">) => {
    const newState: CookieConsentState = {
      status: "custom",
      categories: {
        necessary: true,
        ...customCategories,
      },
      timestamp: new Date().toISOString(),
      version: COOKIE_CONSENT_VERSION,
    };
    setConsentState(newState);
    setStoredConsent(newState);
    setIsPreferencesOpen(false);
  };

  const openPreferences = () => setIsPreferencesOpen(true);
  const closePreferences = () => setIsPreferencesOpen(false);

  const hasConsent = (category: keyof CookieCategories) => {
    return consentState.categories[category] === true;
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consentState,
        isPreferencesOpen,
        acceptAll,
        rejectNonEssential,
        saveCustomPreferences,
        openPreferences,
        closePreferences,
        hasConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}
