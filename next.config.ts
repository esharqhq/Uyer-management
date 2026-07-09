import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // hero images ship at 60–65 to keep LCP fast; content images at 70
    qualities: [60, 65, 70, 75],
  },
};

export default nextConfig;
