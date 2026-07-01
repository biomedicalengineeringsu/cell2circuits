"use client";

import { AnimatedSection } from "./AnimatedSection";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  center = true,
  className,
}: SectionHeaderProps) {
  const fullTitle = highlight
    ? title.replace(highlight, `<span class="gradient-text">${highlight}</span>`)
    : title;

  return (
    <div className={cn(center ? "text-center" : "", className)}>
      {badge && (
        <AnimatedSection delay={0}>
          <div className={cn("inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6", center ? "mx-auto" : "")}>
            <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-sky-400 text-sm font-medium">{badge}</span>
          </div>
        </AnimatedSection>
      )}
      <AnimatedSection delay={0.1}>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-white text-slate-900 mb-6 font-display leading-tight"
          dangerouslySetInnerHTML={{ __html: fullTitle }}
        />
      </AnimatedSection>
      {subtitle && (
        <AnimatedSection delay={0.2}>
          <p className={cn("text-slate-400 text-lg leading-relaxed", center ? "max-w-2xl mx-auto" : "max-w-2xl")}>
            {subtitle}
          </p>
        </AnimatedSection>
      )}
    </div>
  );
}
