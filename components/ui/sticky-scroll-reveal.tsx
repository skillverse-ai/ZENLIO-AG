"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    step?: string;
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="flex justify-center items-start relative space-x-16 rounded-md p-10 bg-transparent"
      ref={ref}
    >
      {/* Left side fixed elements (Sync bar + Image) */}
      <div className="hidden lg:flex items-center space-x-12 sticky top-40 h-[450px]">
        
        {/* Sync Bar */}
        <div className="flex flex-col items-center justify-between h-full py-2">
          <span className="text-sm font-bold text-neutral-500">01</span>
          <div className="relative w-1 flex-1 bg-neutral-800/50 rounded-full my-4 overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 w-full bg-primary rounded-full origin-top"
              initial={false}
              animate={{
                height: `${((activeCard + 1) / content.length) * 100}%`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
          <span className="text-sm font-bold text-neutral-500">
            {content.length < 10 ? `0${content.length}` : content.length}
          </span>
        </div>

        {/* Image / Visual Content */}
        <div
          className={cn(
            "h-[450px] w-[550px] rounded-[15px] overflow-hidden shadow-2xl border border-white/5 bg-neutral-950",
            contentClassName
          )}
        >
          {content[activeCard].content ?? null}
        </div>
      </div>

      {/* Text Content (Moved to the right) */}
      <div className="div relative flex items-start px-4">
        <div className="max-w-xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="py-40">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-4xl font-bold text-slate-100"
              >
                {item.step && (
                  <span className="block text-sm font-bold tracking-widest text-primary mb-3 uppercase">
                    {item.step}
                  </span>
                )}
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-xl text-slate-300 max-w-md mt-6 leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
    </motion.div>
  );
};
