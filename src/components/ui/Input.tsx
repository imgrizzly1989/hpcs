import * as React from "react";
import { cn } from "@/lib/cn";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:border-brand-red",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[100px] w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:border-brand-red",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
