"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { useCookieConsent } from "./CookieConsentContext";
import { CookieCategories } from "@/lib/cookie-consent";

interface ConsentGateProps {
  category: keyof Omit<CookieCategories, "necessary">;
  children: ReactNode;
  fallback?: ReactNode;
}

export function ConsentGate({ category, children, fallback = null }: ConsentGateProps) {
  const { hasConsent } = useCookieConsent();
  const [mounted, setMounted] = useState(false);

  // Prevent server-side hydration mismatches for gated scripts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (hasConsent(category)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
