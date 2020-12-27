import React, { useRef } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { fetcher } from 'common/fetcher';
import { getCourseListApiUrl } from 'common/urls';
import { useQueryParam } from 'common/hooks/useQueryParam';
import { useIsomorphicLayoutEffect } from 'common/hooks/useIsomorphicLayoutEffect';
import { CourseListView } from 'views/CourseListView';

const PAGE_SIZE = 20;

const CourseListPage = () => {
  const { pathname } = useRouter();
  const searchBarRef = useRef<HTMLInputElement | null>(null);
  const [queryParam, setQuery] = useQueryParam('query', '');
  const query = Array.isArray(queryParam) ? queryParam.join(',') : queryParam;
  const [page] = useQueryParam('page', '1');
  const pageNumber = !Number.isNaN(Number(page)) ? Number(page) : 1;
  const offset = (pageNumber - 1) * PAGE_SIZE;
  const ordering = '-watson_rank,-attendee_count';
  const searchUrl = getCourseListApiUrl({
    limit: PAGE_SIZE,
    offset,
    query,
    ordering,
  });
  const { data, isValidating } = useSWR(searchUrl, fetcher);

  const courses = (data && data.results) || [];
  const coursesCount = (data && data.count) || 0;
  const pageCount = Math.ceil(coursesCount / PAGE_SIZE);

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
    />
  );
};
export default CourseListPage;
