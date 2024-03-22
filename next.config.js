const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // assetPrefix: "/population-chart/",
  basePath: isProd ? "/population-chart" : undefined,
  trailingSlash: true,
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
