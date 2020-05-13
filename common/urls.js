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
export const getCourseTagDetailApiUrl = (courseCode, tagId) => {
  return `${GRADES_API_URL}/api/v2/courses/${courseCode}/tags/${tagId}/`;
};
export const getReportListApiUrl = ({ limit = 50, offset = 0 } = {}) => {
  return `${GRADES_API_URL}/api/v2/reports/?limit=${limit}&offset=${offset}`;
};
export const getReportDetailApiUrl = (reportId) => {
  return `${GRADES_API_URL}/api/v2/reports/${reportId}/`;
};
