import { DEFAULT_WHATSAPP_NUMBER, getSiteUrl } from "@/lib/site";

const NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
const SITE = getSiteUrl();

export function buildWhatsAppLink(opts: {
  productName?: string;
  reference?: string;
  path?: string;
  message?: string;
}) {
  let text = opts.message;
  if (!text) {
    if (opts.productName) {
      text = `Bonjour CHINAPAL, je souhaite obtenir le prix et la disponibilité de ${opts.productName}${opts.reference ? ` (réf: ${opts.reference})` : ""}.`;
      if (opts.path) text += ` Lien: ${SITE}${opts.path}`;
    } else {
      text = "Bonjour CHINAPAL, j'ai besoin d'une assistance pour choisir des pièces pour ma voiture.";
    }
  }
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildCartWhatsAppLink(items: { name: string; reference: string; quantity: number }[]) {
  if (items.length === 0) return buildWhatsAppLink({});
  const lines = items.map((i) => `• ${i.name} (réf: ${i.reference}) × ${i.quantity}`).join("\n");
  const msg = `Bonjour CHINAPAL, je souhaite un devis pour les pièces suivantes :\n${lines}\n\nMerci de me contacter pour confirmer la disponibilité et le prix.`;
  return buildWhatsAppLink({ message: msg });
}

export const WHATSAPP_NUMBER = NUMBER;
