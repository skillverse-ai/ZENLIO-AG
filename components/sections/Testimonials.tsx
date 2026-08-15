"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    className: "md:col-span-7 h-[400px]",
    background: "bg-gradient-to-br from-neutral-800 to-neutral-950",
    title: "Web Platform Design",
  },
  {
    id: 2,
    className: "md:col-span-5 h-[400px]",
    background: "bg-gradient-to-bl from-neutral-900 to-black",
    title: "Mobile App Interfaces",
  },
  {
    id: 3,
    className: "md:col-span-5 h-[350px]",
    background: "bg-gradient-to-tr from-black to-neutral-900",
    title: "Workspace UI",
  },
  {
    id: 4,
    className: "md:col-span-7 h-[350px]",
    background: "bg-gradient-to-tl from-neutral-950 to-neutral-800",
    title: "Data Dashboards",
  },
];

export function Testimonials() {
  return (
    <section className="w-full bg-background py-32 relative border-b border-border overflow-hidden">
      
      {/* Huge Background Text Gradient */}
      <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none z-0 select-none -translate-x-16 md:-translate-x-32">
        <h2 className="text-[18vw] font-bold text-transparent bg-clip-text bg-gradient-to-b from-neutral-100/40 via-neutral-300/10 to-transparent tracking-tighter leading-none mt-2 md:-mt-2 pr-12">
          Projects{" "}
        </h2>
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 pt-10">
        
        {/* 4-Item Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className={cn(
                "rounded-[15px] overflow-hidden border border-white/5 shadow-2xl relative group cursor-pointer flex items-center justify-center",
                project.className,
                project.background
              )}
            >
              {/* Optional overlay effect on hover */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
              
              {/* Placeholder Content (Can be replaced with real images) */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0">
                 <p className="text-white font-semibold text-xl">{project.title}</p>
                 <p className="text-white/60 text-sm mt-1">View Case Study &rarr;</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
