import path from "node:path";

const nextIntlConfigPath = "./src/entities/locale/lib/request.ts";
const nextIntlConfigAlias = path.resolve(nextIntlConfigPath);

const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  outputFileTracingRoot: path.resolve("."),
  compiler: {
    styledComponents: true,
  },
  productionBrowserSourceMaps: false,
  webpack: (config, { isServer }) => {
    config.resolve.alias["next-intl/config"] = nextIntlConfigAlias;

    if (!isServer) {
      config.resolve.alias["prom-client"] = false;
    }
    return config;
  },
  turbopack: {
    resolveAlias: {
      "next-intl/config": nextIntlConfigPath,
    },
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

export default nextConfig;
