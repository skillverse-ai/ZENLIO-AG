"use client";

import React, { useState, useEffect } from "react";
import { useCookieConsent } from "./CookieConsentContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function CookieConsentBanner() {
  const { consentState, acceptAll, rejectNonEssential, openPreferences } = useCookieConsent();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch between server rendering and client state
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Show only if no status has been stored yet
  const showBanner = consentState.status === null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md w-[calc(100%-3rem)] bg-[#0c0c0e] border border-white/5 shadow-2xl rounded-2xl p-6 z-50 flex flex-col gap-5 text-left"
          role="dialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
        >
          <div className="space-y-2">
            <h3 id="cookie-title" className="text-lg font-bold text-white tracking-tight">
              Cookie Consent
            </h3>
            <p id="cookie-desc" className="text-sm text-neutral-400 leading-relaxed">
              We use necessary cookies to run our website. With your consent, we would also like to use optional cookies to analyze traffic and customize marketing. Read our{" "}
              <Link href="/cookies" className="text-white underline hover:text-[#ccff00] transition-colors">
                Cookie Policy
              </Link>{" "}
              to learn more.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={acceptAll}
              className="w-full bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold py-3 px-4 rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-lg shadow-[#ccff00]/10 hover:shadow-[#ccff00]/20 text-center"
            >
              Accept All
            </button>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={rejectNonEssential}
                className="w-full border border-[#29292d] hover:bg-neutral-900 text-white font-medium py-2.5 px-3 rounded-xl text-xs transition-colors cursor-pointer text-center"
              >
                Reject Optional
              </button>
              <button
                onClick={openPreferences}
                className="w-full border border-transparent hover:bg-neutral-900 text-neutral-300 hover:text-white font-medium py-2.5 px-3 rounded-xl text-xs transition-colors cursor-pointer text-center"
              >
                Customize
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
