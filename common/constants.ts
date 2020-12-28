export const BUILD_TIME_COURSE_LIMIT = Number(process.env.NEXT_PUBLIC_BUILD_TIME_COURSE_LIMIT || 100);
export const GRADES_API_URL = process.env.NEXT_PUBLIC_GRADES_API_URL || 'https://grades.no';
export const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || null;
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '__REPLACE_ME__';
export const CANONICAL_URL = process.env.NEXT_PRIVATE_CANONICAL_URL || 'http://localhost:3000';
export const FEIDE_CLIENT_ID = process.env.NEXT_PUBLIC_FEIDE_CLIENT_ID;
export const FEIDE_CLIENT_SECRET = process.env.NEXT_PRIVATE_FEIDE_CLIENT_SECRET;
export const FEIDE_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_FEIDE_AUTH_ENDPOINT || 'https://auth.dataporten.no';
export const SESSION_SECRET =
  process.env.NEXT_PRIVATE_SESSION_SECRET || 'some_not_random_password_that_is_at_least_32_characters';
