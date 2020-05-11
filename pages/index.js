import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { getCourseListApiUrl } from '../common/urls';
import { fetcher } from '../common/fetcher';

export const getStaticProps = async () => {
  const limit = 20;
  const response = await fetcher(getCourseListApiUrl({ limit }));
  const courses = response.results;
  return {
    props: {
      courses,
    },
  };
};

const IndexPage = ({ courses }) => {
  const { push } = useRouter();

  const handleSearch = (event) => {
    const query = event.target.value;
    push({ pathname: '/course', query: { query } });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <br />
          <div className="input-group">
            <div className="input-group-btn">
              <button className="btn btn-default" type="submit">
                <i className="glyphicon glyphicon-search" />
              </button>
            </div>
            <input type="text" className="form-control" placeholder="Søk..." onChange={handleSearch} />
          </div>
          <br />
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
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
