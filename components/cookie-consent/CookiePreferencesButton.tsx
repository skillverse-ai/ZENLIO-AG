"use client";

import React from "react";
import { useCookieConsent } from "./CookieConsentContext";

interface CookiePreferencesButtonProps {
  className?: string;
}

export function CookiePreferencesButton({ className }: CookiePreferencesButtonProps) {
  const { openPreferences } = useCookieConsent();

  return (
    <button
      onClick={openPreferences}
      type="button"
      className={className}
      style={{
        cursor: "pointer",
        background: "transparent",
        border: "none",
        padding: 0,
        font: "inherit",
        color: "inherit",
        textAlign: "left",
      }}
    >
      Cookie Preferences
    </button>
  );
}
