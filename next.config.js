nextConfig = {
  env: {
    GRADES_API_URL: process.env.GRADES_API_URL,
    BUILD_TIME_COURSE_LIMIT: process.env.BUILD_TIME_COURSE_LIMIT,
  },
  experimental: {
    reactMode: 'concurrent',
  },
};

module.exports = nextConfig;
