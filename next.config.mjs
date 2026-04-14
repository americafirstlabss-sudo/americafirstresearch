/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "qvzavbjhfbovsxtcixld.supabase.co" },
      { protocol: "https", hostname: "cdn.shopify.com" }
    ]
  }
};

export default nextConfig;
