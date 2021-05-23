import { GRADES_API_URL } from './constants';

interface ListParams {
  limit?: number;
  offset?: number;
}

interface CourseListParams extends ListParams {
  query?: string;
  ordering?: string;
  facultyId?: number;
  departmentId?: number;
}

export const getCourseListApiUrl = ({
  limit,
  offset = 0,
  query = '',
  ordering = '-watson_rank',
  departmentId,
  facultyId,
}: CourseListParams) => {
  return `${GRADES_API_URL}/api/v2/courses/?limit=${limit}&offset=${offset}&query=${query}&ordering=${ordering}${
    departmentId ? `&department=${departmentId}` : ''
  }${facultyId ? `&faculty_code=${facultyId}` : ''}`;
};
export const getCourseDetailApiUrl = (courseCode: string) => {
  return `${GRADES_API_URL}/api/v2/courses/${courseCode}/`;
};

interface CourseGradeListParams extends ListParams {
  ordering?: string;
}

export const getCourseGradeListApiUrl = (
  courseCode: string,
  { limit = 300, offset = 0, ordering = '-year' }: CourseGradeListParams = {}
) => {
  return `${GRADES_API_URL}/api/v2/courses/${courseCode}/grades/?limit=${limit}&offset=${offset}&ordering=${ordering}`;
};
export const getCourseGradeDetailApiUrl = (courseCode: string, semesterCode: string) => {
  return `${GRADES_API_URL}/api/v2/courses/${courseCode}/grades/${semesterCode}/`;
};
export const getCourseTagListApiUrl = (courseCode: string, { limit = 50, offset = 0 }: ListParams = {}) => {
  return `${GRADES_API_URL}/api/v2/courses/${courseCode}/tags/?limit=${limit}&offset=${offset}`;
};
export const getCourseTagDetailApiUrl = (courseCode: string, tagName: string) => {
  return `${GRADES_API_URL}/api/v2/courses/${courseCode}/tags/${tagName}/`;
};
export const getUserListApiUrl = ({ limit = 50, offset = 0 }: ListParams = {}) => {
  return `${GRADES_API_URL}/api/v2/users/?limit=${limit}&offset=${offset}`;
};
export const getUserDetailApiUrl = (username: string) => {
  return `${GRADES_API_URL}/api/v2/users/${username}/`;
};
export const getReportListApiUrl = ({ limit = 50, offset = 0 }: ListParams = {}) => {
  return `${GRADES_API_URL}/api/v2/reports/?limit=${limit}&offset=${offset}`;
};
export const getReportDetailApiUrl = (reportId: number) => {
  return `${GRADES_API_URL}/api/v2/reports/${reportId}/`;
};
export const getTagListApiUrl = ({ limit = 50, offset = 0 } = {}) => {
  return `${GRADES_API_URL}/api/v2/tags/?limit=${limit}&offset=${offset}`;
};
export const getTagDetailApiUrl = (tagName: string) => {
  return `${GRADES_API_URL}/api/v2/tags/${tagName}/`;
};
export const getUserTagListApiUrl = (userId: number, { limit = 50, offset = 0 } = {}) => {
  return `${GRADES_API_URL}/api/v2/users/${userId}/tags/?limit=${limit}&offset=${offset}`;
};
export const getUserTagDetailApiUrl = (userId: number, tagName: string) => {
  return `${GRADES_API_URL}/api/v2/users/${userId}/tags/${tagName}/`;
};
export const getFacultyListApiUrl = ({ limit = 200, offset = 0 }: ListParams = {}) => {
  return `${GRADES_API_URL}/api/v2/faculties/?limit=${limit}&offset=${offset}`;
};
export const getFacultyDetailApiUrl = (facultyId: number) => {
  return `${GRADES_API_URL}/api/v2/faculties/${facultyId}/`;
};
export const getDepartmentListApiUrl = ({ limit = 200, offset = 0 }: ListParams = {}) => {
  return `${GRADES_API_URL}/api/v2/departments/?limit=${limit}&offset=${offset}`;
};
export const getDepartmentDetailApiUrl = (departmentId: number) => {
  return `${GRADES_API_URL}/api/v2/departments/${departmentId}/`;
};
export const getKarstatScrapeGradeReportUrl = () => {
  return `${GRADES_API_URL}/api/v2/scrapers/karstat/grade-report/`;
};
export const getNSDScrapeGradeReportUrl = () => {
  return `${GRADES_API_URL}/api/v2/scrapers/nsd/grade-report/`;
};
export const getTIAScrapeCoursesUrl = () => {
  return `${GRADES_API_URL}/api/v2/scrapers/tia/refresh-courses/`;
};
