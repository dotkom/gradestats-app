import { getReportListApiUrl } from '../urls';
import { requests } from 'common/requests';

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
  const response = await requests.post(getReportListApiUrl(), data);
  return response;
};
