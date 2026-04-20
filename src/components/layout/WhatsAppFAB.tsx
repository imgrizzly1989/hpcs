"use client";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function WhatsAppFAB() {
  const href = buildWhatsAppLink({});
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter HPCS sur WhatsApp"
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-4 ring-[#25D366]/20 transition hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
