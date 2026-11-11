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
  async redirects() {
    return [
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/case-studies/visual-ehr", destination: "/#vehr", permanent: true },
      {
        source: "/case-studies/dell-childrens",
        destination: "/case-studies/dell-childrens-health-plan",
        permanent: true,
      },
      { source: "/case-studies/ovcp", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
