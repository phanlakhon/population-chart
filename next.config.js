/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/population-chart",
  assetPrefix: "/population-chart/",
  trailingSlash: true,
  output: "export",
  reactStrictMode: true,
  // images: {
  //   unoptimized: true,
  // },

  // async rewrites() {
  //   return [
  //     {
  //       source: "/population-chart/:path*",
  //       destination: "/:path*", // The :path parameter is used here so will not be automatically passed in the query object.
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
