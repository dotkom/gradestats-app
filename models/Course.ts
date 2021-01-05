import { Grade } from 'models/Grade';
export interface Course {
  id: number;
  norwegian_name: string;
  short_name: string;
  code: string;
  faculty_code: number;
  exam_type: string;
  grade_type: string;
  place: string;
  has_had_digital_exam: true;
  english_name: string;
  credit: number;
  study_level: number;
  taught_in_spring: true;
  taught_in_autumn: true;
  taught_from: number;
  taught_in_english: true;
  last_year_taught: number;
  content: string;
  learning_form: string;
  learning_goal: string;
  course_level: string;
  average: number;
  watson_rank: string;
  attendee_count: number;
  department: number;
}

export interface CourseWithGrades extends Course {
  grades: Grade[];
}
