import { getTIAScrapeCoursesUrl } from '../urls';
import { poster } from 'common/fetcher';

export const requestTIAScrapeCourses = async ({ username, password, limit, skip }, accessToken) => {
  const data = {
    username,
    password,
    limit,
    skip,
  };
  const response = await poster(getTIAScrapeCoursesUrl(), data, accessToken);
  return response;
};
