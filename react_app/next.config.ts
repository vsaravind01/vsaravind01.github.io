/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['opengraph.githubassets.com'],
    unoptimized: true,
  },
  basePath: '',
  trailingSlash: true,
};

export default nextConfig;
