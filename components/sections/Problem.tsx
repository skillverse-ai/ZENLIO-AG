"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Noise Texture for Premium Feel
const Noise = () => (
  <div
    className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay pointer-events-none"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  ></div>
);

const problems = [
  {
    title: "Low Conversion Rates",
    description: "Templates get you online, not customers. Visitors leave without a clear next step.",
    className: "md:row-span-2 min-h-[400px] lg:min-h-[500px]",
    visual: (
      <img 
        src="/images/problem-1.webp" 
        alt="Conversion Rates Dashboard" 
        className="w-full h-full object-cover object-center opacity-80" 
      />
    )
  },
  {
    title: "Manual Bottlenecks",
    description: "Growth is constrained when every lead and follow-up requires your direct involvement.",
    className: "md:col-span-1 min-h-[250px] lg:min-h-[280px]",
    visual: (
      <img 
        src="/images/problem-2.webp" 
        alt="Manual Bottlenecks Dashboard" 
        className="w-full h-full object-cover object-center opacity-80" 
      />
    )
  },
  {
    title: "Disconnected Systems",
    description: "Fragmented tools lead to lost context, data silos, and delayed responses.",
    className: "md:col-span-1 min-h-[250px] lg:min-h-[280px]",
    visual: (
      <img 
        src="/images/problem-3.webp" 
        alt="Disconnected Systems Dashboard" 
        className="w-full h-full object-contain scale-[1.25] translate-x-12 translate-y-8 opacity-80" 
      />
    )
  },
];

export function Problem() {
  return (
    <section className="w-full bg-background py-24 border-y border-border relative overflow-hidden">
      {/* Premium Background Glow */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">

        <div className="flex flex-col space-y-4 mb-16 max-w-4xl mx-auto md:text-left text-center">
          <div>
            <div className="inline-flex items-center text-sm font-bold text-primary mb-4 tracking-widest uppercase">
              THE REALITY CHECK
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
            The Growth Bottlenecks.
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            You're doing the work of five people. Here's where your systems are quietly costing you deals.
          </p>
        </div>

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px] max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: index * 0.1 }}
              className={cn(
                "group relative overflow-hidden bento-card flex flex-col justify-end",
                problem.className
              )}
            >
              {/* Background Visual */}
              <div className="absolute inset-0 z-0">
                {problem.visual}
              </div>

              {/* Gradient Mask for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717] from-[-5%] via-[#171717]/80 via-[35%] to-transparent to-[70%] z-10 pointer-events-none" />

              <Noise />

              {/* Content */}
              <div className="relative z-20 p-6 md:p-8 mt-auto flex flex-col gap-3">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-neutral-100 mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed text-sm">
                    {problem.description}
                  </p>
                </div>
              </div>

              {/* Decorative hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

