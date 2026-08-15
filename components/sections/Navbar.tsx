"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#projects" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
    >
      <div className="flex items-center justify-between px-6 py-3 rounded-full border border-border/40 bg-background/60 backdrop-blur-xl shadow-lg shadow-black/10">
        
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center">
          <span className="font-[family-name:var(--font-new-order)] font-bold text-xl tracking-tight">Zenlio</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-2 text-sm font-medium font-[family-name:var(--font-grift)] text-foreground/80 hover:text-foreground transition-colors"
            >
              <span className="relative z-10">{item.name}</span>
              {hoveredIndex === index && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-muted rounded-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4 relative z-10">
          <Link href="/contact">
            <Button size="sm" className="rounded-full px-6 font-semibold font-[family-name:var(--font-grift)]">
              Contact Us
            </Button>
          </Link>
        </div>

      </div>
    </motion.header>
  );
}
