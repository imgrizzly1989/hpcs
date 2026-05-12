export const PRODUCTION_SITE_URL = "https://chinapieceauto.com";
export const DEFAULT_WHATSAPP_NUMBER = "212650542999";

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  // Never let staging / Vercel preview domains leak into canonical, sitemap,
  // schema, or WhatsApp links for the public site.
  if (!raw || raw.includes("hpcs.vercel.app") || raw.includes("vercel.app") || raw.includes("localhost")) {
    return PRODUCTION_SITE_URL;
  }

  return raw.replace(/\/$/, "");
}
