import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { BUILD_TIME_COURSE_LIMIT } from '../../../common/constants';
import {
  getCourseListApiUrl,
  getCourseDetailApiUrl,
  getCourseTagListApiUrl,
  getCourseGradeListApiUrl,
} from '../../../common/urls';
import { fetcher } from '../../../common/fetcher';
import { sortSemesters } from '../../../common/sortSemesters';
import { Tags } from '../../../components/Tags';
import { Facts } from '../../../components/Facts';
import { CourseContent } from '../../../components/CourseContent';
import { CourseCharts } from '../../../components/CourseCharts';

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
    unstable_revalidate: 60 * 60, // Revalidate once each hour.
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

  if (isFallback || !courseCode) {
    return 'Loading...';
  }

  const course = initialCourse;
  const grades = initalGrades.results.sort(sortSemesters);
  const tags = initalTags.results;

  return (
    <>
      <Head>
        <title>{`${course.code} - ${course.norwegian_name}`}</title>
        <meta property="og:title" content={`${course.code} - ${course.norwegian_name}`} />
        <meta property="og:description" content={course.content} />
        <meta property="og:article:tag" content={course.code} />
        <meta property="og:article:tag" content={course.short_name} />
        <meta property="og:article:tag" content={course.norwegian_name} />
        <meta property="og:article:tag" content={course.english_name} />
        <meta property="og:article:tag" content={course.course_level} />
        <meta property="og:article:tag" content={course.place} />
      </Head>
      <div className="row">
        <div className="col-md-8">
          <CourseContent course={course} />
        </div>
        <div className="col-md-4">
          <CourseCharts grades={grades} />
          <Facts course={course} />
          <Tags tags={tags} />
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;
