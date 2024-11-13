/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/qmap/suggestion",
        destination: "https://apis.map.qq.com/ws/place/v1/suggestion",
      },
    ];
  },
  output: "standalone",
};

module.exports = nextConfig;
