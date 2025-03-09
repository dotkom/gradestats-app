import { SearchInput } from 'components/forms/SearchInput';
import { InifiniteLoading } from 'components/Loading/InfiniteLoading';
import { Text } from 'components/Typography/Text';
import type { Course, CourseSort } from 'models/Course';
import type { Department } from 'models/Department';
import type { Faculty } from 'models/Faculty';
import type { ChangeEvent, FC, RefObject } from 'react';
import { useState } from 'react';
import { CourseItem, CourseListHeader } from './CourseItem';

import styles from './course-list-view.module.scss';
import { Button } from 'components/common/Button';
import { CourseFilters } from './CourseFilters';
import { FilterIcon } from 'components/Graphics/Icons/Filter';

interface Props {
  searchBarRef: RefObject<HTMLInputElement | null>;
  onSearchChange: (query: string) => void;
  onOrderingChange: (sortOrder: CourseSort) => void;
  currentOrdering: CourseSort;
  onFacultyFilterChange: (facultyId: number | null) => void;
  onDepartmentFilterChange: (departmentId: number | null) => void;
  currentDepartmentId: number | null;
  departments: Department[];
  currentFacultyId: number | null;
  faculties: Faculty[];
  query: string;
  courses: Course[];
  isLoading: boolean;
  nextPage: () => void;
  resetPages: () => void;
}

export const CourseListView: FC<Props> = ({
  searchBarRef,
  onSearchChange,
  onOrderingChange,
  currentOrdering,
  onFacultyFilterChange,
  onDepartmentFilterChange,
  currentDepartmentId,
  departments,
  currentFacultyId,
  faculties,
  query,
  courses,
  isLoading,
  nextPage,
  resetPages,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    resetPages();
    onSearchChange(event.target.value);
  };

  const toggleShowMenu = () => setShowFilters((current) => !current);

  return (
    <section className={styles.container}>
      <div className={styles.searchContainer}>
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
        <Button
          className={styles.toggleFiltersButton}
          active={showFilters}
          invertedActive
          onClick={toggleShowMenu}
          aria-expanded={showFilters}
          aria-label="Vis søkefiltere"
        >
          <FilterIcon className={styles.filtersIcon} />
        </Button>
      </div>
      {showFilters ? (
        <CourseFilters
          onOrderingChange={onOrderingChange}
          currentOrdering={currentOrdering}
          onFacultyFilterChange={onFacultyFilterChange}
          onDepartmentFilterChange={onDepartmentFilterChange}
          departments={departments}
          currentDepartmentId={currentDepartmentId}
          faculties={faculties}
          currentFacultyId={currentFacultyId}
        />
      ) : null}
      {!isLoading && !courses.length && <Text>Ingen resultater</Text>}
      {courses.length ? (
        <>
          <CourseListHeader />
          <ol className={styles.courseList}>
            {courses.map((course) => (
              <CourseItem key={course.code} course={course} />
            ))}
          </ol>
        </>
      ) : null}
      <InifiniteLoading isLoading={isLoading} triggerNextPage={nextPage} />
    </section>
  );
};
