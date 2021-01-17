import { getCourseTagListApiUrl } from '../urls';
import { requests } from 'common/requests';

interface Data {
  name: string;
  courseCode: string;
}

export const requestCreateCourseTag = async ({ name, courseCode }: Data) => {
  const data = {
    name,
    course: courseCode,
  };
  const response = await requests.post(getCourseTagListApiUrl(courseCode), data);
  return response;
};
