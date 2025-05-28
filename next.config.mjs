/** @type {import('next').NextConfig} */

import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin/"

const nextConfig = {
  allowedDevOrigins: ["skl.smpn3rancah.my.id"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "9osfufczlqxp9lij.public.blob.vercel-storage.com",
        // hostname: "vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "skl.smpn3rancah.my.id",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // This is a workaround to avoid this Prisma issue on Vercel
    // https://github.com/prisma/prisma/discussions/19499
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
}

export default nextConfig
