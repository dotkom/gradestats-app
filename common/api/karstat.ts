import { getKarstatScrapeGradeReportUrl } from '../urls';
import { requests } from 'common/requests';

interface Data {
  username: string;
  password: string;
  departmentId: number;
  year: number;
  semester: string;
}

export const requestKarstatScrapeGradeReport = async ({ username, password, departmentId, year, semester }: Data) => {
  const data = {
    username,
    password,
    department: departmentId,
    year,
    semester,
  };
  const response = await requests.post(getKarstatScrapeGradeReportUrl(), data);
  return response;
};
