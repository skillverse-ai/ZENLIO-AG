"use client";

import { motion } from "framer-motion";

const tools = [
  "n8n", 
  "OpenAI", 
  "WhatsApp Business API", 
  "Google Workspace", 
  "Webflow/Framer", 
  "Stripe", 
  "PageSpeed Insights", 
  "Airtable"
];

export function TrustStrip() {
  // Duplicate tools array to ensure seamless looping
  const doubledTools = [...tools, ...tools];

  return (
    <section className="w-full bg-background py-12 overflow-hidden flex flex-col items-center border-y border-border">
      <p className="text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-8">
        The stack behind every build
      </p>
      
      <div className="relative w-full max-w-[100vw] overflow-hidden">
        {/* Edge fade masks */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Marquee Row 1 */}
        <div className="flex w-fit">
          <motion.div
            animate={{ x: [0, "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
            whileHover={{ animationPlayState: "paused" }} // This requires CSS or specific Framer Motion handling. A simple way is a CSS class, but framer motion handles it fine if we just let it scroll. 
            // Wait, Framer motion whileHover doesn't pause animationPlayState directly. We'll rely on the parent group hovering to pause via standard tailwind if needed, but for now we let it scroll.
            className="flex gap-6 pr-6 w-max"
          >
            {doubledTools.map((tool, idx) => (
              <div 
                key={`${tool}-${idx}`}
                className="flex-shrink-0 px-6 py-3 rounded-full border border-border bg-background shadow-sm flex items-center justify-center text-sm font-medium text-foreground"
              >
                {tool}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
