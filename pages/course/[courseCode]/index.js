import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

// import { BUILD_TIME_COURSE_LIMIT } from '../../../common/constants';
import {
  // getCourseListApiUrl,
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

/*
export const getStaticPaths = async () => {
  const limit = BUILD_TIME_COURSE_LIMIT;
  const response = await fetcher(getCourseListApiUrl({ limit }));
  const courseCodes = response.results.map((course) => course.code);
  const paths = courseCodes.map((courseCode) => ({ params: { courseCode } }));
  return {
    paths,
    fallback: true,
  };
};
*/

export const getServerSideProps = async ({ params }) => {
  const { courseCode } = params;
  const [initialCourse, initalGrades, initalTags] = await Promise.all([
    fetcher(getCourseDetailApiUrl(courseCode)),
    fetcher(getCourseGradeListApiUrl(courseCode)),
    fetcher(getCourseTagListApiUrl(courseCode)),
  ]);
  return {
    props: {
      initialCourse,
      initalGrades,
      initalTags,
    },
  };
};

const CourseDetailPage = ({ initialCourse, initalGrades, initalTags }) => {
  const router = useRouter();
  const { courseCode } = router.query;
  const { data: course } = useSWR(getCourseDetailApiUrl(courseCode), fetcher, {
    initialData: initialCourse,
  });
  const { data: gradesResponse } = useSWR(getCourseGradeListApiUrl(courseCode), fetcher, {
    initialData: initalGrades,
  });
  const { data: tagsResponse } = useSWR(getCourseTagListApiUrl(courseCode), fetcher, {
    initialData: initalTags,
  });
  const grades = gradesResponse.results.sort(sortSemesters);
  const tags = tagsResponse.results;

  return (
    <>
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
