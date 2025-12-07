/** @type {import('next').NextConfig} */
import path from 'path';
console.log('process.cwd()', process.cwd())
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@app': path.join(process.cwd(), 'src/app'),
      'auth': path.join(process.cwd(), 'auth'),
      '@lib': path.join(process.cwd(), 'lib'),
      '@components': path.join(process.cwd(), 'components'),
      '@': path.join(process.cwd()), // 请根据你的项目结构调整路径
    };
    return config;
  },
};

export default nextConfig;
