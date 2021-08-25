import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, FC } from 'react';

import { CourseWithGrades } from 'models/Course';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';

import styles from './front-page-view.module.scss';
import { CourseCard } from './CourseCard';
import { SearchInput } from 'components/forms/SearchInput';

const ABOUT_GRADES = (courseCount: number) => `
  Karakterstatisikk for ${courseCount} emner ved Norges teknisk-naturvitenskapelige universitet.
`;

const TAGS = ['NTNU', 'Karakterstatistikk', 'Norwegian University of Science and Technology', 'Emneinformasjon'];

interface Props {
  courses: CourseWithGrades[];
  totalCourseCount: number;
}

export const FrontPageView: FC<Props> = ({ courses, totalCourseCount }) => {
  const { push } = useRouter();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    push({ pathname: '/course', query: { query } });
  };

  return (
    <>
      <Head>
        <title>grades.no - karakterstatistikk</title> 
        <meta property="og:title" content="grades.no - karakterstatistikk" />
        <meta name="description" content={ABOUT_GRADES(totalCourseCount)} />
        <meta property="og:description" content={ABOUT_GRADES(totalCourseCount)} />
        {TAGS.map((tag) => (
          <meta property="og:article:tag" content={tag} key={tag} />
        ))}
      </Head>
      <section className={styles.container}>
        <div className={styles.headlineContainer}>
          <Heading as="h1">Grades.no</Heading>
          <Text className={styles.byline}>Karakterstatistikk for alle emner ved NTNU</Text>
        </div>
        <Text className={styles.infoText}>
          ⚠️ Grunnet at vår tidligere datakilde (NTNU Karstat) har blitt avviklet, så mangler vi en datakilde som
          oppdateres ofte. Vi er klare over at grades.no mangler data på noen fag etter 2020 og jobber med saken! Fag
          som har oppdatert statstikken sin etter 2020 kan også vise feil tall.
        </Text>
        <label className={styles.searchLabel} htmlFor="search">
          Søk i emner
        </label>
        <SearchInput
          id="search"
          placeholder="Søk i emner..."
          type="search"
          onChange={handleSearch}
          aria-label="Søk i emner"
        />
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
              grades={course.grades}
            />
          ))}
        </div>
      </section>
    </>
  );
};
