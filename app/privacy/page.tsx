import React from "react";
import { Footer } from "@/components/sections/Footer";

export default function PrivacyPage() {
  return (
    <>
      <main className="flex-grow w-full bg-background pt-32 pb-24 text-white relative overflow-hidden">
        {/* Background radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container max-w-4xl px-6 mx-auto relative z-10 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
              Privacy Policy
            </h1>
            <p className="text-sm text-neutral-400">
              Last updated: August 15, 2026
            </p>
          </div>

          <div className="space-y-8 text-neutral-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">1. Overview</h2>
              <p className="text-sm">
                Zenlio ("we," "our," or "us") operates the Zenlio website. We are committed to protecting your personal data and respecting your privacy. This Privacy Policy describes how we collect, use, and store information when you interact with our website.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">2. Information We Collect</h2>
              <p className="text-sm">
                We only collect personal information that you voluntarily provide to us when using our contact forms:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs text-neutral-400">
                <li>**Contact Details**: Your Name, Email Address, and Phone Number.</li>
                <li>**Message Contents**: Any text or queries you provide in our form message fields.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">3. How We Process Your Data</h2>
              <p className="text-sm">
                Our contact form inputs are validated, sanitized, and processed entirely server-side.
              </p>
              <p className="text-sm">
                We use **Resend** (a secure, transactional email service) to route contact form submissions directly to our inbox (**skillverse0109@gmail.com**).
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs text-neutral-400">
                <li>We do **not** store your contact submissions in a database.</li>
                <li>We do **not** sell, share, rent, or distribute your personal information to third parties.</li>
                <li>All submission emails are used strictly to reply to your service requests.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">4. Cookies and Tracking</h2>
              <p className="text-sm">
                We do not currently employ any third-party advertising, analytics, or behavioral tracking scripts on our website.
              </p>
              <p className="text-sm">
                We use a minimal local storage cookie configuration to store your consent choices under the key <code className="bg-neutral-900 px-1.5 py-0.5 rounded text-xs text-[#ccff00]">zenlio_cookie_consent</code>. This is required solely to respect your consent preferences. Refer to our <a href="/cookies" className="text-white underline hover:text-[#ccff00] transition-colors">Cookie Policy</a> for detailed descriptions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">5. Data Security</h2>
              <p className="text-sm">
                We take security seriously. All form submissions are sent over encrypted HTTPS connections, and we utilize server-side environment variables to ensure API credentials are kept private and secure.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">6. Your Rights</h2>
              <p className="text-sm">
                Depending on your location, you may have rights regarding your personal data, including the right to request access, correction, or deletion of the emails sent to us. If you would like us to delete any email correspondence we have with you, please contact us.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">7. Contact Us</h2>
              <p className="text-sm">
                If you have any questions or concerns regarding this policy, please reach out to us at **hello@zenlio.io** or through our contact page.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
