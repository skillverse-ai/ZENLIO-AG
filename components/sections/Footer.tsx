import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { CookiePreferencesButton } from "@/components/cookie-consent/CookiePreferencesButton";

export function Footer() {
  return (
    <footer className="w-full bg-black text-foreground border-t border-neutral-900 py-16 md:py-24 font-[family-name:var(--font-grift)]">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start mb-16">
          
          {/* Column 1: LINKS */}
          <div className="flex flex-col items-start">
            <h4 className="text-[10px] font-bold tracking-[0.25em] text-neutral-500 uppercase mb-6">Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="#services" className="hover:text-white text-neutral-400 transition-colors flex items-center gap-1 group">
                  Services <ArrowUpRight className="w-3.5 h-3.5 text-[#ccff00] opacity-80 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="#work" className="hover:text-white text-neutral-400 transition-colors flex items-center gap-1 group">
                  Work <ArrowUpRight className="w-3.5 h-3.5 text-[#ccff00] opacity-80 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white text-neutral-400 transition-colors flex items-center gap-1 group">
                  About <ArrowUpRight className="w-3.5 h-3.5 text-[#ccff00] opacity-80 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white text-neutral-400 transition-colors flex items-center gap-1 group">
                  Contact <ArrowUpRight className="w-3.5 h-3.5 text-[#ccff00] opacity-80 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 2: Description, Email, and Giant Gradient Logo */}
          <div className="flex flex-col items-center text-center">
            <p className="text-sm md:text-base text-neutral-400 max-w-sm leading-relaxed mb-6 font-medium">
              We build the operating system your business runs on — site, CRM, and AI automation.
            </p>
            <a 
              href="mailto:hello@zenlio.agency" 
              className="text-sm text-neutral-300 hover:text-white transition-colors flex items-center gap-1 group mb-8 font-semibold"
            >
              hello@zenlio.agency <ArrowUpRight className="w-3.5 h-3.5 text-[#ccff00] opacity-80 group-hover:opacity-100 transition-opacity" />
            </a>
            
            {/* Giant Text Gradient Logo */}
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase select-none font-[family-name:var(--font-grift)] bg-clip-text text-transparent bg-gradient-to-b from-[#ccff00] via-[#94bd00] to-transparent leading-none">
              Zenlio
            </h2>
          </div>
          
          {/* Column 3: Socials & Legal */}
          <div className="flex flex-col items-start md:items-end">
            <div className="flex flex-col items-start min-w-[160px]">
              
              {/* SOCIALS */}
              <h4 className="text-[10px] font-bold tracking-[0.25em] text-neutral-500 uppercase mb-6">Socials</h4>
              <ul className="space-y-4 text-sm font-medium mb-10">
                <li>
                  <Link href="#" className="hover:text-white text-neutral-400 transition-colors flex items-center gap-2.5 group">
                    <FaInstagram className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#ccff00] opacity-80 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white text-neutral-400 transition-colors flex items-center gap-2.5 group">
                    <FaLinkedin className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#ccff00] opacity-80 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white text-neutral-400 transition-colors flex items-center gap-2.5 group">
                    <FaXTwitter className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                    <span>X</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#ccff00] opacity-80 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
              
              {/* LEGAL */}
              <h4 className="text-[10px] font-bold tracking-[0.25em] text-neutral-500 uppercase mb-6">Legal</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li>
                  <Link href="/privacy" className="hover:text-white text-neutral-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-white text-neutral-400 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <CookiePreferencesButton className="hover:text-white text-neutral-400 transition-colors text-left" />
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white text-neutral-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
              
            </div>
          </div>
          
        </div>
        
        {/* Bottom Section: Branding & Copyright */}
        <div className="pt-12 border-t border-neutral-900 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2.5 mb-4 select-none">
            <svg className="h-6 w-auto text-white" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h30L14 20h20" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-[family-name:var(--font-new-order)] font-bold text-xl tracking-tight text-white">Zenlio.</span>
          </div>
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Zenlio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
