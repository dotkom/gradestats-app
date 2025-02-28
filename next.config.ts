/*
  This file is not compiled, and NodeJS does not currently support import statements.
  Require statements are needed for imports to work for now.
*/

// const withSourceMaps = require('@zeit/next-source-maps');
import { NextConfig } from 'next';

export default {
  // webpack: (config, options) => {
  //   if (!options.isServer) {
  //     config.resolve.alias['@sentry/node'] = '@sentry/browser';
  //   }
  //   return config;
  // },
  images: {
    remotePatterns: ['avatars', 'avatars0', 'avatars1', 'avatars2', 'avatars3', 'avatars4'].map((host) => {
      return {
        protocol: 'https',
        hostname: `${host}.githubusercontent.com`,
      };
    }),
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
} satisfies NextConfig;
