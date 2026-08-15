"use client";

import React, { useState, useEffect } from "react";
import { useCookieConsent } from "./CookieConsentContext";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function CookiePreferencesModal() {
  const {
    consentState,
    isPreferencesOpen,
    closePreferences,
    saveCustomPreferences,
    acceptAll,
    rejectNonEssential,
  } = useCookieConsent();

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Sync checkbox state when preferences modal is opened or saved state changes
  useEffect(() => {
    if (isPreferencesOpen) {
      setAnalytics(consentState.categories.analytics);
      setMarketing(consentState.categories.marketing);
    }
  }, [isPreferencesOpen, consentState.categories]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePreferences();
      }
    };

    if (isPreferencesOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPreferencesOpen, closePreferences]);

  const handleSave = () => {
    saveCustomPreferences({ analytics, marketing });
  };

  const handleAcceptAll = () => {
    acceptAll();
    closePreferences();
  };

  const handleRejectAll = () => {
    rejectNonEssential();
    closePreferences();
  };

  return (
    <AnimatePresence>
      {isPreferencesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePreferences}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-[#0c0c0e] border border-white/5 shadow-2xl rounded-2xl w-full max-w-lg p-6 md:p-8 flex flex-col gap-6 text-left z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="preferences-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2">
              <h2 id="preferences-title" className="text-xl font-bold text-white tracking-tight">
                Cookie Preferences
              </h2>
              <button
                onClick={closePreferences}
                aria-label="Close preferences"
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cookie Categories List */}
            <div className="space-y-5 py-2 max-h-[60vh] overflow-y-auto pr-1">
              
              {/* Category: Necessary */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-neutral-950/40 border border-white/5">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    Necessary Cookies
                    <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full font-normal">
                      Always Active
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    These cookies are essential for core website functionality like security, session management, and routing. The site cannot function properly without them.
                  </p>
                </div>
                
                {/* Disabled Toggle Switch */}
                <div className="w-11 h-6 rounded-full p-1 bg-[#ccff00]/25 cursor-not-allowed flex items-center justify-end select-none">
                  <div className="w-4 h-4 rounded-full bg-black/60" />
                </div>
              </div>

              {/* Category: Analytics */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-neutral-950/40 border border-white/5">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Analytics Cookies
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    These cookies allow us to count visits, analyze traffic sources, and measure performance so we can improve the visitor experience. All data is aggregated anonymously.
                  </p>
                </div>
                
                {/* Toggle Switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={analytics}
                  onClick={() => setAnalytics(!analytics)}
                  className={cn(
                    "w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center shrink-0 border-none outline-none",
                    analytics ? "bg-[#ccff00]" : "bg-neutral-800"
                  )}
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={cn(
                      "w-4 h-4 rounded-full shadow-md",
                      analytics ? "translate-x-5 bg-black" : "translate-x-0 bg-neutral-400"
                    )}
                  />
                </button>
              </div>

              {/* Category: Marketing */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-neutral-950/40 border border-white/5">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Marketing Cookies
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    These cookies are used to track advertising effectiveness and display relevant marketing campaigns based on your browsing patterns.
                  </p>
                </div>
                
                {/* Toggle Switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={marketing}
                  onClick={() => setMarketing(!marketing)}
                  className={cn(
                    "w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center shrink-0 border-none outline-none",
                    marketing ? "bg-[#ccff00]" : "bg-neutral-800"
                  )}
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={cn(
                      "w-4 h-4 rounded-full shadow-md",
                      marketing ? "translate-x-5 bg-black" : "translate-x-0 bg-neutral-400"
                    )}
                  />
                </button>
              </div>

            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleSave}
                className="w-full bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold py-3 px-4 rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-lg shadow-[#ccff00]/10 hover:shadow-[#ccff00]/20 text-center"
              >
                Save My Selection
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAcceptAll}
                  className="w-full border border-neutral-800 hover:bg-neutral-900 text-white font-medium py-2.5 px-3 rounded-xl text-xs transition-colors cursor-pointer text-center"
                >
                  Accept All
                </button>
                <button
                  onClick={handleRejectAll}
                  className="w-full border border-transparent hover:bg-neutral-900 text-neutral-300 hover:text-white font-medium py-2.5 px-3 rounded-xl text-xs transition-colors cursor-pointer text-center"
                >
                  Reject Optional
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
