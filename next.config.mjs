/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
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
