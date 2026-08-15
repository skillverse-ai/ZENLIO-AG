import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.ngrok-free.dev",
    "*.ngrok.io",
    "serrated-turbulent-collie.ngrok-free.dev",
    "localhost:3000",
    "localhost:3001",
  ],
};

export default nextConfig;
