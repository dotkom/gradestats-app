export type Semester = 'SPRING' | 'SUMMER' | 'AUTUMN';

export interface Grade {
  id: number;
  course: number;
  semester: Semester;
  semester_display: string;
  year: number;
  semester_code: string;
  average_grade: number;
  digital_exam: boolean;
  passed: number;
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  attendee_count: number;
}
