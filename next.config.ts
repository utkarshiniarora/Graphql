import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  images: { remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }] },
  webpack: (config) => {
    config.resolve.alias['@'] = require('path').resolve(__dirname, 'src');
    return config;
  },
   eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;
