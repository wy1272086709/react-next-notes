const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin('./i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        _next_intl_trailing_slash: 'false', // or 'true' based on your needs
    },
    swcMinify: true,
    compiler: {
      swc: {
        jsc: {
          target: 'es2022',
        },
      },
    },
    transpilePackages: ['undici'], // 添加这一行
}
module.exports = withNextIntl(nextConfig)
