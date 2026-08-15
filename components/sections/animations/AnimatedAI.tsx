"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Bot, FileText, CheckCircle2 } from "lucide-react";

export function AnimatedAI() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        repeat: -1, 
        repeatDelay: 1.5,
        paused: true
      });

      // 1. Initial State
      tl.set(".input-card", { x: -80, opacity: 0 })
        .set(".output-card", { x: 80, opacity: 0 })
        .set(".particle", { opacity: 0 })
        .set(".ai-core", { scale: 1, boxShadow: "0 0 0px rgba(204,255,0,0)" })
        .set(".processing-ring", { rotation: 0, opacity: 0.1 })
        .set(".status-text", { textContent: "Awaiting Input...", color: "#737373" })
        .set(".status-icon-check", { opacity: 0, scale: 0 })
        .set(".status-icon-bot", { opacity: 1, scale: 1 });

      // 2. Input Enters
      tl.to(".input-card", { x: -30, opacity: 1, duration: 0.6, ease: "power2.out" })
        .to(".status-text", { textContent: "Receiving Data...", duration: 0.1 }, "<")
        
      // 3. Data travels to core
      tl.to(".particle.p1", { 
          opacity: 1,
          motionPath: {
            path: [{x: -30, y: 0}, {x: 0, y: 0}],
            alignOrigin: [0.5, 0.5]
          },
          duration: 0.5,
          ease: "power1.inOut"
        })
        .to(".particle.p1", { opacity: 0, duration: 0.1 });

      // 4. AI Core Activates & Processes
      tl.to(".ai-core", { 
          scale: 1.15, 
          boxShadow: "0 0 25px rgba(204,255,0,0.4)",
          backgroundColor: "rgba(204,255,0,0.1)",
          duration: 0.4, 
          ease: "back.out(1.5)" 
        })
        .to(".status-text", { textContent: "Processing...", color: "#ccff00", duration: 0.1 }, "<")
        .to(".processing-ring", { 
          rotation: 360, 
          opacity: 1, 
          duration: 1.5, 
          ease: "power1.inOut" 
        }, "<")
        .to(".ai-core-icon", { color: "#ccff00", duration: 0.2 }, "<");

      // 5. Data travels to Output
      tl.to(".particle.p2", { 
          opacity: 1,
          motionPath: {
            path: [{x: 0, y: 0}, {x: 30, y: 0}],
            alignOrigin: [0.5, 0.5]
          },
          duration: 0.5,
          ease: "power1.inOut"
        }, "-=0.2")
        .to(".particle.p2", { opacity: 0, duration: 0.1 });

      // 6. Output Appears & Status Completes
      tl.to(".output-card", { x: 30, opacity: 1, duration: 0.6, ease: "back.out(1.2)" })
        .to(".ai-core", { scale: 1, boxShadow: "0 0 10px rgba(204,255,0,0.1)", duration: 0.4 }, "<")
        .to(".processing-ring", { opacity: 0.1, duration: 0.4 }, "<")
        .to(".status-text", { textContent: "Complete", color: "#4ade80", duration: 0.1 }, "<")
        .to(".status-icon-bot", { opacity: 0, scale: 0, duration: 0.2 }, "<")
        .to(".status-icon-check", { opacity: 1, scale: 1, color: "#4ade80", duration: 0.2 }, "<")
        
      // 7. Reset Sequence
      tl.to([".input-card", ".output-card"], { opacity: 0, duration: 0.4, delay: 0.8 })
        .to(".ai-core-icon", { color: "#737373", duration: 0.4 }, "<");

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
    <div ref={containerRef} className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] overflow-hidden group">
      
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.08),transparent_60%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Main Container */}
      <div className="relative w-full h-full flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-700">
        
        {/* Status Indicator (Top) */}
        <div className="absolute top-6 flex items-center gap-2 bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm z-20">
          <div className="relative w-4 h-4 flex items-center justify-center">
            <Bot className="w-3 h-3 text-neutral-400 absolute status-icon-bot" />
            <CheckCircle2 className="w-3 h-3 absolute status-icon-check" />
          </div>
          <span className="text-[10px] font-mono tracking-wider status-text">Awaiting Input...</span>
        </div>

        {/* Center System */}
        <div className="relative flex items-center justify-center w-full max-w-[280px]">
          
          {/* Connection Lines */}
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 pulse-line" />

          {/* INPUT CARD */}
          <div className="input-card absolute left-4 z-10 w-16 h-20 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl flex flex-col p-2 gap-1.5">
            <div className="w-full h-1 bg-neutral-700 rounded-full" />
            <div className="w-3/4 h-1 bg-neutral-700 rounded-full" />
            <div className="mt-auto flex items-center justify-center h-8 bg-neutral-800 rounded">
              <FileText className="w-4 h-4 text-neutral-400" />
            </div>
          </div>

          {/* PARTICLES */}
          <div className="particle p1 absolute w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(204,255,0,0.8)] z-20" />
          <div className="particle p2 absolute w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(204,255,0,0.8)] z-20" />

          {/* AI CORE */}
          <div className="relative z-30 flex items-center justify-center">
            <div className="processing-ring absolute w-24 h-24 rounded-full border border-dashed border-primary/50" />
            <div className="processing-ring absolute w-20 h-20 rounded-full border border-t-primary border-r-transparent border-b-transparent border-l-transparent" />
            
            <div className="ai-core w-14 h-14 bg-neutral-900 border border-neutral-700 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
               <Bot className="w-6 h-6 text-neutral-400 ai-core-icon relative z-10" />
            </div>
          </div>

          {/* OUTPUT CARD */}
          <div className="output-card absolute right-4 z-10 w-16 h-20 bg-neutral-900 border border-primary/30 rounded-lg shadow-[0_0_15px_rgba(204,255,0,0.1)] flex flex-col p-2 gap-1.5">
            <div className="w-full h-1 bg-primary/40 rounded-full" />
            <div className="w-3/4 h-1 bg-primary/40 rounded-full" />
            <div className="mt-auto flex items-center justify-center h-8 bg-primary/10 rounded">
              <FileText className="w-4 h-4 text-primary" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
