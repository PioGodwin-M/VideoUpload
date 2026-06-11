/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Your existing rule for the API
        destination: "http://localhost:5000/api/:path*",
      },
      // --- ADD THIS NEW RULE ---
      // This forwards requests for your finished videos
      // to the Python server's /static/processed folder
      {
        source: "/static/processed/:path*",
        destination: "http://localhost:5000/static/processed/:path*",
      },
      // --- END OF NEW RULE ---
    ];
  },
};

export default nextConfig;