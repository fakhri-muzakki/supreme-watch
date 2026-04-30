import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // sesuaikan dengan linknya
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com", // sesuaikan dengan linknya
      },
      {
        protocol: "https",
        hostname: "ouiwqeyfrgyzftbnlhym.supabase.co", // sesuaikan dengan linknya
      },
    ],
  },
};

export default nextConfig;
