import { useRouter } from 'next/router';
import React from 'react';

import { BUILD_TIME_COURSE_LIMIT } from 'common/constants';
import {
  getCourseListApiUrl,
  getCourseDetailApiUrl,
  getCourseTagListApiUrl,
  getCourseGradeListApiUrl,
} from 'common/urls';
import { fetcher } from 'common/fetcher';
import { sortSemesters } from 'common/utils/semester';

import { CourseDetailView } from 'views/CourseDetailView';
import { FallbackView } from 'views/FallbackView';

export const getStaticPaths = async () => {
  const limit = BUILD_TIME_COURSE_LIMIT;
  const ordering = '-attendee_count';
  const response = await fetcher(getCourseListApiUrl({ limit, ordering }));
  const courseCodes = response.results.map((course) => course.code);
  const paths = courseCodes.map((courseCode) => ({ params: { courseCode } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { courseCode } = params;
  const [initialCourse, initalGrades, initalTags] = await Promise.all([
    fetcher(getCourseDetailApiUrl(courseCode)),
    fetcher(getCourseGradeListApiUrl(courseCode)),
    fetcher(getCourseTagListApiUrl(courseCode)),
  ]);
  return {
    revalidate: 60 * 60, // Revalidate once each hour.
    props: {
      initialCourse,
      initalGrades,
      initalTags,
    },
  };
};

const CourseDetailPage = ({ initialCourse, initalGrades, initalTags }) => {
  const { isFallback, query } = useRouter();
  const { courseCode } = query;

  if (isFallback) {
    return <FallbackView />;
  }

  if (!courseCode) {
    return 'Ikke funnet';
  }

  const course = initialCourse;
  const grades = initalGrades.results.sort(sortSemesters);
  const tags = initalTags.results;

  return <CourseDetailView course={course} grades={grades} tags={tags} />;
};

export default CourseDetailPage;
