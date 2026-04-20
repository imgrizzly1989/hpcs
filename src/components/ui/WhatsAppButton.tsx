"use client";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";

interface Props {
  productName?: string;
  reference?: string;
  path?: string;
  message?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
}

export function WhatsAppButton({
  productName,
  reference,
  path,
  message,
  label = "Demander le prix sur WhatsApp",
  size = "lg",
  className,
  fullWidth = true,
}: Props) {
  const href = buildWhatsAppLink({ productName, reference, path, message });
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={fullWidth ? "block w-full" : "inline-block"}>
      <Button variant="whatsapp" size={size} type="button" className={`${fullWidth ? "w-full" : ""} ${className ?? ""}`}>
        <MessageCircle className="h-5 w-5" />
        {label}
      </Button>
    </a>
  );
}
