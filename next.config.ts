import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // project images are served at quality 85 (75 is the Next.js default)
    qualities: [75, 85],
  },
};

export default nextConfig;
