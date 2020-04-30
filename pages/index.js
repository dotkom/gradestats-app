// import Head from 'next/head';
import Link from 'next/link';
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
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <br />
          {!courses || courses.length === 0 ? (
            <div className="alert alert-danger">
              <p>Vi fant dessverre ingen fag</p>
            </div>
          ) : null}

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
