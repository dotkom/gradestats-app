import { GRADES_API_URL } from './constants';

export const getCourseListApiUrl = ({ limit, offset = 0, query = '', ordering = '-watson_rank' }) => {
  return `${GRADES_API_URL}/api/v2/courses/?limit=${limit}&offset=${offset}&query=${query}&ordering=${ordering}`;
};
export const getCourseDetailApiUrl = (courseCode) => {
  return `${GRADES_API_URL}/api/v2/courses/${courseCode}/`;
};
export const getCourseGradeListApiUrl = (courseCode, { limit = 300, offset = 0 } = {}) => {
  return `${GRADES_API_URL}/api/v2/courses/${courseCode}/grades/?limit=${limit}&offset=${offset}`;
};
export const getCourseGradeDetailApiUrl = (courseCode, semesterCode) => {
  return `${GRADES_API_URL}/api/v2/courses/${courseCode}/grades/${semesterCode}/`;
};
export const getCourseTagListApiUrl = (courseCode, { limit = 50, offset = 0 } = {}) => {
  return `${GRADES_API_URL}/api/v2/courses/${courseCode}/tags/?limit=${limit}&offset=${offset}`;
};
export const getCourseTagDetailApiUrl = (courseCode, tagName) => {
  return `${GRADES_API_URL}/api/v2/courses/${courseCode}/tags/${tagName}/`;
};
export const getReportListApiUrl = ({ limit = 50, offset = 0 } = {}) => {
  return `${GRADES_API_URL}/api/v2/reports/?limit=${limit}&offset=${offset}`;
};
export const getReportDetailApiUrl = (reportId) => {
  return `${GRADES_API_URL}/api/v2/reports/${reportId}/`;
};
export const getTagListApiUrl = ({ limit = 50, offset = 0 } = {}) => {
  return `${GRADES_API_URL}/api/v2/tags/?limit=${limit}&offset=${offset}`;
};
export const getTagDetailApiUrl = (tagName) => {
  return `${GRADES_API_URL}/api/v2/tags/${tagName}/`;
};
export const getFacultyListApiUrl = ({ limit = 200, offset = 0 } = {}) => {
  return `${GRADES_API_URL}/api/v2/faculties/?limit=${limit}&offset=${offset}`;
};
export const getFacultyDetailApiUrl = (facultyId) => {
  return `${GRADES_API_URL}/api/v2/faculties/${facultyId}/`;
};
export const getDepartmentListApiUrl = ({ limit = 200, offset = 0 } = {}) => {
  return `${GRADES_API_URL}/api/v2/departments/?limit=${limit}&offset=${offset}`;
};
export const getDepartmentDetailApiUrl = (departmentId) => {
  return `${GRADES_API_URL}/api/v2/departments/${departmentId}/`;
};
export const getKarstatScrapeGradeReportUrl = () => {
  return `${GRADES_API_URL}/api/v2/scrapers/karstat/grade-report/`;
};
export const getTIAScrapeCoursesUrl = () => {
  return `${GRADES_API_URL}/api/v2/scrapers/tia/refresh-courses/`;
};
