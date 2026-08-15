"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "skillverse",
    title: "SkillVerse AI",
    description: "AI-focused platform / digital experience.",
    url: "https://skillverseai.vercel.app",
    image: "/projects/skillverse.png",
    alt: "SkillVerse AI project dashboard",
    className: "md:col-span-7 h-[420px]",
  },
  {
    id: "shivam-dental",
    title: "Shivam Dental",
    description: "Dental clinic digital experience.",
    url: "https://shivam-dental-18.vercel.app",
    image: "/projects/shivam-dental.png",
    alt: "Shivam Dental project dashboard",
    className: "md:col-span-5 h-[420px]",
  },
  {
    id: "fitness19",
    title: "Fitness19",
    description: "Fitness and wellness digital experience.",
    url: "https://fitness19.vercel.app",
    image: "/projects/fitness19.png",
    alt: "Fitness19 project dashboard",
    className: "md:col-span-5 h-[400px]",
  },
  {
    id: "icraft-designz",
    title: "iCraft Designz",
    description: "Architecture & interiors digital experience.",
    url: "https://icraftdesignz.com",
    image: "/projects/icraft-designz.png",
    alt: "iCraft Designz project dashboard",
    className: "md:col-span-7 h-[400px]",
  },
];

export function Projects() {
  return (
    <section id="projects" className="w-full bg-background py-24 border-b border-border scroll-mt-20 relative overflow-hidden">
      


      <div id="work" className="container px-4 md:px-6 mx-auto relative z-10 pt-10">

        {/* Section Header */}
        <div className="flex flex-col space-y-4 mb-14 max-w-4xl mx-auto md:text-left text-center">
          <div>
            <div className="inline-flex items-center text-sm font-bold text-primary tracking-widest uppercase">
              SELECTED WORK
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
            Featured Projects & Product Showcases.
          </h2>
          <p className="text-xl text-neutral-400">
            Explore recent digital platforms, web applications, and automated ecosystems built for scale.
          </p>
        </div>

        {/* Dynamic Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className={cn(
                "group relative flex flex-col bento-card overflow-hidden cursor-pointer",
                project.className
              )}
            >
              {/* Full Card Cover Image */}
              <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.alt}
                  className="w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Gradient Mask for Content Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/60 to-transparent z-10 pointer-events-none" />

              {/* Content Info */}
              <div className="relative z-20 p-6 md:p-8 mt-auto flex flex-col justify-between h-full">
                <div className="flex items-center justify-end">
                  <div className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white group-hover:text-primary group-hover:border-primary/50 transition-colors">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <div className="pt-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                    {project.title}
                  </h3>
                  <p className="text-neutral-300 text-sm md:text-base mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
