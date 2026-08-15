"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Zap, Bot, Database, Mail, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnimatedWorkflow() {
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
      tl.set(".node", { backgroundColor: "#171717", borderColor: "#262626", color: "#a3a3a3" })
        .set(".path-line", { stroke: "#262626" })
        .set(".particle", { opacity: 0 })
        .set(".success-node", { opacity: 0, scale: 0 });

      // Node specific icons
      const activateNode = (nodeClass: string, color: string) => {
        return gsap.to(nodeClass, {
          backgroundColor: `${color}15`,
          borderColor: color,
          color: color,
          boxShadow: `0 0 15px ${color}30`,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const animatePath = (pathId: string, color: string) => {
        return gsap.to(pathId, {
          stroke: color,
          duration: 0.3
        });
      };

      // 2. Trigger
      tl.add(activateNode(".node-trigger", "#ccff00"))
        .to(".node-trigger", { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 });

      // 3. Travel to AI
      tl.add(animatePath("#path-1", "#ccff0030"), "+=0.1")
        .to(".particle-1", {
          opacity: 1,
          motionPath: { path: "#path-1", alignOrigin: [0.5, 0.5] },
          duration: 0.4,
          ease: "power1.inOut"
        }, "<")
        .to(".particle-1", { opacity: 0, duration: 0.1 });

      // 4. AI Node Processes
      tl.add(activateNode(".node-ai", "#a855f7"))
        .to(".node-ai", { scale: 1.05, duration: 0.2, yoyo: true, repeat: 3 })
        .to(".node-trigger", { backgroundColor: "#171717", borderColor: "#262626", color: "#a3a3a3", duration: 0.3, boxShadow: "none" }, "-=0.4");

      // 5. Travel to Branches
      tl.add(animatePath("#path-2", "#a855f730"))
        .add(animatePath("#path-3", "#a855f730"), "<")
        .to(".particle-2", {
          opacity: 1,
          motionPath: { path: "#path-2", alignOrigin: [0.5, 0.5] },
          duration: 0.4,
          ease: "power1.inOut"
        }, "<")
        .to(".particle-3", {
          opacity: 1,
          motionPath: { path: "#path-3", alignOrigin: [0.5, 0.5] },
          duration: 0.4,
          ease: "power1.inOut"
        }, "<")
        .to([".particle-2", ".particle-3"], { opacity: 0, duration: 0.1 });

      // 6. Branch Nodes Activate
      tl.add(activateNode(".node-crm", "#3b82f6"))
        .add(activateNode(".node-email", "#10b981"), "<")
        .to(".node-ai", { backgroundColor: "#171717", borderColor: "#262626", color: "#a3a3a3", duration: 0.3, boxShadow: "none" }, "-=0.2");

      // 7. Travel to Success
      tl.add(animatePath("#path-4", "#3b82f630"), "+=0.2")
        .add(animatePath("#path-5", "#10b98130"), "<")
        .to(".particle-4", {
          opacity: 1,
          motionPath: { path: "#path-4", alignOrigin: [0.5, 0.5] },
          duration: 0.4,
          ease: "power1.inOut"
        }, "<")
        .to(".particle-5", {
          opacity: 1,
          motionPath: { path: "#path-5", alignOrigin: [0.5, 0.5] },
          duration: 0.4,
          ease: "power1.inOut"
        }, "<")
        .to([".particle-4", ".particle-5"], { opacity: 0, duration: 0.1 });

      // 8. Success Node
      tl.to(".success-node", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" })
        .to([".node-crm", ".node-email"], { backgroundColor: "#171717", borderColor: "#262626", color: "#a3a3a3", duration: 0.3, boxShadow: "none" }, "-=0.2");

      // 9. Reset Everything
      tl.to([".path-line"], { stroke: "#262626", duration: 0.5, delay: 1 })
        .to(".success-node", { opacity: 0, scale: 0, duration: 0.3 }, "<");

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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent_70%)]" />
      
      <div className="relative w-full h-full max-w-[300px] flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
        
        {/* SVG Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 200">
          {/* Trigger to AI */}
          <path id="path-1" className="path-line" d="M 150 40 L 150 75" strokeWidth="2" fill="none" />
          {/* AI to CRM */}
          <path id="path-2" className="path-line" d="M 150 105 L 150 120 L 90 120 L 90 140" strokeWidth="2" fill="none" strokeLinejoin="round" />
          {/* AI to Email */}
          <path id="path-3" className="path-line" d="M 150 105 L 150 120 L 210 120 L 210 140" strokeWidth="2" fill="none" strokeLinejoin="round" />
          {/* CRM to Success */}
          <path id="path-4" className="path-line" d="M 90 170 L 90 185 L 150 185 L 150 190" strokeWidth="2" fill="none" strokeLinejoin="round" />
          {/* Email to Success */}
          <path id="path-5" className="path-line" d="M 210 170 L 210 185 L 150 185 L 150 190" strokeWidth="2" fill="none" strokeLinejoin="round" />
        </svg>

        {/* Particles */}
        <div className="particle particle-1 absolute w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_10px_#ccff00] z-20" />
        <div className="particle particle-2 absolute w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_10px_#a855f7] z-20" />
        <div className="particle particle-3 absolute w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_10px_#a855f7] z-20" />
        <div className="particle particle-4 absolute w-2 h-2 rounded-full bg-[#3b82f6] shadow-[0_0_10px_#3b82f6] z-20" />
        <div className="particle particle-5 absolute w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_10px_#10b981] z-20" />

        {/* Nodes */}
        <div className="absolute top-[10px] w-full flex justify-center z-10">
          <div className="node node-trigger w-32 h-8 bg-neutral-900 border border-neutral-800 rounded flex items-center justify-center gap-2 text-xs font-mono">
            <Zap className="w-3 h-3" /> WEBHOOK
          </div>
        </div>

        <div className="absolute top-[75px] w-full flex justify-center z-10">
          <div className="node node-ai w-32 h-8 bg-neutral-900 border border-neutral-800 rounded flex items-center justify-center gap-2 text-xs font-mono">
            <Bot className="w-3 h-3" /> AI PROCESS
          </div>
        </div>

        <div className="absolute top-[140px] w-full flex justify-center gap-6 z-10">
          <div className="node node-crm w-[100px] h-8 bg-neutral-900 border border-neutral-800 rounded flex items-center justify-center gap-2 text-[10px] font-mono">
            <Database className="w-3 h-3" /> CRM UPDATE
          </div>
          <div className="node node-email w-[100px] h-8 bg-neutral-900 border border-neutral-800 rounded flex items-center justify-center gap-2 text-[10px] font-mono">
            <Mail className="w-3 h-3" /> SEND EMAIL
          </div>
        </div>

        <div className="absolute top-[180px] w-full flex justify-center z-10">
          <div className="success-node w-8 h-8 rounded-full bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
          </div>
        </div>

      </div>
    </div>
  );
}
