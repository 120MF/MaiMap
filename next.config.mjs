/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/qmap",
        destination: "https://apis.map.qq.com/ws/place/v1/suggestion",
      },
    ];
  },
};

export default nextConfig;
