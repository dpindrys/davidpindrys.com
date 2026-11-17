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
  /**
   * `public/` is served as static CDN assets on Vercel. Keep it out of serverless
   * function traces — filesystem reads under `public/` (e.g. photo scanning) must
   * not package ~290MB of media into the homepage function (250MB limit).
   */
  outputFileTracingExcludes: {
    "*": ["./public/**/*"],
  },
  async redirects() {
    return [
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/case-studies/visual-ehr", destination: "/#vehr", permanent: true },
      {
        source: "/case-studies/dell-childrens",
        destination: "/#dell",
        permanent: true,
      },
      {
        source: "/case-studies/dell-childrens-health-plan",
        destination: "/#dell",
        permanent: true,
      },
      { source: "/case-studies/ovcp", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
