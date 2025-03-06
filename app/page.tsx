import { FC } from 'react';

import { getCourseGradeListApiUrl, getCourseListApiUrl } from 'common/urls';
import { requests, ListResponse } from 'common/requests';

import { FrontPageView } from 'views/FrontPageView';
import { Course } from 'models/Course';
import { Grade } from 'models/Grade';

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

const IndexPage: FC = async () => {
  const { courses, courseCount } = await getProps();

  return (
    <>
      <title>grades.no - karakterstatistikk</title>
      <meta property="og:title" content="grades.no - karakterstatistikk" />
      <meta name="description" content={ABOUT_GRADES(courseCount)} />
      <meta property="og:description" content={ABOUT_GRADES(courseCount)} />
      {TAGS.map((tag) => (
        <meta property="og:article:tag" content={tag} key={tag} />
      ))}
      <FrontPageView courses={courses} totalCourseCount={courseCount} />
    </>
  );
};

export default IndexPage;
