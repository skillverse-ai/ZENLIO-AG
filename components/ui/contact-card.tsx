"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, PlusIcon } from "lucide-react";

type ContactInfoProps = React.ComponentProps<"div"> & {
  icon: LucideIcon;
  label: string;
  value: string;
};

type ContactCardProps = React.ComponentProps<"div"> & {
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

export function ContactCard({
  title = "Contact With Us",
  description = "If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.",
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={cn(
        "bg-[#171717] border border-[#29292d] rounded-[25px] relative grid h-full w-full shadow-2xl md:grid-cols-2 lg:grid-cols-3 overflow-visible",
        className
      )}
      {...props}
    >
      <PlusIcon className="absolute -top-3 -left-3 h-6 w-6 text-primary animate-pulse" />
      <PlusIcon className="absolute -top-3 -right-3 h-6 w-6 text-primary animate-pulse" />
      <PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-primary animate-pulse" />
      <PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6 text-primary animate-pulse" />
      
      <div className="flex flex-col justify-between lg:col-span-2">
        <div className="relative h-full space-y-4 p-6 md:p-10">
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl text-white">
            {title}
          </h1>
          <p className="text-neutral-400 max-w-xl text-sm md:text-base lg:text-lg leading-relaxed">
            {description}
          </p>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-6 border-t border-white/5">
            {contactInfo?.map((info, index) => (
              <ContactInfo key={index} {...info} />
            ))}
          </div>
        </div>
      </div>
      
      <div
        className={cn(
          "bg-[#1f1f23]/30 backdrop-blur-md flex h-full w-full items-center border-t border-white/5 p-6 md:p-10 md:col-span-1 md:border-t-0 md:border-l rounded-b-[25px] md:rounded-r-[25px] md:rounded-bl-none",
          formSectionClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  className,
  ...props
}: ContactInfoProps) {
  return (
    <div className={cn("flex items-center gap-3.5 py-2.5 px-4 rounded-xl bg-neutral-900/40 border border-white/5", className)} {...props}>
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-2.5 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-semibold text-sm text-neutral-200">{label}</p>
        <p className="text-neutral-400 text-xs mt-0.5">{value}</p>
      </div>
    </div>
  );
}
