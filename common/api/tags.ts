import { getCourseTagListApiUrl } from '../urls';
import { poster } from 'common/fetcher';

interface Data {
  name: string;
  courseCode: string;
}

export const requestCreateCourseTag = async ({ name, courseCode }: Data, accessToken: string) => {
  const data = {
    name,
    course: courseCode,
  };
  const response = await poster(getCourseTagListApiUrl(courseCode), data, accessToken);
  return response;
};
