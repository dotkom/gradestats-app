import { getReportListApiUrl } from '../urls';
import { requestsWithAuth } from 'common/requests';

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
  const response = await requestsWithAuth.post(getReportListApiUrl(), data);
  return response;
};
