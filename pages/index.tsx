import { FC } from 'react';

import { getCourseGradeListApiUrl, getCourseListApiUrl } from 'common/urls';
import { requests, ListResponse } from 'common/requests';

import { FrontPageView } from 'views/FrontPageView';
import { GetStaticProps } from 'next';
import { Course, CourseWithGrades } from 'models/Course';
import { Grade } from 'models/Grade';

interface StaticProps {
  courses: CourseWithGrades[];
  courseCount: number;
}

const IndexPage: FC<StaticProps> = ({ courses, courseCount }) => {
  return <FrontPageView courses={courses} totalCourseCount={courseCount} />;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const limit = 21;
  const ordering = '-attendee_count';
  const response = await requests.get<ListResponse<Course>>(getCourseListApiUrl({ limit, ordering }));
  const courses = await Promise.all(
    response.results.map(async (course) => {
      const courseGradeUrl = getCourseGradeListApiUrl(course.code, { limit: 10, offset: 0 });
      const { results: grades } = await requests.get<ListResponse<Grade>>(courseGradeUrl);
      return {
        ...course,
        grades,
      };
    })
  );
  const courseCount = response.count;
  return {
    revalidate: 60 * 60 * 24, // Revalidate once every day.
    props: {
      courses,
      courseCount,
    },
  };
};

export default IndexPage;
