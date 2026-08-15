"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MousePointer2 } from "lucide-react";

export function AnimatedBrowser() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Register scrolltrigger just in case
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        repeat: -1, 
        repeatDelay: 1,
        paused: true
      });

      // Animation Sequence
      // 1. Initial State
      tl.set(".browser-content", { opacity: 0 })
        .set(".loading-bar", { scaleX: 0, transformOrigin: "left center" })
        .set(".skeleton-box", { scaleY: 0, transformOrigin: "bottom center", opacity: 0 })
        .set(".hero-line", { opacity: 0, y: 10 })
        .set(".cta-btn", { scale: 0.8, opacity: 0, boxShadow: "0 0 0px rgba(204,255,0,0)" })
        .set(".mock-cursor", { x: 150, y: 150, opacity: 0 })
        .set(".progress-track", { opacity: 1 });

      // 2. Loading Phase
      tl.to(".loading-bar", { scaleX: 1, duration: 1, ease: "power2.inOut" })
        .to(".progress-track", { opacity: 0, duration: 0.2 })
        .to(".browser-content", { opacity: 1, duration: 0.4 }, "-=0.2")
        
      // 3. Skeletons & Content Reveal
      tl.to(".skeleton-box", { 
          scaleY: 1, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: "back.out(1.2)" 
        })
        .to(".hero-line", { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.4")
        .to(".cta-btn", { 
          scale: 1, 
          opacity: 1, 
          duration: 0.4, 
          ease: "back.out(1.5)" 
        }, "-=0.2");

      // 4. Cursor Interaction
      tl.to(".mock-cursor", { opacity: 1, duration: 0.2 })
        .to(".mock-cursor", { 
          x: 40, 
          y: 75, 
          duration: 0.8, 
          ease: "power2.inOut" 
        })
        .to(".cta-btn", { 
          scale: 0.95, 
          duration: 0.1 
        })
        .to(".cta-btn", { 
          scale: 1, 
          boxShadow: "0 0 15px rgba(204,255,0,0.4)",
          backgroundColor: "rgba(204,255,0,0.1)",
          color: "rgba(204,255,0,1)",
          duration: 0.2 
        })
        .to(".mock-cursor", { 
          x: 100, 
          y: 120, 
          duration: 0.6, 
          ease: "power2.out",
          delay: 0.2
        })
        .to(".mock-cursor", { opacity: 0, duration: 0.2 })
        
      // 5. Section Change / Fade Out (Reset)
      tl.to([".browser-content", ".cta-btn"], { 
        opacity: 0, 
        duration: 0.5, 
        delay: 0.5 
      });

      // ScrollTrigger to play/pause the timeline when in viewport
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
    <div ref={containerRef} className="absolute inset-0 flex items-end justify-center bg-[#050505] overflow-hidden pt-8 px-8 group">
      {/* Background Atmospheric Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Browser Window */}
      <div className="w-full h-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-t-xl shadow-2xl relative overflow-hidden flex flex-col group-hover:-translate-y-1 transition-transform duration-500">
        
        {/* Browser Header */}
        <div className="h-8 bg-neutral-950 border-b border-neutral-800 flex items-center px-4 gap-2 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          
          {/* Address Bar */}
          <div className="mx-auto w-1/3 h-4 bg-neutral-900 border border-neutral-800 rounded-sm flex items-center px-2 relative overflow-hidden progress-track">
            <div className="absolute top-0 bottom-0 left-0 bg-primary/20 loading-bar w-full" />
          </div>
        </div>

        {/* Browser Body */}
        <div className="flex-1 p-6 relative">
          
          {/* Skeletons & Content */}
          <div className="browser-content w-full h-full flex flex-col gap-6">
            
            {/* Nav Mock */}
            <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
               <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                 <div className="w-4 h-4 bg-primary rounded-sm" />
               </div>
               <div className="flex gap-2">
                 <div className="w-8 h-2 rounded bg-neutral-800" />
                 <div className="w-8 h-2 rounded bg-neutral-800" />
               </div>
            </div>

            {/* Hero Mock */}
            <div className="flex justify-between items-center pt-2 relative">
              <div className="w-3/5 flex flex-col gap-3">
                <div className="h-4 bg-neutral-200 rounded w-full hero-line" />
                <div className="h-4 bg-neutral-200 rounded w-4/5 hero-line" />
                <div className="h-2 bg-neutral-700 rounded-full w-full mt-2 hero-line" />
                <div className="h-2 bg-neutral-700 rounded-full w-2/3 hero-line" />
                
                <div className="cta-btn mt-4 w-24 h-8 bg-neutral-800 border border-neutral-700 rounded flex items-center justify-center text-[8px] font-bold text-neutral-400">
                  GET STARTED
                </div>
              </div>
              
              <div className="w-20 h-20 rounded-full border border-neutral-800 flex items-center justify-center relative skeleton-box">
                <div className="w-14 h-14 rounded-full bg-neutral-800" />
              </div>
            </div>
            
            {/* Grid Mock */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-neutral-800/50 rounded flex flex-col justify-end p-2 gap-1 border border-neutral-700/30 skeleton-box">
                  <div className="w-1/2 h-1.5 bg-neutral-600 rounded-full" />
                  <div className="w-full h-1.5 bg-neutral-700 rounded-full" />
                </div>
              ))}
            </div>

          </div>

          {/* Animated Cursor */}
          <div className="mock-cursor absolute z-50 pointer-events-none drop-shadow-md text-white">
            <MousePointer2 className="w-5 h-5 fill-black" />
          </div>

        </div>
      </div>
    </div>
  );
}
