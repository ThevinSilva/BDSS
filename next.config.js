/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", process.env.NEXT_PUBLIC_DB_DOMAIN],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
