import { useRouter } from 'next/router';
import { FC } from 'react';

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
import { FallbackView } from 'views/FallbackView';
import { Course } from 'models/Course';
import { Grade } from 'models/Grade';
import { Tag } from 'models/Tag';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NotFoundView } from 'views/NotFoundView';

type QueryParams = {
  courseCode: string;
};

interface StaticProps {
  courseResponse: Course;
  gradesResponse: ListResponse<Grade>;
  tagsResponse: ListResponse<Tag>;
}

const CourseDetailPage: FC<StaticProps> = ({ courseResponse, gradesResponse, tagsResponse }) => {
  const { isFallback, query } = useRouter();
  const { courseCode } = query;

  if (isFallback) {
    return <FallbackView />;
  }

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
};

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const limit = BUILD_TIME_COURSE_LIMIT;
  const ordering = '-attendee_count';
  const response = await requests.get<ListResponse<Course>>(getCourseListApiUrl({ limit, ordering }));
  const courseCodes = response.results.map((course) => course.code);
  const paths = courseCodes.map((courseCode) => ({ params: { courseCode } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<StaticProps, QueryParams> = async ({ params }) => {
  const { courseCode } = params as QueryParams;
  const [courseResponse, gradesResponse, tagsResponse] = await Promise.all([
    requests.get<Course>(getCourseDetailApiUrl(courseCode)),
    requests.get<ListResponse<Grade>>(getCourseGradeListApiUrl(courseCode)),
    requests.get<ListResponse<Tag>>(getCourseTagListApiUrl(courseCode)),
  ]);
  return {
    revalidate: 60 * 60, // Revalidate once each hour.
    props: {
      courseResponse,
      gradesResponse,
      tagsResponse,
    },
  };
};

export default CourseDetailPage;
