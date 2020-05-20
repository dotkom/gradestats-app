import { getKarstatScrapeGradeReportUrl } from '../urls';
import { poster } from 'common/fetcher';

export const requestKarstatScrapeGradeReport = async (
  { username, password, departmentId, year, semester },
  accessToken
) => {
  const data = {
    username,
    password,
    department: departmentId,
    year,
    semester,
  };
  const response = await poster(getKarstatScrapeGradeReportUrl(), data, accessToken);
  return response;
};
