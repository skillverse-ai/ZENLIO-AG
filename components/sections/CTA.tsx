"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="w-full bg-[#ccff00] text-black py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-black/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-black/30 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-black/40 rounded-full" />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-black font-[family-name:var(--font-grift)]">
            Ready to Systemize Your Growth?
          </h2>
          <p className="text-xl text-black/80 max-w-xl mx-auto font-medium">
            Let&apos;s build your custom digital operating system.
          </p>
          <Link href="/contact">
            <Button size="lg" className="mt-4 rounded-full px-8 font-semibold bg-black text-white hover:bg-neutral-900 shadow-xl border-none">
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
