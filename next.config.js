/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/qmap/suggestion",
        destination: "https://apis.map.qq.com/ws/place/v1/suggestion",
      },
      {
        source: "/api/qmap/geocoder",
        destination: "https://apis.map.qq.com/ws/geocoder/v1",
      },
    ];
  },
  output: "standalone",
};

module.exports = nextConfig;
