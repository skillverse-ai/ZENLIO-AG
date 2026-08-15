import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-background text-foreground border-t border-border py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-heading font-bold text-2xl mb-4">Zenlio</h3>
            <p className="text-muted-foreground max-w-sm">
              We build the operating system your business runs on — site, CRM, and AI automation.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#services" className="hover:text-foreground transition-colors">Services</Link></li>
              <li><Link href="#work" className="hover:text-foreground transition-colors">Work</Link></li>
              <li><Link href="#about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="#contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Social</h4>
            <div className="flex space-x-4 text-muted-foreground text-sm font-medium">
              <Link href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
                LinkedIn <ExternalLink className="w-3 h-3" />
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
                Twitter <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Zenlio. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
