"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary: "bg-brand-red text-white hover:bg-red-700 focus:ring-brand-red",
  secondary: "bg-brand-charcoal text-white hover:bg-neutral-800 focus:ring-brand-charcoal",
  outline: "border border-neutral-300 text-brand-charcoal hover:bg-neutral-50 focus:ring-neutral-400",
  ghost: "text-brand-charcoal hover:bg-neutral-100",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe57] focus:ring-[#25D366]",
};
const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
