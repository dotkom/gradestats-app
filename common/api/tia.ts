import { getTIAScrapeCoursesUrl } from '../urls';
import { requestsWithAuth } from 'common/requests';

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
  const response = await requestsWithAuth.post(getTIAScrapeCoursesUrl(), data);
  return response;
};
