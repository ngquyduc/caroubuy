/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: [
      "mongoose",
      "puppeteer-extra",
      "puppeteer-extra-plugin-stealth",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.karousell.com",
      },
    ],
  },
};

export default nextConfig;
