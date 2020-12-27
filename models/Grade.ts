export interface Grade {
  id: number;
  course: number;
  semester_display: string;
  year: number;
  semester_code: string;
  average_grade: number;
  digital_exam: true;
  passed: number;
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  attendee_count: number;
}
