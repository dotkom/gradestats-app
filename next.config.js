/*
  This file is not compiled, and NodeJS does not currently support import statements.
  Require statements are needed for imports to work for now.
*/
/* eslint-disable @typescript-eslint/no-var-requires */
const withSourceMaps = require('@zeit/next-source-maps');

const {
  GRADES_API_URL,
  BUILD_TIME_COURSE_LIMIT,
  SENTRY_DSN,
  GA_TRACKING_ID,
  CANONICAL_URL,
  FEIDE_CLIENT_ID,
  FEIDE_CLIENT_SECRET,
} = process.env;

nextConfig = {
  env: {
    GRADES_API_URL,
    BUILD_TIME_COURSE_LIMIT,
    SENTRY_DSN,
    GA_TRACKING_ID,
    CANONICAL_URL,
    FEIDE_CLIENT_ID,
    FEIDE_CLIENT_SECRET,
  },
  experimental: {
    reactMode: 'concurrent',
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }
    return config;
  },
};

module.exports = withSourceMaps(nextConfig);
