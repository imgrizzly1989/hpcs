"use client";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppOrderButton({ productName, reference, path }: { productName: string; reference?: string; path?: string }) {
  const href = buildWhatsAppLink({ productName, reference, path });
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex-1">
      <Button variant="whatsapp" size="lg" className="w-full" type="button">
        <MessageCircle className="h-5 w-5" />
        Demander le prix sur WhatsApp
      </Button>
    </a>
  );
}
