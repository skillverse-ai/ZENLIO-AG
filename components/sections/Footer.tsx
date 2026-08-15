import Link from "next/link";
import { CookiePreferencesButton } from "@/components/cookie-consent/CookiePreferencesButton";

const ZenlioLogo = () => (
  <svg className="w-16 h-10 select-none" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="silver-top" x1="20" y1="16" x2="58" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor="#f5f5f7" />
        <stop offset="100%" stopColor="#a1a1aa" />
      </linearGradient>
      <linearGradient id="silver-bottom" x1="42" y1="22" x2="80" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#52525b" />
        <stop offset="60%" stopColor="#d4d4d8" />
        <stop offset="100%" stopColor="#ffffff" />
      </linearGradient>
    </defs>
    {/* Top part */}
    <path d="M20 16h32l6 12H46l-3-6H23z" fill="url(#silver-top)" />
    {/* Bottom part */}
    <path d="M80 34H48l-6-12h12l3 6h23z" fill="url(#silver-bottom)" />
  </svg>
);

export function Footer() {
  return (
    <footer className="w-full bg-black text-foreground border-t border-neutral-900 pt-20 pb-12 font-[family-name:var(--font-grift)]">
      <div className="container px-4 md:px-6 mx-auto">
        
        {/* Top Section: Brand Info + 4 Link Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
          
          {/* Brand Info (Left Pane) - Spans 4 cols on large screens */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <ZenlioLogo />
            </Link>
            <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
              We build the operating system your business runs on — site, CRM, and AI automation.
            </p>
            
            {/* Get Started Button */}
            <Link 
              href="/contact" 
              className="mt-2 flex items-center gap-3 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-4 transition-colors cursor-pointer group shadow-lg"
            >
              <div className="w-6 h-6 bg-[#ccff00] rounded-lg flex items-center justify-center text-black font-extrabold text-[11px] shadow-sm select-none">
                Z
              </div>
              <span className="text-sm font-semibold text-white tracking-wide">
                Get started
              </span>
            </Link>
          </div>
          
          {/* Link Columns (Right Pane) - Spans 8 cols on large screens */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Col 1: Home */}
            <div className="flex flex-col items-start">
              <h4 className="text-xs font-semibold text-neutral-500 mb-4 tracking-wider">Home</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="hover:text-white text-neutral-400 transition-colors">Overview</Link></li>
                <li><Link href="#services" className="hover:text-white text-neutral-400 transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white text-neutral-400 transition-colors">Pricing</Link></li>
                <li><Link href="#testimonials" className="hover:text-white text-neutral-400 transition-colors">Testimonials</Link></li>
                <li><Link href="#faq" className="hover:text-white text-neutral-400 transition-colors">FAQs</Link></li>
              </ul>
            </div>

            {/* Col 2: About */}
            <div className="flex flex-col items-start">
              <h4 className="text-xs font-semibold text-neutral-500 mb-4 tracking-wider">About</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#about" className="hover:text-white text-neutral-400 transition-colors">Our Story</Link></li>
                <li><Link href="#" className="hover:text-white text-neutral-400 transition-colors">Team</Link></li>
                <li><Link href="#" className="hover:text-white text-neutral-400 transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white text-neutral-400 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white text-neutral-400 transition-colors">Press Kit</Link></li>
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div className="flex flex-col items-start">
              <h4 className="text-xs font-semibold text-neutral-500 mb-4 tracking-wider">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/contact" className="hover:text-white text-neutral-400 transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white text-neutral-400 transition-colors">Support</Link></li>
                <li><Link href="#" className="hover:text-white text-neutral-400 transition-colors">Live Chat</Link></li>
                <li><Link href="#" className="hover:text-white text-neutral-400 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white text-neutral-400 transition-colors">Report Issue</Link></li>
              </ul>
            </div>

            {/* Col 4: Legal */}
            <div className="flex flex-col items-start">
              <h4 className="text-xs font-semibold text-neutral-500 mb-4 tracking-wider">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy" className="hover:text-white text-neutral-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white text-neutral-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-white text-neutral-400 transition-colors">Cookie Policy</Link></li>
                <li><CookiePreferencesButton className="hover:text-white text-neutral-400 transition-colors text-left" /></li>
                <li><Link href="#" className="hover:text-white text-neutral-400 transition-colors">Licenses</Link></li>
                <li><Link href="#" className="hover:text-white text-neutral-400 transition-colors">Security</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Middle Section: Giant Fading "Zenlio" Text Logo */}
        <div className="w-full flex justify-center overflow-hidden mb-12 select-none">
          <h2 className="text-[14vw] font-black tracking-tighter uppercase leading-none font-[family-name:var(--font-grift)] bg-clip-text text-transparent bg-gradient-to-b from-[#ccff00] via-[#242e00] to-transparent">
            Zenlio
          </h2>
        </div>

        {/* Bottom Section: Separator + Copyright + Circle Logo Badge */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col items-center gap-4 text-center">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Zenlio. All rights reserved.
          </p>
          
          {/* Circular Z Logo Badge */}
          <div className="w-8 h-8 rounded-full border border-[#ccff00] flex items-center justify-center select-none shadow-[0_0_10px_rgba(204,255,0,0.1)]">
            <span className="text-[#ccff00] font-sans font-bold text-xs tracking-wide">Z</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
