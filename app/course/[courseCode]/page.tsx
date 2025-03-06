import { BUILD_TIME_COURSE_LIMIT } from 'common/constants';
import {
  getCourseListApiUrl,
  getCourseDetailApiUrl,
  getCourseTagListApiUrl,
  getCourseGradeListApiUrl,
} from 'common/urls';
import { ListResponse, requests } from 'common/requests';
import { sortSemesters } from 'common/utils/semester';

import { CourseDetailView } from 'views/CourseDetailView';
import { Course } from 'models/Course';
import { Grade } from 'models/Grade';
import { Tag } from 'models/Tag';
import { NotFoundView } from 'views/NotFoundView';

export const dynamicParams = true;

interface Params {
  courseCode: string;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { courseCode } = await params;
  const { courseResponse, gradesResponse, tagsResponse } = await getProps({ courseCode });

  if (!courseResponse?.code) {
    return (
      <NotFoundView
        message={`Finner ikke emne for emnekode: ${courseCode}. Emnet kan være utgått, eller for nytt for karakterdatabasen.`}
      />
    );
  }

  const course = courseResponse;
  const grades = gradesResponse.results.sort(sortSemesters);
  const tags = tagsResponse.results;

  return (
    <>
      <title>{`${course.code} - ${course.norwegian_name}`}</title>
      <meta property="og:title" content={`${course.code} - ${course.norwegian_name}`} />
      <meta name="description" content={course.content} />
      <meta property="og:description" content={course.content} />
      <meta property="og:article:tag" content={course.code} />
      <meta property="og:article:tag" content={course.short_name} />
      <meta property="og:article:tag" content={course.norwegian_name} />
      <meta property="og:article:tag" content={course.english_name} />
      <meta property="og:article:tag" content={course.course_level} />
      <meta property="og:article:tag" content={course.place} />
      <CourseDetailView course={course} grades={grades} tags={tags} />
    </>
  );
}

const getProps = async ({ courseCode }: Params) => {
  const [courseResponse, gradesResponse, tagsResponse]: [Course, ListResponse<Grade>, ListResponse<Tag>] =
    await Promise.all([
      fetch(getCourseDetailApiUrl(courseCode), { next: { revalidate: 60 * 60 } }).then((response) => response.json()),
      fetch(getCourseGradeListApiUrl(courseCode), { next: { revalidate: 60 * 60 } }).then((response) =>
        response.json()
      ),
      fetch(getCourseTagListApiUrl(courseCode), { next: { revalidate: 60 * 60 } }).then((response) => response.json()),
    ]);
  return {
    courseResponse,
    gradesResponse,
    tagsResponse,
  };
};

export async function generateStaticParams(): Promise<{ params: { courseCode: string } }[]> {
  const limit = BUILD_TIME_COURSE_LIMIT;
  const ordering = '-attendee_count';
  const response = await requests.get<ListResponse<Course>>(getCourseListApiUrl({ limit, ordering }));
  const courseCodes = response.results.map((course) => course.code);
  const paths = courseCodes.map((courseCode) => ({ params: { courseCode } }));
  return paths;
}
