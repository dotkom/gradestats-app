import { mapGradeAverageToLetter } from 'common/utils/grades';
import { Button } from 'components/common/Button';
import { SearchInput } from 'components/forms/SearchInput';
import { StatValue } from 'components/Stat/Stat';
import { Text } from 'components/Typography/Text';
import { Course } from 'models/Course';
import Link from 'next/link';
import React, { ChangeEvent, FC, MutableRefObject } from 'react';

import styles from './course-list-view.module.scss';

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

  return (
    <section className={styles.container}>
      <SearchInput
        className={styles.searchBar}
        ref={searchBarRef}
        placeholder="Søk..."
        onChange={handleSearchChange}
        value={query}
      />
      {isLoading && !courses.length && <Text>Laster...</Text>}
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
              <Link key={course.code} href="/course/[courseCode]" as={`/course/${course.code}`}>
                <a className={styles.listItem}>
                  <td>{course.code}</td>
                  <td>{course.norwegian_name}</td>
                  <td>
                    <StatValue
                      value={mapGradeAverageToLetter(course.average)}
                      extra={course.average > 0 ? course.average.toFixed(2) : '-'}
                    />
                  </td>
                </a>
              </Link>
            ))}
          </tbody>
        </table>
      ) : null}
      <Button onClick={nextPage}>Last flere resultater</Button>
    </section>
  );
};
