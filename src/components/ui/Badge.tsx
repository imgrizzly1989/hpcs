import * as React from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "success" | "danger" | "warning" | "info";
const tones: Record<Tone, string> = {
  default: "bg-neutral-100 text-brand-charcoal",
  success: "bg-green-100 text-green-800",
  danger: "bg-red-100 text-brand-red",
  warning: "bg-amber-100 text-amber-800",
  info: "bg-blue-100 text-blue-800",
};

export function Badge({ tone = "default", className, ...props }: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", tones[tone], className)}
      {...props}
    />
  );
}
