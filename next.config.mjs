/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: {
    bodySizeLimit: '20mb', 
  },
  reactCompiler: true,
};

export default nextConfig;
