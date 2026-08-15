"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register free GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

/**
 * Hook to manage GSAP contexts and cleanup safely.
 * Usage:
 * const containerRef = useRef(null);
 * useGsapContext(() => {
 *   gsap.to(".item", { x: 100 });
 * }, containerRef);
 */
export function useGsapContext(
  animationFn: (ctx: gsap.Context) => void,
  scopeRef: React.RefObject<HTMLElement | null>,
  dependencies: any[] = []
) {
  useEffect(() => {
    if (!scopeRef.current) return;
    
    let ctx = gsap.context(() => {
      animationFn(gsap.globalTimeline.context); // dummy context, the actual context is created by gsap.context
    }, scopeRef);
    
    // Proper way to use gsap.context
    ctx.add(animationFn);

    return () => {
      ctx.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopeRef, ...dependencies]);
}

/**
 * Hook to trigger a hover animation using GSAP context.
 */
export function useGsapHover(
  hoverActionFn: () => void,
  leaveActionFn: () => void,
  containerRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseEnter = () => hoverActionFn();
    const handleMouseLeave = () => leaveActionFn();

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, hoverActionFn, leaveActionFn]);
}
