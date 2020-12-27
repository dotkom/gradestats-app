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
};

module.exports = withSourceMaps(nextConfig);
