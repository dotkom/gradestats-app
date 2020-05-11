import Link from 'next/link';
import React, { useRef } from 'react';
import useSWR from 'swr';

import { fetcher } from '../../common/fetcher';
import { getCourseListApiUrl } from '../../common/urls';
import { useQueryParam } from '../../common/hooks/useQueryParam';
import { useIsomorphicLayoutEffect } from '../../common/hooks/useIsomorphicLayoutEffect';

const PAGE_SIZE = 20;

const CourseListPage = () => {
  const searchBarRef = useRef(null);
  const [query, setQuery] = useQueryParam('query', '');
  const [page] = useQueryParam('page', '1');
  const pageNumber = !Number.isNaN(Number(page)) ? Number(page) : 1;
  const offset = (pageNumber - 1) * PAGE_SIZE;
  const searchUrl = getCourseListApiUrl({ limit: PAGE_SIZE, offset, query });
  const { data } = useSWR(searchUrl, fetcher);

  const courses = (data && data.results) || [];
  const coursesCount = (data && data.count) || 0;
  const pageCount = Math.ceil(coursesCount / PAGE_SIZE);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useIsomorphicLayoutEffect(() => {
    if (searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, [searchBarRef]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <br />
          <div className="form-group has-feedback has-search">
            <span className="glyphicon glyphicon-search form-control-feedback"></span>
            <input
              ref={searchBarRef}
              type="text"
              className="form-control"
              placeholder="Søk..."
              onChange={handleChange}
              value={query}
            />
          </div>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Fagkode</th>
                <th>Navn</th>
                <th>Snitt</th>
              </tr>
            </thead>
            <tbody>
              {courses &&
                courses.map((course) => (
                  <Link key={course.code} href="/course/[courseCode]" as={`/course/${course.code}`}>
                    <tr>
                      <td>{course.code}</td>
                      <td>{course.norwegian_name}</td>
                      <td>{course.average > 0 ? course.average : '-'}</td>
                    </tr>
                  </Link>
                ))}
            </tbody>
          </table>
          <div className="container-fluid text-center">
            <Link href={{ pathname, query: { query, page: pageNumber - 1 } }}>
              <a>&lt;&lt;</a>
            </Link>
            {`${page} av ${pageCount}`}
            <Link href={{ pathname, query: { query, page: pageNumber + 1 } }}>
              <a>&gt;&gt;</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseListPage;
