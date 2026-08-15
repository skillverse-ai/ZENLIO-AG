import React from "react";
import { Footer } from "@/components/sections/Footer";
import { CookiePreferencesButton } from "@/components/cookie-consent/CookiePreferencesButton";

export default function CookiesPage() {
  return (
    <>
      <main className="flex-grow w-full bg-background pt-32 pb-24 text-white relative overflow-hidden">
        {/* Background radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container max-w-4xl px-6 mx-auto relative z-10 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
              Cookie Policy
            </h1>
            <p className="text-sm text-neutral-400">
              Last updated: August 15, 2026
            </p>
          </div>

          <div className="space-y-8 text-neutral-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">1. What Are Cookies?</h2>
              <p className="text-sm">
                Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used to make websites work, or work more efficiently, as well as to provide analytics data and customize your experience.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">2. How Zenlio Uses Cookies</h2>
              <p className="text-sm">
                Zenlio uses cookies to ensure our website functions correctly, to understand how visitors interact with our content, and to manage consent choices. 
              </p>
              <p className="text-sm">
                Currently, Zenlio **does not run any third-party marketing trackers or analytics scripts**. We only store cookies and local variables to remember your preferences (like your cookie choices themselves!).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">3. Cookie Categories</h2>
              <div className="space-y-6 mt-4">
                <div className="p-5 rounded-xl bg-neutral-950/40 border border-white/5 space-y-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    Necessary Cookies
                    <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full font-normal">Always Active</span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    These cookies are essential for core site functions, such as routing, security, and storing your consent preferences. They do not collect any personal data.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-neutral-950/40 border border-white/5 space-y-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Analytics Cookies</h3>
                  <p className="text-xs text-neutral-400">
                    These cookies help us count visits and analyze traffic sources so we can measure and improve the performance of our site. Currently, no analytics services are active on the site.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-neutral-950/40 border border-white/5 space-y-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Marketing Cookies</h3>
                  <p className="text-xs text-neutral-400">
                    These cookies are used to track advertising effectiveness and show targeted campaigns. Currently, no marketing cookies are active on the site.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">4. How Preferences Are Stored</h2>
              <p className="text-sm">
                We save your choices in your browser's local storage under the key <code className="bg-neutral-900 px-1.5 py-0.5 rounded text-xs text-[#ccff00]">zenlio_cookie_consent</code>. This storage saves:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs text-neutral-400">
                <li>Your chosen consent status (<code className="text-white">accepted</code>, <code className="text-white">rejected</code>, or <code className="text-white">custom</code>).</li>
                <li>Your custom toggled categories (Analytics and Marketing permissions).</li>
                <li>The date and time you set your preferences.</li>
                <li>The consent version (<code className="text-white">1.0.0</code>) to ensure your choices remain valid if we update our policies.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">5. How to Manage Your Preferences</h2>
              <p className="text-sm">
                You can change your consent settings at any time. Simply click the link below to open the preference panel and modify your toggles, or click "Cookie Preferences" in the footer of any page:
              </p>
              <div className="pt-2">
                <CookiePreferencesButton className="inline-flex items-center justify-center bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold py-3 px-6 rounded-xl text-xs transition-all duration-300 cursor-pointer shadow-lg shadow-[#ccff00]/10 hover:shadow-[#ccff00]/20" />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
