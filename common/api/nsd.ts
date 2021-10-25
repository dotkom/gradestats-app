import { getNSDScrapeGradeReportUrl } from './../urls';
import { requests } from 'common/requests';

interface Data {
  courseCode: string;
  year: number;
  semester: string;
}

export const requestNSDScrapeGradeReport = async ({ courseCode, year, semester }: Data) => {
  const data = {
    course: courseCode,
    year,
    semester,
  };
  const response = await requests.post(getNSDScrapeGradeReportUrl(), data);
  return response;
};
