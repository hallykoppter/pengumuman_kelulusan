/** @type {import('next').NextConfig} */
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
}

export default nextConfig
