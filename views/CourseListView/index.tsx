import { useIntersection } from 'common/hooks/useIntersection';
import { SearchInput } from 'components/forms/SearchInput';
import { AnimatedGraphIcon } from 'components/Graphics/AnimatedGraphIcon';
import { Text } from 'components/Typography/Text';
import { Course } from 'models/Course';
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
    <section className={styles.container}>
      <SearchInput
        className={styles.searchBar}
        ref={searchBarRef}
        placeholder="Søk..."
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
  );
};