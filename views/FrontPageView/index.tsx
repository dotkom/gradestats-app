import { FC, Suspense } from 'react';

import { CourseWithGrades } from 'models/Course';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';

import styles from './front-page-view.module.scss';
import { CourseCard } from './CourseCard';
import FrontPageSearch from './FrontPageSearch';
import { SearchInput } from 'components/forms/SearchInput';

interface Props {
  courses: CourseWithGrades[];
  totalCourseCount: number;
}

export const FrontPageView: FC<Props> = ({ courses }) => {
  return (
    <section className={styles.container}>
      <div className={styles.headlineContainer}>
        <Heading as="h1">Grades.no</Heading>
        <Text className={styles.byline}>Karakterstatistikk for alle emner ved NTNU</Text>
      </div>
      <label className={styles.searchLabel} htmlFor="search">
        Søk i emner
      </label>
      <Suspense fallback={<SearchInput />}>
        <FrontPageSearch />
      </Suspense>
      <Heading className={styles.featuredHeadline} as="h2">
        Mest populære emner
      </Heading>
      <div className={styles.featuredCourses}>
        {courses.map((course) => (
          <CourseCard
            key={course.code}
            className={styles.courseCard}
            code={course.code}
            name={course.norwegian_name}
            course={course}
          />
        ))}
      </div>
    </section>
  );
};
