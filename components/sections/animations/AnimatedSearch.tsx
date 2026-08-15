"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, ArrowUp, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnimatedSearch() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        repeat: -1, 
        repeatDelay: 2,
        paused: true
      });

      // 1. Initial State
      tl.set(".typewriter-text", { textContent: "" })
        .set(".search-btn", { scale: 1, backgroundColor: "transparent" })
        .set(".result-item", { opacity: 0, y: 10 })
        .set(".result-skeleton", { opacity: 1 })
        .set(".result-content", { opacity: 0 })
        .set(".zenlio-result", { y: 0, backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.05)" })
        .set(".zenlio-rank", { textContent: "4" })
        .set(".rank-arrow", { opacity: 0, y: 5, color: "#4ade80" })
        .set(".other-result", { y: 0 });

      // 2. Typing Effect (Fake it with textContent and fixed width or just opacity for a block, but since we can't use TextPlugin easily without premium/extra load, we use a simple loop or steps)
      const text = "best automation agency";
      tl.to(".typewriter-text", { 
        duration: 1.5, 
        text: text, 
        onUpdate: function() {
          const progress = this.progress();
          const length = Math.floor(progress * text.length);
          const el = document.querySelector('.typewriter-text');
          if (el) el.textContent = text.substring(0, length);
        },
        ease: "none"
      });

      // 3. Click Search
      tl.to(".search-btn", { scale: 0.9, backgroundColor: "rgba(255,255,255,0.1)", duration: 0.1 })
        .to(".search-btn", { scale: 1, backgroundColor: "transparent", duration: 0.1 });

      // 4. Loading Skeletons Appear
      tl.to(".result-item", { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" })
        
      // 5. Results Resolve
      tl.to(".result-skeleton", { opacity: 0, duration: 0.2, delay: 0.5 })
        .to(".result-content", { opacity: 1, duration: 0.3 }, "<");

      // 6. Zenlio Result Moves Up (Rank Increase)
      // Rank 4 -> Rank 1
      tl.to(".zenlio-result", { 
          y: -128, // Move up 2 positions (64px each approx)
          backgroundColor: "rgba(204,255,0,0.05)",
          borderColor: "rgba(204,255,0,0.3)",
          duration: 1, 
          ease: "power3.inOut",
          delay: 0.5
        })
        .to(".other-result", { y: 64, duration: 1, ease: "power3.inOut" }, "<")
        .to(".zenlio-rank", { textContent: "1", color: "#ccff00", duration: 0.2 }, "-=0.5")
        .to(".rank-arrow", { opacity: 1, y: 0, duration: 0.3, ease: "back.out" }, "-=0.3");

      // 7. Reset
      tl.to(".result-item", { opacity: 0, duration: 0.5, delay: 1.5 })
        .to(".typewriter-text", { onStart: () => { const el = document.querySelector('.typewriter-text'); if(el) el.textContent = ""; } }, "<");

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
    <div ref={containerRef} className="absolute inset-0 flex flex-col items-center pt-8 bg-[#050505] overflow-hidden group">
      
      {/* Background radial gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Main Container */}
      <div className="relative w-full max-w-[280px] flex flex-col gap-4 group-hover:-translate-y-2 transition-transform duration-700">
        
        {/* Search Bar */}
        <div className="w-full h-10 bg-neutral-900 border border-neutral-800 rounded-full flex items-center px-4 shadow-lg z-20">
          <span className="typewriter-text text-xs text-neutral-300 font-mono flex-1"></span>
          <div className="w-px h-4 bg-primary/50 animate-pulse mr-2" />
          <div className="search-btn w-6 h-6 rounded-full flex items-center justify-center -mr-1">
            <Search className="w-3.5 h-3.5 text-neutral-500" />
          </div>
        </div>

        {/* Results Container */}
        <div className="flex flex-col gap-2 relative z-10">
          
          {/* Result 1 (Other) */}
          <div className="result-item other-result w-full h-14 bg-neutral-900/50 border border-white/5 rounded-lg p-2 flex items-center gap-3">
             <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center shrink-0">
               <Globe className="w-3 h-3 text-neutral-600" />
             </div>
             <div className="flex-1 relative">
                <div className="result-skeleton absolute inset-0 flex flex-col gap-1.5 justify-center">
                  <div className="w-2/3 h-1.5 bg-neutral-800 rounded-full" />
                  <div className="w-1/2 h-1.5 bg-neutral-800 rounded-full" />
                </div>
                <div className="result-content flex flex-col gap-1.5">
                  <div className="w-3/4 h-2 bg-neutral-400 rounded-full" />
                  <div className="w-1/2 h-1.5 bg-neutral-600 rounded-full" />
                </div>
             </div>
             <div className="text-[10px] text-neutral-600 font-mono w-4 text-center">1</div>
          </div>

          {/* Result 2 (Other) */}
          <div className="result-item other-result w-full h-14 bg-neutral-900/50 border border-white/5 rounded-lg p-2 flex items-center gap-3">
             <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center shrink-0">
               <Globe className="w-3 h-3 text-neutral-600" />
             </div>
             <div className="flex-1 relative">
                <div className="result-skeleton absolute inset-0 flex flex-col gap-1.5 justify-center">
                  <div className="w-3/4 h-1.5 bg-neutral-800 rounded-full" />
                  <div className="w-1/3 h-1.5 bg-neutral-800 rounded-full" />
                </div>
                <div className="result-content flex flex-col gap-1.5">
                  <div className="w-2/3 h-2 bg-neutral-400 rounded-full" />
                  <div className="w-2/5 h-1.5 bg-neutral-600 rounded-full" />
                </div>
             </div>
             <div className="text-[10px] text-neutral-600 font-mono w-4 text-center">2</div>
          </div>

          {/* Result 3 (Zenlio) */}
          <div className="result-item zenlio-result w-full h-14 bg-neutral-900/50 border border-white/5 rounded-lg p-2 flex items-center gap-3 relative z-20 shadow-xl">
             <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center shrink-0">
               <div className="w-3 h-3 bg-primary rounded-sm" />
             </div>
             <div className="flex-1 relative">
                <div className="result-skeleton absolute inset-0 flex flex-col gap-1.5 justify-center">
                  <div className="w-1/2 h-1.5 bg-neutral-800 rounded-full" />
                  <div className="w-3/4 h-1.5 bg-neutral-800 rounded-full" />
                </div>
                <div className="result-content flex flex-col gap-1.5">
                  <div className="w-1/2 h-2 bg-primary rounded-full" />
                  <div className="w-3/4 h-1.5 bg-neutral-400 rounded-full" />
                </div>
             </div>
             <div className="flex flex-col items-center justify-center w-6">
                <ArrowUp className="w-3 h-3 rank-arrow absolute -top-2" />
                <div className="zenlio-rank text-[10px] text-neutral-500 font-bold font-mono">3</div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
