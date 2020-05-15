import { getCourseTagListApiUrl } from '../urls';
import { poster } from 'common/fetcher';

export const requestCreateCourseTag = async ({ name, courseCode }, accessToken) => {
  const data = {
    name,
    course: courseCode,
  };
  const response = await poster(getCourseTagListApiUrl({ courseCode }), data, accessToken);
  return response;
};
