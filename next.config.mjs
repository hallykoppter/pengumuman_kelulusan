/** @type {import('next').NextConfig} */
const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin")

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
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
}

export default nextConfig
