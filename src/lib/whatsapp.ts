const NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function buildWhatsAppLink(opts: {
  productName?: string;
  reference?: string;
  path?: string;
  message?: string;
}) {
  let text = opts.message;
  if (!text) {
    if (opts.productName) {
      text = `Bonjour HPCS, je suis intéressé(e) par ${opts.productName}${opts.reference ? ` (réf: ${opts.reference})` : ""}.`;
      if (opts.path) text += ` Lien: ${SITE}${opts.path}`;
    } else {
      text = "Bonjour HPCS, j'ai besoin d'une assistance pour choisir des pièces.";
    }
  }
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_NUMBER = NUMBER;
