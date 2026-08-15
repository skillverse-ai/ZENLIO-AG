"use client";

import React, { useState } from "react";
import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, PhoneIcon, MapPinIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: "Something went wrong. Please try again or contact us directly.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 pt-28 pb-16 bg-background overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl relative z-10 space-y-6">
        
        {/* Back to Home Link */}
        <div className="flex justify-start">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-neutral-400 hover:text-white flex items-center gap-2 hover:bg-neutral-900 rounded-full px-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to home</span>
            </Button>
          </Link>
        </div>

        {/* Contact Bento Card */}
        <ContactCard
          title="Get in touch"
          description="If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day."
          contactInfo={[
            {
              icon: MailIcon,
              label: "Email",
              value: "hello@zenlio.io",
            },
            {
              icon: PhoneIcon,
              label: "Phone",
              value: "+1 (555) 019-2834",
            },
            {
              icon: MapPinIcon,
              label: "Address",
              value: "San Francisco, CA",
              className: "col-span-1 md:col-span-2 lg:col-span-1",
            },
          ]}
        >
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="bg-neutral-900 border border-[#29292d] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors w-full"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="bg-neutral-900 border border-[#29292d] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors w-full"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="bg-neutral-900 border border-[#29292d] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors w-full"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="How can we help systemize your growth?"
                className="bg-neutral-900 border border-[#29292d] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors w-full h-24 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#ccff00] hover:bg-[#b3e600] disabled:bg-[#ccff00]/60 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-[#ccff00]/10 hover:shadow-[#ccff00]/20"
            >
              <span>{isSubmitting ? "Sending..." : "Submit"}</span>
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </button>

            {status.message && (
              <div
                className={cn(
                  "p-3.5 rounded-xl text-sm font-medium border text-center transition-all duration-300",
                  status.type === "success"
                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                )}
              >
                {status.message}
              </div>
            )}
          </form>
        </ContactCard>

      </div>
    </main>
  );
}
