import path from "node:path";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/entities/locale/lib/request.ts",
);

const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  outputFileTracingRoot: path.resolve("."),
  compiler: {
    styledComponents: true,
  },
  productionBrowserSourceMaps: false,
  eslint: { ignoreDuringBuilds: true },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["prom-client"] = false;
    }
    return config;
  },
  experimental: {
    optimizePackageImports: [
      "antd",
      "react-virtuoso",
      "@mdxeditor/editor",
      "@virtuoso.dev/message-list",
      "dayjs",
      "lodash.debounce",
    ],
  },
  transpilePackages: [
    "three",
    "rc-util",
    "@ant-design",
    "kitchen-flow-editor",
    "@ant-design/pro-editor",
    "zustand",
    "leva",
    "antd",
    "rc-pagination",
    "rc-picker",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home-page",
        permanent: true,
      },
    ];
  },
};

const configWithIntl = withNextIntl(nextConfig);

// next-intl uses experimental.turbo for the alias, but Next.js 16 moved
// Turbopack config to the top-level `turbopack` key — add it manually.
configWithIntl.turbopack = {
  ...configWithIntl.turbopack,
  resolveAlias: {
    ...configWithIntl.turbopack?.resolveAlias,
    "next-intl/config": "./src/entities/locale/lib/request.ts",
  },
};

export default configWithIntl;
