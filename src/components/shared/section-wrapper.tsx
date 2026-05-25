"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  bg?: "white" | "gray" | "brand";
}

export function SectionWrapper({ children, className = "", id, bg = "white" }: SectionWrapperProps) {
  const bgClass = bg === "gray" ? "bg-[#F8FAFC]" : bg === "brand" ? "bg-brand text-white" : "bg-white";

  return (
    <section id={id} className={`py-14 md:py-20 ${bgClass} ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({
  badge,
  title,
  description,
  className = "",
  align = "center",
}: {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-10 md:mb-12 ${align === "center" ? "text-center max-w-xl mx-auto" : ""} ${className}`}>
      {badge && (
        <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">{badge}</p>
      )}
      <h2 className="text-xl md:text-2xl lg:text-[28px] font-bold tracking-tight text-dark-text leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[14px] md:text-[15px] text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export function FadeIn({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
