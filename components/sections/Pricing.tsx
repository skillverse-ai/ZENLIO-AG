"use client";

import React, { useRef, useState, useEffect } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const plans = [
  {
    id: "website",
    title: "Website &\nDevelopment",
    description: "Custom websites designed, developed and deployed for your business.",
    priceUSD: "$1,000",
    priceINR: "₹40,000 INR",
    recommended: false,
    initialFeaturesCount: 4,
    features: [
      "Custom Website Design",
      "Responsive Development",
      "Frontend & Backend Integration",
      "Deployment & Hosting Setup",
      "Performance Optimization",
      "Basic SEO & Analytics Setup",
    ],
    addons: {
      chips: ["SEO", "AEO", "GEO"],
      note: "Monthly Maintenance & Optimization — ₹10,000 INR / mo",
    },
  },
  {
    id: "automation",
    title: "Automation &\nWorkflows",
    description: "Automate repetitive business processes and connect your existing tools.",
    priceUSD: "$750",
    priceINR: "₹30,000 INR",
    recommended: false,
    initialFeaturesCount: 4,
    features: [
      "n8n Workflow Automation",
      "API & Webhook Integrations",
      "Business Process Automation",
      "Lead & Form Automation",
      "Notifications & Alerts",
      "Data Sync & Custom Logic",
    ],
    recurring: [
      "Workflow Monitoring",
      "Maintenance & Optimization",
      "New Workflow Development",
    ],
  },
  {
    id: "ai",
    title: "Website + AI\nAutomations",
    description: "Digital presence combined with intelligent AI-powered business automation.",
    priceUSD: "$1,500",
    priceINR: "₹60,000 INR",
    recommended: true,
    badge: "RECOMMENDED",
    initialFeaturesCount: 5,
    features: [
      "Custom Website & Responsive Dev",
      "AI Chatbot / Assistant Integration",
      "AI Workflow & n8n Automation",
      "Lead Capture & CRM Integration",
      "Deployment & System Integration",
      "Performance & Security Tuning",
    ],
    addons: {
      chips: ["SEO", "AEO", "GEO"],
      note: "Monthly Maintenance & AI Upgrades • ₹15,000 INR / mo",
    },
  },
  {
    id: "custom",
    title: "Custom Solutions",
    description: "Bespoke software, AI agents and automation systems for unique requirements.",
    priceUSD: "Custom",
    priceINR: "Custom Quote",
    recommended: false,
    initialFeaturesCount: 4,
    features: [
      "Complex Web Applications",
      "AI Agents & Voice Assistant Systems",
      "RAG Systems & Vector DBs",
      "Enterprise Multi-Tool Automation",
      "Custom APIs & Admin Dashboards",
      "Bespoke Architecture & CRM Sync",
    ],
  },
];

const faqs = [
  {
    question: "How does the pricing work for international vs Indian clients?",
    answer:
      "We offer transparent package pricing with prices displayed primarily in USD ($) alongside the approximate INR (₹) equivalent.",
  },
  {
    question: "Are maintenance and optimization included?",
    answer:
      "Basic deployment and performance optimization are included in all packages. Recurring monthly maintenance, workflow monitoring, and AI agent upgrades are available as flexible monthly add-ons.",
  },
  {
    question: "Can we request custom integrations or AI features?",
    answer:
      "Yes! Our 'Custom Solutions' tier is built specifically for bespoke web platforms, specialized RAG systems, voice agents, and complex multi-tool enterprise automation.",
  },
];

