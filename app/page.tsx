import { FC } from 'react';

import { getCourseGradeListApiUrl, getCourseListApiUrl } from 'common/urls';
import { requests, ListResponse } from 'common/requests';

import { FrontPageView } from 'views/FrontPageView';
import { Course, CourseWithGrades } from 'models/Course';
import { Grade } from 'models/Grade';
import { Metadata } from 'next';

interface StaticProps {
  courses: CourseWithGrades[];
  courseCount: number;
}

const getProps = async () => {
  const limit = 21;
  const ordering = '-attendee_count';
  const response = await fetch(getCourseListApiUrl({ limit, ordering }), { next: { revalidate: 60 * 60 * 24 } });
  const data: ListResponse<Course> = await response.json();
  const courses = await Promise.all(
    data.results.map(async (course) => {
      const courseGradeUrl = getCourseGradeListApiUrl(course.code, { limit: 10, offset: 0 });
      const { results: grades } = await requests.get<ListResponse<Grade>>(courseGradeUrl);
      return {
        ...course,
        grades,
      };
    })
  );
  const courseCount = data.count;
  return {
    courses,
    courseCount,
  };
};

const ABOUT_GRADES = (courseCount: number) => `
  Karakterstatisikk for ${courseCount} emner ved Norges teknisk-naturvitenskapelige universitet.
`;

const TAGS = ['NTNU', 'Karakterstatistikk', 'Norwegian University of Science and Technology', 'Emneinformasjon'];

export const generateMetadata = async (): Promise<Metadata> => {
  const { courseCount } = await getProps();

  return {
    title: 'grades.no - karakterstatistikk',
    description: ABOUT_GRADES(courseCount),
    openGraph: {
      title: 'grades.no - karakterstatistikk',
      description: ABOUT_GRADES(courseCount),
      type: 'article',
      tags: TAGS,
    },
  };
};

const IndexPage: FC<StaticProps> = async () => {
  const { courses, courseCount } = await getProps();

  return <FrontPageView courses={courses} totalCourseCount={courseCount} />;
};

export default IndexPage;
