'use client';
import { FC, useCallback, useMemo, useRef, useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import { ListResponse } from 'common/requests';
import { getCourseListApiUrl } from 'common/urls';
import { useIsomorphicLayoutEffect } from 'common/hooks/useIsomorphicLayoutEffect';
import { CourseListView } from 'views/CourseListView';
import { Course, CourseSort, COURSE_ORDERING } from 'models/Course';
import { Department } from 'models/Department';
import { Faculty } from 'models/Faculty';
import useDebounce from 'common/hooks/useDebounce';
import { useQueryParam } from 'common/hooks/useQueryParam';

interface StaticProps {
  departments: Department[];
  faculties: Faculty[];
}

// export const metadata: Metadata = {
//     title: 'grades.no - søk',
//     description: 'Søk i emner ved NTNU',
// };

const PAGE_SIZE = 20;

const getSearchUrlPaginatedGetter =
  (query: string, sortOrder: CourseSort, departmentFilter: number | null, facultyFilter: number | null) =>
  (pageNumber: number, previousPageData: ListResponse<Course> | null) => {
    if (previousPageData && !previousPageData?.results.length) return null;
    const offset = pageNumber * PAGE_SIZE;
    const ordering = COURSE_ORDERING[sortOrder] ?? COURSE_ORDERING['ranking'];
    return getCourseListApiUrl({
      limit: PAGE_SIZE,
      offset,
      query,
      ordering,
      facultyId: facultyFilter ?? undefined,
      departmentId: departmentFilter ?? undefined,
    });
  };

export const CourseListPage: FC<StaticProps> = ({ departments, faculties }) => {
  const searchBarRef = useRef<HTMLInputElement | null>(null);

  const [queryParam, setQuery] = useQueryParam('query', '');
  const [sortOrder, setSortOrder] = useState<CourseSort>('ranking');
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [facultyId, setFacultyId] = useState<number | null>(null);
  const query = Array.isArray(queryParam) ? queryParam.join(',') : queryParam;
  const debouncedQuery = useDebounce(query, 200);
  const getSearchUrl = useMemo(
    () => getSearchUrlPaginatedGetter(debouncedQuery, sortOrder, departmentId, facultyId),
    [debouncedQuery, sortOrder, departmentId, facultyId]
  );
  const { data, isValidating, setSize } = useSWRInfinite<ListResponse<Course>>(getSearchUrl);

  const nextPage = useCallback(() => setSize((currentSize) => currentSize + 1), []);
  const resetPages = useCallback(() => setSize(1), []);

  const courses = data?.flatMap((coursesResponse) => coursesResponse.results) || [];

  useIsomorphicLayoutEffect(() => {
    if (searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, [searchBarRef]);

  return (
    <CourseListView
      searchBarRef={searchBarRef}
      onOrderingChange={setSortOrder}
      currentOrdering={sortOrder}
      onFacultyFilterChange={setFacultyId}
      onDepartmentFilterChange={setDepartmentId}
      departments={departments}
      currentDepartmentId={departmentId}
      faculties={faculties}
      currentFacultyId={facultyId}
      query={query}
      onSearchChange={setQuery}
      courses={courses}
      isLoading={isValidating}
      nextPage={nextPage}
      resetPages={resetPages}
    />
  );
};

export default CourseListPage;
