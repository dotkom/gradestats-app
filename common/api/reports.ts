import { getReportListApiUrl } from '../urls';
import { poster } from 'common/fetcher';

interface Data {
  description: string;
  course?: string;
  contactEmail?: string;
}

export const requestCreateReport = async ({ description, course, contactEmail }: Data) => {
  const data = {
    description,
    course,
    contact_email: contactEmail,
  };
  const response = await poster(getReportListApiUrl(), data);
  return response;
};
