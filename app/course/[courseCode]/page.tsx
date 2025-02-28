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
import { Metadata } from 'next';

export const dynamicParams = true;

interface Params {
  courseCode: string;
}

export const generateMetadata = async ({ params }: { params: Promise<Params> }): Promise<Metadata> => {
  const { courseCode } = await params;
  const { courseResponse: course } = await getProps({ courseCode });
  return {
    title: `${course.code} - ${course.norwegian_name}`,
    description: course.content,
    openGraph: {
      type: 'article',
      tags: [
        course.code,
        course.short_name,
        course.norwegian_name,
        course.english_name,
        course.course_level,
        course.place,
      ],
    },
  };
};

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

  return <CourseDetailView course={course} grades={grades} tags={tags} />;
}

const getProps = async ({ courseCode }: Params) => {
  const [courseResponse, gradesResponse, tagsResponse] = await Promise.all([
    requests.get<Course>(getCourseDetailApiUrl(courseCode)),
    requests.get<ListResponse<Grade>>(getCourseGradeListApiUrl(courseCode)),
    requests.get<ListResponse<Tag>>(getCourseTagListApiUrl(courseCode)),
  ]);
  return {
    //   revalidate: 60 * 60, // Revalidate once each hour.
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
