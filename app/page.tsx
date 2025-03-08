import { FC } from 'react';

import { getCourseListApiUrl } from 'common/urls';
import { ListResponse } from 'common/requests';

import { FrontPageView } from 'views/FrontPageView';
import { Course } from 'models/Course';

const getProps = async () => {
  const limit = 21;
  const ordering = '-attendee_count';
  const response = await fetch(getCourseListApiUrl({ limit, ordering }), { next: { revalidate: 60 * 60 * 24 } });
  const data: ListResponse<Course> = await response.json();

  const courseCount = data.count;
  return {
    data,
    courseCount,
  };
};

const ABOUT_GRADES = (courseCount: number) => `
  Karakterstatisikk for ${courseCount} emner ved Norges teknisk-naturvitenskapelige universitet.
`;

const TAGS = ['NTNU', 'Karakterstatistikk', 'Norwegian University of Science and Technology', 'Emneinformasjon'];

const IndexPage: FC = async () => {
  const { data: courses, courseCount } = await getProps();

  return (
    <>
      <title>grades.no - karakterstatistikk</title>
      <meta property="og:title" content="grades.no - karakterstatistikk" />
      <meta name="description" content={ABOUT_GRADES(courseCount)} />
      <meta property="og:description" content={ABOUT_GRADES(courseCount)} />
      {TAGS.map((tag) => (
        <meta property="og:article:tag" content={tag} key={tag} />
      ))}
      <FrontPageView courses={courses} />
    </>
  );
};

export default IndexPage;
