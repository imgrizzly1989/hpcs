/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/phares-maroc", destination: "/categorie/carrosserie/phares-feux", permanent: true },
      { source: "/pare-chocs-maroc", destination: "/categorie/carrosserie/pare-chocs", permanent: true },
      { source: "/retroviseurs-maroc", destination: "/categorie/carrosserie/retroviseurs", permanent: true },
    ];
  },
};
export default nextConfig;
