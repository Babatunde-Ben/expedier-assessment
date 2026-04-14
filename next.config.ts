import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This configures custom Turbopack rules to handle SVG files using @svgr/webpack, allowing SVGs to be imported as React components.

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.tsx",
      },
    },
  },
};

export default nextConfig;
