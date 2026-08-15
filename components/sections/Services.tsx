"use client";

import { motion } from "framer-motion";
import { MonitorSmartphone, DatabaseZap, Bot, Filter, Sparkles, Server, Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Animated components removed as per user request
const Noise = () => (
  <div
    className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay pointer-events-none"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  ></div>
);

const services = [
  {
    title: "Website Design & Development",
    description: "Digital storefronts engineered for performance and conversion over pure aesthetics.",
    features: [
      "Turn traffic into booked calls instantly with load speeds that eliminate bounce rates."
    ],
    className: "md:col-span-3 min-h-[300px] lg:min-h-[400px]",
    visual: (
      <img 
        src="/images/website-laptop.webp" 
        alt="Website Design Laptop" 
        className="w-full h-full object-contain object-top scale-[1.06] -translate-y-6 opacity-80" 
      />
    )
  },
  {
    title: "AI Automation & Workflows",
    description: "Replacing repetitive manual labor with tireless, error-free systems.",
    features: [
      "Never miss a lead again with instant routing, recovering lost hours every single week."
    ],
    className: "md:col-span-3 min-h-[300px] lg:min-h-[400px]",
    visual: (
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain object-top scale-105 -translate-y-6 opacity-80"
      >
        <source src="/videos/Integrations_Staggered_202608131740_gwr_video_mvp.mp4" type="video/mp4" />
      </video>
    )
  },
  {
    title: "Website & AI Automation",
    description: "Connecting your tech stack so data flows seamlessly across your business.",
    features: [
      "Create a single source of truth for client data while automating onboarding and fulfillment."
    ],
    className: "md:col-span-2 min-h-[400px] lg:min-h-[450px]",
    visual: (
      <img 
        src="/images/website-and-auto.webp" 
        alt="Website and AI Automation Dashboard" 
        className="w-full h-full object-contain object-top scale-105 opacity-80" 
      />
    )
  },
  {
    title: "SEO / Google",
    description: "Get found on Google. We improve your search visibility to drive organic, high-intent traffic.",
    features: [
      "Dominate search rankings and capture high-intent leads passively."
    ],
    className: "md:col-span-2 min-h-[400px] lg:min-h-[450px]",
    visual: (
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover object-center scale-[1.25] -translate-y-16 opacity-80"
      >
        <source src="/videos/search_(1)_20260813101855.mp4" type="video/mp4" />
      </video>
    )
  },
  {
    title: "Custom Solutions",
    description: "Bespoke technical architecture for complex operational challenges.",
    features: [
      "Solve highly specific bottlenecks with scalable architecture built for rapid growth."
    ],
    className: "md:col-span-2 min-h-[400px] lg:min-h-[450px]",
    visual: (
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover object-center scale-[1.25] -translate-y-20 opacity-80"
      >
        <source src="/videos/custom_20260812174233.mp4" type="video/mp4" />
      </video>
    )
  },
];

export function Services() {
  return (
    <section className="w-full bg-background py-24 border-b border-border">
      <div className="container px-4 md:px-6 mx-auto">

        <div className="flex flex-col space-y-4 mb-20 max-w-4xl mx-auto md:text-left text-center">
          <div>
            <div className="inline-flex items-center text-sm font-bold text-primary tracking-widest uppercase">
              OUR SERVICES
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
            The Services
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            We engineer custom ecosystems combining high-conversion design with ruthless automation.
          </p>
        </div>

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-[25px] max-w-6xl mx-auto auto-rows-min">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: index * 0.1 }}
              className={cn(
                "group relative overflow-hidden bento-card flex flex-col",
                service.className
              )}
            >
              {/* Background Visual */}
              {service.visual && (
                <div className="absolute inset-0 z-0">
                  {service.visual}
                </div>
              )}

              {/* Gradient Mask for Text Readability */}
              {service.visual && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] from-[-5%] via-[#171717]/80 via-[35%] to-transparent to-[70%] z-10 pointer-events-none" />
              )}

              <Noise />

              {/* Content Area */}
              <div className="relative p-6 md:p-8 z-20 mt-auto bg-gradient-to-t from-[#171717] via-[#171717] to-transparent">
                <h3 className="text-2xl font-bold text-neutral-100 mb-4">{service.title}</h3>

                {service.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-neutral-300">
                        <svg className="w-4 h-4 text-primary mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {service.features.length > 0 && (
                  <div className="inline-flex items-center text-xs font-bold tracking-widest text-primary uppercase group-hover:text-white transition-colors cursor-pointer mt-auto">
                    EXPLORE SPECS <span className="ml-2">→</span>
                  </div>
                )}
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
