/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@vision/ui', '@vision/design-tokens', '@vision/icons', '@vision/auth', '@vision/database', '@vision/types', '@vision/sdk'],
};

export default nextConfig;
