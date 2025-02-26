import { average } from './math';
import { Grade } from 'models/Grade';

export const isKont = (grade: Grade): boolean =>
  grade.semester_code.startsWith('S') || grade.semester_code.startsWith('K');
export const isNotKont = (grade: Grade): boolean => !isKont(grade);
export const isGraded = (grade: Grade): boolean => grade.average_grade !== 0;

export const calculateFailureRate = (grade: Grade): number => {
  const total = grade.passed + grade.a + grade.b + grade.c + grade.d + grade.e + grade.f;

  const failureRate = (grade.f / total) * 100;
  return failureRate;
};

export const calculateAverageFailureRate = (grades: Grade[]): number => {
  return average(grades.map(calculateFailureRate));
};

export const calculatePassRate = (grades: Grade[]): number => {
  let total = 0;
  let totalF = 0;
  for (const grade of grades) {
    total += grade.a + grade.b + grade.c + grade.d + grade.e + grade.f + grade.passed;
    totalF += grade.f;
  }

  if (total == 0) {
    return 0.0;
  } else {
    return ((total - totalF) * 100) / total;
  }
};

export const calculateAverageGrade = (grades: Grade[]): number => {
  let average = 0;
  let attendees = 0;
  const gradedGrades = grades.filter((grade) => isGraded(grade));
  for (const grade of gradedGrades) {
    attendees += grade.attendee_count;
    average += grade.average_grade * grade.attendee_count;
  }
  if (attendees === 0) {
    return 0;
  } else {
    return average / attendees;
  }
};

export const findRelativeRollingGrades = (rollingCount: number, currentYear: number, grades: Grade[]) => {
  const earliestYear = Math.max(currentYear - rollingCount, Math.min(...grades.map((grade) => grade.year)));
  const latestYear = earliestYear + rollingCount;
  const gradesInYears = grades.filter((grade) => grade.year >= earliestYear && grade.year <= latestYear);
  return gradesInYears;
};

export const calculateRollingAverageGrade = (rollingCount: number, currentYear: number, grades: Grade[]) => {
  const gradesInYears = findRelativeRollingGrades(rollingCount, currentYear, grades);
  return calculateAverageGrade(gradesInYears);
};

export const mapGradeAverageToLetter = (gradeAverage: number): string => {
  const GRADE_MAPPING: Record<number, string> = {
    5: 'A',
    4: 'B',
    3: 'C',
    2: 'D',
    1: 'E',
    0: 'F',
  };
  const intGrade = Math.round(gradeAverage);
  const letter = GRADE_MAPPING[intGrade];
  return letter ?? '-';
};

export const GRADE_COLORS: Record<string, string> = {
  A: 'var(--grade-a)',
  B: 'var(--grade-b)',
  C: 'var(--grade-c)',
  D: 'var(--grade-d)',
  E: 'var(--grade-e)',
  F: 'var(--grade-f)',
  PASSED: 'var(--grade-passed)',
  NOT_PASSED: 'var(--grade-not-passed)',
};

export const getColorForGradeLetter = (gradeLetter: string) => {
  return GRADE_COLORS[gradeLetter];
};

export type SemesterFilter = 'regular' | 'kont' | 'all';

export const filterGradesBySemesters = (grades: Grade[], semesterFilter: SemesterFilter) => {
  if (semesterFilter === 'all') {
    return grades;
  } else if (semesterFilter == 'regular') {
    return grades.filter(isNotKont);
  } else {
    return grades.filter(isKont);
  }
};
