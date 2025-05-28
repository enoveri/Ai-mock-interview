/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize image loading
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },

  // Webpack configuration for non-Turbopack builds
  webpack: (config) => {
    // Add fallbacks for Node.js core modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      dns: false,
      child_process: false,
      http2: false,
      process: false,
    };

    // Handle node: protocol imports by replacing them with empty modules
    config.resolve.alias = {
      ...config.resolve.alias,
      "node:process": "process/browser",
      "node:fs": false,
      "node:path": false,
      "node:os": false,
      "node:crypto": false,
      "node:url": false,
      "node:http": false,
      "node:https": false,
      "node:stream": false,
      "node:buffer": false,
      "node:util": false,
      "node:zlib": false,
      "node:querystring": false,
      "node:events": false,
    };

    return config;
  },

  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      allowedOrigins: ["localhost:3000", "*.vercel.app"],
    },
  },
};

module.exports = nextConfig;
