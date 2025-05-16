import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["https://emerging-wired-killdeer.ngrok-free.app"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // not recommended for production
  },
};

export default nextConfig;
