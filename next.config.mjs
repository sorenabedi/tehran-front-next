/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/panel",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
