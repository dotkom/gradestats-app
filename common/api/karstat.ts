import { getKarstatScrapeGradeReportUrl } from '../urls';
import { poster } from 'common/fetcher';

interface Data {
  username: string;
  password: string;
  departmentId: number;
  year: number;
  semester: string;
}

export const requestKarstatScrapeGradeReport = async (
  { username, password, departmentId, year, semester }: Data,
  accessToken: string
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
