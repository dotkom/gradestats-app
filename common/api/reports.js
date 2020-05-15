import { getReportListApiUrl } from '../urls';
import { poster } from 'common/fetcher';

export const requestCreateReport = async ({ description, course, contactEmail }) => {
  const data = {
    description,
    course,
    contact_email: contactEmail,
  };
  const response = await poster(getReportListApiUrl(), data);
  return response;
};
