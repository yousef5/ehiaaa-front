import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 font-tajawal text-4xl font-bold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 font-tajawal text-3xl font-bold tracking-tight lg:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 font-tajawal text-2xl font-bold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ children, className }: TypographyProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 font-tajawal text-xl font-bold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function TypographyP({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        "font-ibm-plex leading-7 [&:not(:first-child)]:mt-6",
        className
      )}
    >
      {children}
    </p>
  );
}

export function TypographyLarge({ children, className }: TypographyProps) {
  return (
    <div className={cn("font-tajawal text-lg font-semibold", className)}>
      {children}
    </div>
  );
}

export function TypographySmall({ children, className }: TypographyProps) {
  return (
    <small
      className={cn(
        "font-ibm-plex text-sm font-medium leading-none",
        className
      )}
    >
      {children}
    </small>
  );
}

export function TypographyMuted({ children, className }: TypographyProps) {
  return (
    <p className={cn("font-ibm-plex text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function TypographyLead({ children, className }: TypographyProps) {
  return (
    <p className={cn("font-tajawal text-xl text-muted-foreground", className)}>
      {children}
    </p>
  );
}
