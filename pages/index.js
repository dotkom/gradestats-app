import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { getCourseListApiUrl } from 'common/urls';
import { fetcher } from 'common/fetcher';

const ABOUT_GRADES = (courseCount) => `
  Karakterstatisikk for ${courseCount} emner ved Norges teknisk-naturvitenskapelige universitet.
`;

export const getStaticProps = async () => {
  const limit = 20;
  const ordering = '-attendee_count';
  const response = await fetcher(getCourseListApiUrl({ limit, ordering }));
  const courses = response.results;
  const courseCount = response.count;
  return {
    revalidate: 60 * 60 * 24, // Revalidate once every day.
    props: {
      courses,
      courseCount,
    },
  };
};

const IndexPage = ({ courses, courseCount }) => {
  const { push } = useRouter();

  const handleSearch = (event) => {
    const query = event.target.value;
    push({ pathname: '/course', query: { query } });
  };

  return (
    <div className="container">
      <Head>
        <meta property="og:description" content={ABOUT_GRADES(courseCount)} />
      </Head>
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
          <h2>Mest populære emner ved NTNU</h2>
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
                      <td>{course.average > 0 ? course.average.toFixed(2) : '-'}</td>
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
