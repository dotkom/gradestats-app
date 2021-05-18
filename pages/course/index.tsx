import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { useSWRInfinite } from 'swr';

import { ListResponse, requests } from 'common/requests';
import { getCourseListApiUrl, getDepartmentListApiUrl, getFacultyListApiUrl } from 'common/urls';
import { useQueryParam } from 'common/hooks/useQueryParam';
import { useIsomorphicLayoutEffect } from 'common/hooks/useIsomorphicLayoutEffect';
import { CourseListView } from 'views/CourseListView';
import { Course, CourseSort, COURSE_ORDERING } from 'models/Course';
import { GetStaticProps } from 'next';
import { Department } from 'models/Department';
import { Faculty } from 'models/Faculty';
import useDebounce from 'common/hooks/useDebounce';

interface StaticProps {
  departments: Department[];
  faculties: Faculty[];
}

const PAGE_SIZE = 20;

const getSearchUrlPaginatedGetter = (
  query: string,
  sortOrder: CourseSort,
  departmentFilter: number | null,
  facultyFilter: number | null
) => (pageNumber: number, previousPageData: ListResponse<Course> | null) => {
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

const CourseListPage: FC<StaticProps> = ({ departments, faculties }) => {
  const searchBarRef = useRef<HTMLInputElement | null>(null);
  const [queryParam, setQuery] = useQueryParam('query', '');
  const [sortOrder, setSortOrder] = useState<CourseSort>('ranking');
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [facultyId, setFacultyId] = useState<number | null>(null);
  const query = Array.isArray(queryParam) ? queryParam.join(',') : queryParam;
  const debouncedQuery = useDebounce(query, 1000);
  const getSearchUrl = useMemo(() => getSearchUrlPaginatedGetter(debouncedQuery, sortOrder, departmentId, facultyId), [
    debouncedQuery,
    sortOrder,
    departmentId,
    facultyId,
  ]);
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

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const [departmentsResponse, facultiesResponse] = await Promise.all([
    requests.get<ListResponse<Department>>(getDepartmentListApiUrl()),
    requests.get<ListResponse<Faculty>>(getFacultyListApiUrl()),
  ]);
  const departments = departmentsResponse.results;
  const faculties = facultiesResponse.results;
  return {
    revalidate: 60 * 60, // Revalidate once each hour.
    props: {
      departments,
      faculties,
    },
  };
};

export default CourseListPage;
