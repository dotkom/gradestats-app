/*
  This file is not compiled, and NodeJS does not currently support import statements.
  Require statements are needed for imports to work for now.
*/
/* eslint-disable @typescript-eslint/no-var-requires */
const withSourceMaps = require('@zeit/next-source-maps');

nextConfig = {
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }
    return config;
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatars0.githubusercontent.com',
      'avatars1.githubusercontent.com',
      'avatars2.githubusercontent.com',
      'avatars3.githubusercontent.com',
      'avatars4.githubusercontent.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/report',
        destination: '/',
        permanent: true,
      },
      {
        source: '/api-info',
        destination: '/about',
        permanent: true,
      },
    ];
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  }
};

module.exports = withSourceMaps(nextConfig);
