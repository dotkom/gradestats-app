import { getTIAScrapeCoursesUrl } from '../urls';
import { requests } from 'common/requests';

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
  const response = await requests.post(getTIAScrapeCoursesUrl(), data);
  return response;
};
