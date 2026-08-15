import { Search, PenTool, Code, Rocket, Activity } from "lucide-react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const features = [
  {
    id: "discovery",
    step: "STEP 01",
    title: "Discovery & Audit",
    description: "We map your current website, tools, and workflows to find exactly where leads are slipping through and where your time is going to waste.",
    icon: Search,
    image: "/images/step1.webp",
  },
  {
    id: "strategy",
    step: "STEP 02",
    title: "Strategy & System Design",
    description: "Site structure, automation flows, and CRM logic get mapped as one system - before a single page gets designed or a line of code gets written.",
    icon: PenTool,
    image: "/images/step2.webp",
  },
  {
    id: "build",
    step: "STEP 03",
    title: "Build Phase",
    description: "Website and automations are built in parallel, not handed off in sequence, so nothing launches half-connected or waiting on the other half.",
    icon: Code,
    image: "/images/step3.webp",
  },
  {
    id: "test",
    step: "STEP 04",
    title: "Test & Launch",
    description: "Every form, automation, and integration gets stress-tested against real scenarios - not just clicked through once - before it ever reaches a live lead.",
    icon: Rocket,
    image: "/images/step4.webp",
  },
  {
    id: "support",
    step: "STEP 05",
    title: "Support & Optimize",
    description: "We stay on after launch to monitor performance and refine the system as your lead volume and business grow.",
    icon: Activity,
    image: "/images/step5.webp",
  },
];

const stickyScrollContent = features.map((feature) => ({
  step: feature.step,
  title: feature.title,
  description: feature.description,
  content: (
    <div className="h-full w-full bg-[#0a0a0a] flex items-center justify-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
      {feature.image ? (
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover object-center opacity-90"
        />
      ) : (
        <feature.icon className="w-32 h-32 text-primary opacity-20" />
      )}
    </div>
  ),
}));

export function Solution() {
  return (
    <section className="w-full bg-background py-24 border-b border-border">
      <div className="container px-4 md:px-6 mx-auto">

        {/* Section Header */}
        <div className="flex flex-col space-y-4 mb-20 max-w-4xl mx-auto md:text-left text-center">
          <div>
            <div className="inline-flex items-center text-sm font-bold text-primary tracking-widest uppercase">
              HOW IT WORKS
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
            The blueprint for building your automated ecosystem.
          </h2>
        </div>

        <div className="w-full">
          <StickyScroll content={stickyScrollContent} />
        </div>

      </div>
    </section>
  );
}
