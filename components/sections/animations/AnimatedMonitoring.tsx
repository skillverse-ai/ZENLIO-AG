"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, ShieldCheck, Database, RefreshCw, CheckCircle2, ShieldAlert } from "lucide-react";

export function AnimatedMonitoring() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        repeat: -1, 
        paused: true
      });

      // 1. Initial State
      tl.set(".scan-line", { y: -100, opacity: 0 })
        .set(".status-security", { textContent: "Secure", color: "#4ade80" })
        .set(".icon-security-ok", { opacity: 1, scale: 1 })
        .set(".icon-security-alert", { opacity: 0, scale: 0 })
        .set(".bar-fill", { scaleX: 0.8 });

      // Continuous subtle random bar movements
      gsap.to(".bar-fill-perf", {
        scaleX: () => 0.7 + Math.random() * 0.25,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      gsap.to(".bar-fill-db", {
        scaleX: () => 0.6 + Math.random() * 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 2. Scan Sequence
      tl.to(".scan-line", { opacity: 0.5, duration: 0.2 })
        .to(".scan-line", { y: 200, duration: 2, ease: "linear" })
        .to(".scan-line", { opacity: 0, duration: 0.2 }, "-=0.2");

      // 3. Security Check Anomaly (Happens during scan)
      // We insert this into the timeline to happen while the scan moves down
      tl.to(".status-security", { textContent: "Checking...", color: "#fbbf24", duration: 0.1 }, 0.8)
        .to(".icon-security-ok", { opacity: 0, scale: 0, duration: 0.1 }, 0.8)
        .to(".icon-security-alert", { opacity: 1, scale: 1, color: "#fbbf24", duration: 0.2, ease: "back.out" }, 0.9)
        .to(".bar-fill-sec", { scaleX: 0.3, backgroundColor: "#fbbf24", duration: 0.3 }, 0.8);

      // 4. Resolves back to normal
      tl.to(".status-security", { textContent: "Secure", color: "#4ade80", duration: 0.1 }, 2.5)
        .to(".icon-security-alert", { opacity: 0, scale: 0, duration: 0.1 }, 2.5)
        .to(".icon-security-ok", { opacity: 1, scale: 1, color: "#4ade80", duration: 0.2, ease: "back.out" }, 2.6)
        .to(".bar-fill-sec", { scaleX: 0.9, backgroundColor: "#ccff00", duration: 0.4 }, 2.5);

      // Add a small pause before looping
      tl.to({}, { duration: 1.5 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => tl.play(),
        onLeave: () => tl.pause(),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => tl.pause(),
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center bg-[#050505] overflow-hidden group">
      
      {/* Background radial gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(ellipse_at_bottom,rgba(204,255,0,0.05),transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative w-full h-full max-w-[260px] flex flex-col justify-center gap-4 group-hover:-translate-y-1 transition-transform duration-700 pt-4">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-2 px-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">System Status</span>
        </div>

        {/* Dashboard Items */}
        <div className="flex flex-col gap-3 relative">
          
          {/* Scanning Line overlay */}
          <div className="scan-line absolute -left-4 -right-4 h-12 bg-gradient-to-b from-transparent to-primary/10 border-b border-primary/30 z-20 pointer-events-none" />

          {/* Performance */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-lg p-3 flex flex-col gap-2 relative z-10 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-neutral-300 font-mono">Performance</span>
              <span className="text-[9px] text-[#4ade80] font-mono flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" /> Optimal
              </span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
               <div className="bar-fill bar-fill-perf h-full bg-primary origin-left" style={{ transform: 'scaleX(0.85)' }} />
            </div>
          </div>

          {/* Security */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-lg p-3 flex flex-col gap-2 relative z-10 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-neutral-300 font-mono">Security</span>
              <span className="status-security text-[9px] text-[#4ade80] font-mono flex items-center gap-1 relative w-16 justify-end">
                <ShieldCheck className="w-2.5 h-2.5 absolute left-0 icon-security-ok" />
                <ShieldAlert className="w-2.5 h-2.5 absolute left-0 icon-security-alert opacity-0" />
                Secure
              </span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
               <div className="bar-fill bar-fill-sec h-full bg-primary origin-left" style={{ transform: 'scaleX(0.9)' }} />
            </div>
          </div>

          {/* Backups */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-lg p-3 flex flex-col gap-2 relative z-10 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-neutral-300 font-mono">Backups</span>
              <span className="text-[9px] text-[#4ade80] font-mono flex items-center gap-1">
                <Database className="w-2.5 h-2.5" /> Synced
              </span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
               <div className="bar-fill bar-fill-db h-full bg-primary origin-left" style={{ transform: 'scaleX(0.95)' }} />
            </div>
          </div>

          {/* Updates */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-lg p-3 flex flex-col gap-2 relative z-10 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-neutral-300 font-mono">Updates</span>
              <span className="text-[9px] text-neutral-400 font-mono flex items-center gap-1">
                <RefreshCw className="w-2.5 h-2.5" /> Latest
              </span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
               <div className="bar-fill h-full bg-neutral-500 origin-left" style={{ transform: 'scaleX(1)' }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
