import React, { useRef } from 'react';
import { useSWRInfinite } from 'swr';

import { fetcher } from 'common/fetcher';
import { getCourseListApiUrl } from 'common/urls';
import { useQueryParam } from 'common/hooks/useQueryParam';
import { useIsomorphicLayoutEffect } from 'common/hooks/useIsomorphicLayoutEffect';
import { CourseListView } from 'views/CourseListView';
import { Course } from 'models/Course';

const PAGE_SIZE = 20;

interface ListResponse<Data> {
  count: number;
  results: Data[];
}

// A function to get the SWR key of each page,
// its return value will be accepted by `fetcher`.
// If `null` is returned, the request of that page won't start.
const getSearchUrlPaginatedGetter = (query: string) => (
  pageNumber: number,
  previousPageData: ListResponse<Course> | null
) => {
  if (previousPageData && !previousPageData?.results.length) return null; // reached the end
  const offset = pageNumber * PAGE_SIZE;
  const ordering = '-watson_rank,-attendee_count';
  return getCourseListApiUrl({
    limit: PAGE_SIZE,
    offset,
    query,
    ordering,
  });
};

const CourseListPage = () => {
  const searchBarRef = useRef<HTMLInputElement | null>(null);
  const [queryParam, setQuery] = useQueryParam('query', '');
  const query = Array.isArray(queryParam) ? queryParam.join(',') : queryParam;
  const getSearchUrl = getSearchUrlPaginatedGetter(query);
  const { data, isValidating, setSize } = useSWRInfinite<ListResponse<Course>>(getSearchUrl, fetcher);

  const nextPage = () => setSize((currentSize) => currentSize + 1);
  const resetPages = () => setSize(1);

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
