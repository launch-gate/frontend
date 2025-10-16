import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/entities/locale/lib/request.ts",
);

const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
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
        permanent: false,
      },
    ];
  },
};

const configWithIntl = withNextIntl(nextConfig);

export default configWithIntl;