export function Pricing() {
  const [activeIndex, setActiveIndex] = useState<number>(2); // Default to Website + AI Automations
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Dragging state for mouse drag support
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeftStart = useRef<number>(0);

  const toggleExpand = (e: React.MouseEvent, cardId: string) => {
    e.stopPropagation();
    setExpandedCards((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  // Scroll to index helper
  const scrollToIndex = (index: number) => {
    const targetCard = cardRefs.current[index];
    const container = carouselRef.current;
    if (targetCard && container) {
      const containerWidth = container.offsetWidth;
      const cardLeft = targetCard.offsetLeft;
      const cardWidth = targetCard.offsetWidth;
      
      const targetScrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      
      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  // Detect which card is centered on manual scroll/drag
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    let closestIndex = activeIndex;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  // Scroll to active index initially on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToIndex(activeIndex);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftStart.current = carouselRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      scrollToIndex(activeIndex);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftStart.current - walk;
    handleScroll();
  };

  return (
    <section id="pricing" className="w-full bg-[#050A07] text-white py-20 relative border-b border-border overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center text-xs font-bold text-primary tracking-widest uppercase">
            PRICING & PACKAGES
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Transparent Service Packages.
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto pt-0.5">
            Engineered for businesses ready to scale. Select the service level that matches your growth trajectory.
          </p>
        </div>

        {/* Carousel Outer Wrapper */}
        <div className="relative mb-14">

          {/* Horizontal Coverflow Carousel Container */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className="flex items-stretch gap-5 md:gap-7 overflow-x-auto snap-x snap-mandatory py-6 px-[8vw] sm:px-[18vw] md:px-[22vw] lg:px-[26vw] cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden"
            style={{
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {plans.map((pkg, idx) => {
              const isActive = activeIndex === idx;
              const isExpanded = !!expandedCards[pkg.id];
              const visibleFeatures = isExpanded
                ? pkg.features
                : pkg.features.slice(0, pkg.initialFeaturesCount);
              const hasMoreFeatures = pkg.features.length > pkg.initialFeaturesCount;

              return (
                <div
                  key={pkg.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onClick={() => scrollToIndex(idx)}
                  className={`shrink-0 w-[85vw] sm:w-[350px] md:w-[370px] snap-center relative rounded-[25px] p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out transform-gpu bento-card ${
                    isActive
                      ? "scale-100 opacity-100 z-20 bento-card-active"
                      : "scale-95 opacity-50 z-10"
                  }`}
                >
                  <div>
                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-primary mb-1.5 leading-snug whitespace-pre-line">
                      {pkg.title}
                    </h3>
                    <p className="text-neutral-400 text-xs leading-snug min-h-[34px] mb-4">
                      {pkg.description}
                    </p>

                    {/* Compact Primary USD Pricing Box */}
                    <div
                      className={`py-3 px-4 rounded-xl border transition-all duration-300 space-y-0.5 mb-5 ${
                        isActive
                          ? "bg-[#060B08] border-primary/20"
                          : "bg-[#060B08] border-white/5"
                      }`}
                    >
                      <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {pkg.priceUSD}
                      </div>
                      <div className="text-[11px] font-medium text-neutral-400">
                        {pkg.priceINR}
                      </div>
                    </div>

                    {/* Feature Bullet List */}
                    <div className="space-y-1.5 mb-4">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        INCLUDED:
                      </div>
                      {visibleFeatures.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-[13px] text-slate-200 leading-tight">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}

                      {hasMoreFeatures && (
                        <button
                          onClick={(e) => toggleExpand(e, pkg.id)}
                          className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                        >
                          <span>{isExpanded ? "Show less" : `View all features (+${pkg.features.length - pkg.initialFeaturesCount})`}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      )}
                    </div>

                    {/* Recurring Services (Package 02) */}
                    {pkg.recurring && (
                      <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 mb-4">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                          OPTIONAL RECURRING:
                        </div>
                        {pkg.recurring.map((item, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-1.5 text-[12px] text-neutral-300 leading-tight">
                            <span className="text-primary font-bold">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add-ons Area (Packages 01 & 03) */}
                    {pkg.addons && (
                      <div className="mt-4 pt-3 border-t border-white/10 space-y-2 mb-4">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          ADD-ONS:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {pkg.addons.chips.map((chip, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-primary/40 text-primary bg-primary/5"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                        {pkg.addons.note && (
                          <p className="text-[11px] text-neutral-400 leading-snug pt-0.5 whitespace-pre-line">
                            {pkg.addons.note}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Choose Plan CTA */}
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToIndex(idx);
                        const contactElem = document.getElementById("contact") || document.getElementById("cta");
                        if (contactElem) {
                          contactElem.scrollIntoView({ behavior: "smooth" });
                        } else {
                          window.location.href = "#contact";
                        }
                      }}
                      className={`w-full py-3 rounded-lg font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                        isActive
                          ? "bg-primary text-black hover:bg-primary/90 shadow-md shadow-primary/20"
                          : "bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/10"
                      }`}
                    >
                      <span>Choose Plan →</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Minimal Pagination Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {plans.map((_, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Go to plan ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-7 bg-primary shadow-[0_0_12px_rgba(132,204,22,0.6)]"
                      : "w-2 bg-white/20 hover:bg-white/40 cursor-pointer"
                  }`}
                />
              );
            })}
          </div>

        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-white/5">
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-1.5 p-4 rounded-xl bg-neutral-950/60 border border-white/5">
                <h4 className="text-sm font-semibold text-white leading-snug">
                  {faq.question}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
