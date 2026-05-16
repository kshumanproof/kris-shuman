import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.0.0.10"],

  images: {
    formats: ["image/avif", "image/webp"],
  },

  compress: true,

  poweredByHeader: false,
};

export default nextConfig;