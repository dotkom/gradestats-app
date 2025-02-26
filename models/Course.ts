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
  pass_rate: number;
}

export interface CourseWithGrades extends Course {
  grades: Grade[];
}

export type CourseSort =
  | 'ranking'
  | 'nameDesc'
  | 'nameAsc'
  | 'courseCodeDesc'
  | 'courseCodeAsc'
  | 'averageDesc'
  | 'averageAsc'
  | 'passRateDesc'
  | 'passRateAsc'
  | 'attendeeCountDesc'
  | 'attendeeCountAsc';

export const COURSE_SORT_VALUES: CourseSort[] = [
  'ranking',
  'nameDesc',
  'nameAsc',
  'courseCodeDesc',
  'courseCodeAsc',
  'averageDesc',
  'averageAsc',
  'passRateDesc',
  'passRateAsc',
  'attendeeCountDesc',
  'attendeeCountAsc',
];

export const COURSE_ORDERING: { [Order in CourseSort]: string } = {
  ranking: '-watson_rank,-attendee_count',
  nameDesc: '-norwegian_name,-watson_rank,-attendee_count',
  nameAsc: 'norwegian_name,-watson_rank,-attendee_count',
  courseCodeDesc: '-code,-watson_rank,-attendee_count',
  courseCodeAsc: 'code,-watson_rank,-attendee_count',
  averageDesc: '-average,-watson_rank,-attendee_count',
  averageAsc: 'average,-watson_rank,-attendee_count',
  passRateDesc: '-pass_rate,-watson_rank,-attendee_count',
  passRateAsc: 'pass_rate,-watson_rank,-attendee_count',
  attendeeCountDesc: '-attendee_count,-watson_rank,-attendee_count',
  attendeeCountAsc: 'attendee_count,-watson_rank,-attendee_count',
};

export const COURSE_SORT_NAMES: { [Order in CourseSort]: string } = {
  ranking: 'Relevans',
  nameDesc: 'Emnenavn (synkende)',
  nameAsc: 'Emnenavn (stigende)',
  courseCodeDesc: 'Emnekode (synkende)',
  courseCodeAsc: 'Emnekode (stigende)',
  averageDesc: 'Snitt (synkende)',
  averageAsc: 'Snitt (stigende)',
  passRateDesc: 'Ståprosent (synkende)',
  passRateAsc: 'Ståprosent (stigende)',
  attendeeCountDesc: 'Antall studenter (synkende)',
  attendeeCountAsc: 'Antall studenter (stigende)',
};
