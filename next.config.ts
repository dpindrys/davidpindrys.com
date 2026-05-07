import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
    /**
     * Allow `next/image` for files under `public/images/**`.
     * Omit `search` so optional cache-bust query strings (e.g. `?v=…`) on local src are allowed.
     * @see https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns
     */
    localPatterns: [{ pathname: "/images/**" }],
  },
};

export default nextConfig;
