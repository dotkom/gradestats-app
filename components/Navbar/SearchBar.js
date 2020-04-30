import cx from 'classnames';
import React, { useState } from 'react';
import useSWR from 'swr';

import { getCourseListApiUrl } from '../../common/urls';
import { fetcher } from '../../common/fetcher';
import Link from 'next/link';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { data } = useSWR(query !== '' ? getCourseListApiUrl({ limit: 10, offset: 0, query }) : null, fetcher);

  const hasResults = data && data.results && data.results.length !== 0;
  const searchResults = ((data && data.results) || []).map((course) => ({
    ...course,
    searchKey: `${course.code} - ${course.norwegian_name}`,
  }));

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  console.log(data);

  return (
    <form
      className="navbar-form navbar-right"
      action="/search/"
      method="get"
      role="search"
      style={{ marginBottom: '-5px' }}
    >
      <div className="input-group">
        <div
          className={cx('dropdown', {
            open: hasResults,
          })}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Søk"
            name="query"
            value={query}
            onChange={handleChange}
          />
          <div className="input-group-btn">
            <button className="btn btn-default" style={{ marginTop: '-5px' }} type="submit">
              <i className="glyphicon glyphicon-search"></i>
            </button>
          </div>
          <ul className="dropdown-menu">
            {searchResults.map((course) => (
              <li key={course.code}>
                <Link href="/course/[courseCode]" as={`/course/${course.code}`}>
                  <a>{course.searchKey}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </form>
  );
};
