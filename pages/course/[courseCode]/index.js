import fetch from 'isomorphic-fetch';
import React from 'react';

export const getStaticPaths = async () => {
  const response = await fetch(`https://grades.no/api/v2/courses/?limit=100000`);
  const data = await response.json();
  const courseCodes = data.results.map((course) => course.code);
  const paths = courseCodes.map((courseCode) => ({ params: { courseCode } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await fetch(`https://grades.no/api/v2/courses/${params.courseCode}/`);
  const course = await response.json();
  return {
    props: {
      course,
    },
  };
};

const CourseDetailPage = ({ course, tags = [] }) => {
  const ntnuUrl = `http://www.ntnu.no/studier/emner/${course.code}`;
  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <h1>
            {course.code} - {course.norwegian_name}
          </h1>
          <h2>Faglig Innhold</h2>
          <p>{course.content || 'Ingen info.'}</p>
          <h2>Læringsmål</h2>
          <p>{course.learning_goal || 'Ingen info.'}</p>
          <hr />
          <a href={ntnuUrl} target="_blank" rel="noopener noreferrer">
            {ntnuUrl}
          </a>
          <hr />
        </div>
        <div className="col-md-4">
          <div className="well text-center">
            <div id="graph-selector">
              <div className="btn-group">
                <button type="button" className="btn btn-default" id="bar-graph-button">
                  Karakterer
                </button>
                <button type="button" className="btn btn-default" id="average-graph-button">
                  Snitt
                </button>
                <button type="button" className="btn btn-default" id="failed-graph-button">
                  Strykprosent
                </button>
              </div>
            </div>
            <div id="grades-graph"></div>
            <div id="bar-chart-data">
              {course.average > 0 && (
                <ul className="nav nav-list">
                  <li>
                    Snittkarakter: <label id="average-grade"></label>
                  </li>
                  <li>
                    Totalt snitt: <label id="total-average-grade">{course.average}</label>
                  </li>
                </ul>
              )}
              <div id="grade-group">
                <div id="grade-buttons" className="btn-toolbar"></div>
              </div>
            </div>
            <br />
            <div className="hide text-left" id="show-kont-selector">
              <button id="show-kont" type="button" className="btn btn-default" data-toggle="button">
                Vis kont
              </button>
            </div>
          </div>
          <div className="well">
            <ul className="nav nav-list">
              <li>
                <label>Studiepoeng: {course.credit}</label>
              </li>
              <li>
                <label>Nivå: {course.course_level}</label>
              </li>
              <li>
                <label>
                  Vår:{' '}
                  {course.taught_in_spring ? (
                    <span className="glyphicon glyphicon-ok"></span>
                  ) : (
                    <span className="glyphicon glyphicon-remove"></span>
                  )}
                </label>
              </li>
              <li>
                <label>
                  Høst:{' '}
                  {course.taught_in_autumn ? (
                    <span className="glyphicon glyphicon-ok"></span>
                  ) : (
                    <span className="glyphicon glyphicon-remove"></span>
                  )}
                </label>
              </li>
              <li>
                <label>
                  Engelsk undervisning:{' '}
                  {course.taught_in_english ? (
                    <span className="glyphicon glyphicon-ok"></span>
                  ) : (
                    <span className="glyphicon glyphicon-remove"></span>
                  )}
                </label>
              </li>
            </ul>
          </div>
          <div className="well">
            <h4>Tags</h4>
            <ul className="nav nav-list">
              <li>
                <div className="tags">
                  {tags.map((tag) => (
                    <a
                      key={tag.tag}
                      href="/search/?query={{ tag.tag }}&amp;faculty_code=-1"
                      className="btn btn-default btn-sm btn-tag"
                      role="button"
                    >
                      {tag.tag}
                    </a>
                  ))}
                </div>
              </li>
              <li>
                <form className="form-inline" action="tags/add/" method="POST">
                  <input name="tag" type="text" placeholder="tag (maks 32 tegn)" className="form-control input-sm" />
                  <button type="submit" className="btn btn-sm btn-primary">
                    Legg til
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;
