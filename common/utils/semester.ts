import type { Grade, Semester } from 'models/Grade';

const SEMESTERS: Semester[] = ['SPRING', 'SUMMER', 'AUTUMN'];

export const sortSemesters = (gradeA: Grade, gradeB: Grade) => {
  if (gradeA.year === gradeB.year) {
    return SEMESTERS.indexOf(gradeA.semester) - SEMESTERS.indexOf(gradeB.semester);
  } else {
    return gradeA.year - gradeB.year;
  }
};
