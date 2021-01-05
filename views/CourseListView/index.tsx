import { useIntersection } from 'common/hooks/useIntersection';
import { SearchInput } from 'components/forms/SearchInput';
import { AnimatedGraphIcon } from 'components/Graphics/AnimatedGraphIcon';
import { Text } from 'components/Typography/Text';
import { Course } from 'models/Course';
import Head from 'next/head';
import React, { ChangeEvent, FC, MutableRefObject } from 'react';

import styles from './course-list-view.module.scss';
import { CourseItem } from './CourseItem';

interface Props {
  searchBarRef: MutableRefObject<HTMLInputElement | null>;
  onSearchChange: (query: string) => void;
  query: string;
  courses: Course[];
  isLoading: boolean;
  nextPage: () => void;
  resetPages: () => void;
}

export const CourseListView: FC<Props> = ({
  searchBarRef,
  onSearchChange,
  query,
  courses,
  isLoading,
  nextPage,
  resetPages,
}) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    resetPages();
    onSearchChange(event.target.value);
  };
  const ref = useIntersection(nextPage);

  return (
    <>
      <Head>
        <title>grades.no - søk</title> 
        <meta property="og:title" content="grades.no - søk" />
        <meta name="description" content="Søk i emner ved NTNU" />
        <meta property="og:description" content="Søk i emner ved NTNU" />
      </Head>
      <section className={styles.container}>
        <label className={styles.searchLabel} htmlFor="search">
          Søk i emner
        </label>
        <SearchInput
          id="search"
          className={styles.searchBar}
          ref={searchBarRef}
          placeholder="Søk i emner..."
          aria-label="Søk i emner"
          onChange={handleSearchChange}
          value={query}
        />
        {!isLoading && !courses.length && <Text>Ingen resultater</Text>}
        {courses.length ? (
          <table className={styles.courseList}>
            <tbody>
              <tr className={styles.listItem}>
                <th>Fagkode</th>
                <th>Navn</th>
                <th>Snitt</th>
              </tr>
              {courses.map((course) => (
                <CourseItem key={course.code} course={course} />
              ))}
            </tbody>
          </table>
        ) : null}
        {isLoading && (
          <div className={styles.loadingContainer}>
            <AnimatedGraphIcon className={styles.loadingIcon} />
            <Text>Laster...</Text>
          </div>
        )}
        <span ref={ref} />
      </section>
    </>
  );
};
