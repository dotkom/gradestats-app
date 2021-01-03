import React, { FC } from 'react';

import { getCourseListApiUrl } from 'common/urls';
import { fetcher, ListResponse } from 'common/fetcher';

import { FrontPageView } from 'views/FrontPageView';
import { GetStaticProps } from 'next';
import { Course } from 'models/Course';

interface StaticProps {
  courses: Course[];
  courseCount: number;
}

const IndexPage: FC<StaticProps> = ({ courses, courseCount }) => {
  return <FrontPageView courses={courses} totalCourseCount={courseCount} />;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const limit = 21;
  const ordering = '-attendee_count';
  const response = await fetcher<ListResponse<Course>>(getCourseListApiUrl({ limit, ordering }));
  const courses = response.results;
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
