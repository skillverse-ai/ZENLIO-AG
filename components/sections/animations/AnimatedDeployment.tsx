"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Server, Globe2 } from "lucide-react";

export function AnimatedDeployment() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        repeat: -1, 
        repeatDelay: 1,
        paused: true
      });

      // 1. Initial State
      tl.set(".server-node", { backgroundColor: "#171717", borderColor: "#262626", boxShadow: "none" })
        .set(".central-server", { backgroundColor: "#171717", borderColor: "#262626" })
        .set(".packet", { opacity: 0 })
        .set(".path-line", { stroke: "#262626" })
        .set(".status-badge", { textContent: "Deploying...", color: "#a3a3a3", borderColor: "#262626" })
        .set(".global-pulse", { scale: 0, opacity: 0 });

      // 2. Central Server Activates
      tl.to(".central-server", { 
          backgroundColor: "rgba(204,255,0,0.1)", 
          borderColor: "#ccff00",
          boxShadow: "0 0 15px rgba(204,255,0,0.2)",
          duration: 0.3 
        })
        .to(".central-icon", { color: "#ccff00", duration: 0.3 }, "<");

      // 3. First Packet Travels (EU)
      tl.to("#path-eu", { stroke: "rgba(204,255,0,0.3)", duration: 0.2 })
        .to(".packet-eu", {
          opacity: 1,
          motionPath: { path: "#path-eu", alignOrigin: [0.5, 0.5] },
          duration: 0.5,
          ease: "power1.inOut"
        }, "<")
        .to(".packet-eu", { opacity: 0, duration: 0.1 })
        .to(".node-eu", { 
          backgroundColor: "rgba(204,255,0,0.15)", 
          borderColor: "#ccff00", 
          boxShadow: "0 0 10px rgba(204,255,0,0.3)", 
          duration: 0.2 
        });

      // 4. Second Packet Travels (ASIA)
      tl.to("#path-asia", { stroke: "rgba(204,255,0,0.3)", duration: 0.2 }, "-=0.2")
        .to(".packet-asia", {
          opacity: 1,
          motionPath: { path: "#path-asia", alignOrigin: [0.5, 0.5] },
          duration: 0.6,
          ease: "power1.inOut"
        }, "<")
        .to(".packet-asia", { opacity: 0, duration: 0.1 })
        .to(".node-asia", { 
          backgroundColor: "rgba(204,255,0,0.15)", 
          borderColor: "#ccff00", 
          boxShadow: "0 0 10px rgba(204,255,0,0.3)", 
          duration: 0.2 
        });

      // 5. Third Packet Travels (US)
      tl.to("#path-us", { stroke: "rgba(204,255,0,0.3)", duration: 0.2 }, "-=0.3")
        .to(".packet-us", {
          opacity: 1,
          motionPath: { path: "#path-us", alignOrigin: [0.5, 0.5] },
          duration: 0.4,
          ease: "power1.inOut"
        }, "<")
        .to(".packet-us", { opacity: 0, duration: 0.1 })
        .to(".node-us", { 
          backgroundColor: "rgba(204,255,0,0.15)", 
          borderColor: "#ccff00", 
          boxShadow: "0 0 10px rgba(204,255,0,0.3)", 
          duration: 0.2 
        });

      // 6. Complete & Pulse
      tl.to(".status-badge", { 
          textContent: "Deployed", 
          color: "#4ade80", 
          borderColor: "#4ade80", 
          backgroundColor: "rgba(74,222,128,0.1)",
          duration: 0.3 
        })
        .to(".global-pulse", { 
          scale: 1, 
          opacity: 0.5, 
          duration: 0.6, 
          ease: "power2.out" 
        }, "<")
        .to(".global-pulse", { 
          opacity: 0, 
          duration: 0.4 
        });

      // 7. Reset
      tl.to([".server-node", ".central-server"], { 
          backgroundColor: "#171717", 
          borderColor: "#262626", 
          boxShadow: "none", 
          duration: 0.5, 
          delay: 1 
        })
        .to(".path-line", { stroke: "#262626", duration: 0.5 }, "<")
        .to(".central-icon", { color: "#a3a3a3", duration: 0.5 }, "<")
        .to(".status-badge", { 
          backgroundColor: "transparent", 
          color: "#a3a3a3", 
          borderColor: "#262626", 
          textContent: "Deploying...", 
          duration: 0.5 
        }, "<");

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
      
      {/* Abstract Map Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #404040 1px, transparent 0)', backgroundSize: '20px 20px' }} />
      
      <div className="relative w-full h-full flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-700">
        
        {/* Status Badge */}
        <div className="absolute top-6 status-badge px-3 py-1 border rounded-full text-[10px] font-mono tracking-wider z-30 flex items-center gap-2 backdrop-blur-sm">
          <Globe2 className="w-3 h-3" />
          <span>Deploying...</span>
        </div>

        {/* Global Map Container */}
        <div className="relative w-full max-w-[300px] h-[200px]">
          
          {/* Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 300 200">
            {/* US to Central (Central is at 150, 100) */}
            <path id="path-us" className="path-line" d="M 150 100 Q 100 70 60 90" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
            {/* EU to Central */}
            <path id="path-eu" className="path-line" d="M 150 100 Q 180 50 200 70" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
            {/* Asia to Central */}
            <path id="path-asia" className="path-line" d="M 150 100 Q 220 130 250 120" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
          </svg>

          {/* Packets */}
          <div className="packet packet-us absolute w-1.5 h-1.5 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00] z-20" />
          <div className="packet packet-eu absolute w-1.5 h-1.5 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00] z-20" />
          <div className="packet packet-asia absolute w-1.5 h-1.5 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00] z-20" />

          {/* Central Server */}
          <div className="absolute left-[150px] top-[100px] -translate-x-1/2 -translate-y-1/2 z-30">
             <div className="global-pulse absolute inset-0 rounded-full bg-[#ccff00] scale-0" />
             <div className="central-server w-10 h-10 rounded-lg flex items-center justify-center relative z-10 border border-neutral-800 bg-neutral-900">
                <Server className="w-5 h-5 text-neutral-400 central-icon" />
             </div>
          </div>

          {/* Regional Nodes */}
          {/* US Node */}
          <div className="absolute left-[60px] top-[90px] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1">
             <div className="server-node node-us w-4 h-4 rounded-full border border-neutral-800 bg-neutral-900" />
             <span className="text-[8px] text-neutral-500 font-mono">us-east</span>
          </div>

          {/* EU Node */}
          <div className="absolute left-[200px] top-[70px] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1">
             <div className="server-node node-eu w-4 h-4 rounded-full border border-neutral-800 bg-neutral-900" />
             <span className="text-[8px] text-neutral-500 font-mono">eu-west</span>
          </div>

          {/* Asia Node */}
          <div className="absolute left-[250px] top-[120px] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1">
             <div className="server-node node-asia w-4 h-4 rounded-full border border-neutral-800 bg-neutral-900" />
             <span className="text-[8px] text-neutral-500 font-mono">ap-south</span>
          </div>

        </div>
      </div>
    </div>
  );
}
