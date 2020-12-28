import React, { FC, useCallback, useMemo, useRef } from 'react';
import { useSWRInfinite } from 'swr';

import { fetcher, ListResponse } from 'common/fetcher';
import { getCourseListApiUrl } from 'common/urls';
import { useQueryParam } from 'common/hooks/useQueryParam';
import { useIsomorphicLayoutEffect } from 'common/hooks/useIsomorphicLayoutEffect';
import { CourseListView } from 'views/CourseListView';
import { Course } from 'models/Course';

const PAGE_SIZE = 20;

const getSearchUrlPaginatedGetter = (query: string) => (
  pageNumber: number,
  previousPageData: ListResponse<Course> | null
) => {
  if (previousPageData && !previousPageData?.results.length) return null;
  const offset = pageNumber * PAGE_SIZE;
  const ordering = '-watson_rank,-attendee_count';
  return getCourseListApiUrl({
    limit: PAGE_SIZE,
    offset,
    query,
    ordering,
  });
};

const CourseListPage: FC = () => {
  const searchBarRef = useRef<HTMLInputElement | null>(null);
  const [queryParam, setQuery] = useQueryParam('query', '');
  const query = Array.isArray(queryParam) ? queryParam.join(',') : queryParam;
  const getSearchUrl = useMemo(() => getSearchUrlPaginatedGetter(query), [query]);
  const { data, isValidating, setSize } = useSWRInfinite<ListResponse<Course>>(getSearchUrl, fetcher);

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
