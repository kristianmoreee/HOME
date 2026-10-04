import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // STATIC_EXPORT=1 produces a plain static site in out/ for shareable previews.
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  ...(process.env.STATIC_EXPORT ? { output: "export", images: { unoptimized: true } } : {}),
};

export default nextConfig;
