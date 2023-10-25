/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.to2beer.com'],
  },
  async headers() {
    return [
      {
        // Allow requests from any origin
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
}

module.exports = nextConfig
