import { getTIAScrapeCoursesUrl } from '../urls';
import { poster } from 'common/fetcher';

interface Data {
  username: string;
  password: string;
  limit: number;
  skip: number;
}

export const requestTIAScrapeCourses = async ({ username, password, limit, skip }: Data) => {
  const data = {
    username,
    password,
    limit,
    skip,
  };
  const response = await poster(getTIAScrapeCoursesUrl(), data);
  return response;
};
