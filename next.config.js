/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Configure image domains for avatar loading
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.20",
        port: "3000",
        pathname: "/public/avatars/**",
      },
      {
        protocol: "http",
        hostname: "0.0.0.0",
        port: "3000",
        pathname: "/public/avatars/**",
      },
      {
        protocol: "http",
        hostname: "0.0.0.0",
        port: "3000",
        pathname: "/public/avatars/**",
      },
    ],
  },

  // Allow cross-origin requests during development
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },

  // Use a secure host configuration
  assetPrefix:
    process.env.NODE_ENV === "production" ? undefined : "http://0.0.0.0:3200",

  // Specify that the app is hosted at a specific URL in development
  basePath: "",
};

module.exports = nextConfig;
