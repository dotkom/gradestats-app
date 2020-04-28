import React from 'react';

const ReportPage = () => {
  return (
    <div className="row">
      <div className="col-md-8">
        <form className="form" method="POST">
          <h1>Rapporter feil</h1>
          <hr />

          <div className="form-group">
            <label className="control-label" htmlFor="course">
              Fagkode:{' '}
            </label>
            <input
              id="course"
              name="course_code"
              type="text"
              placeholder="eks: IT2901"
              className="form-control input-default"
            />
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="term">
              Semester:{' '}
            </label>
            <input
              id="term"
              name="semester_code"
              type="text"
              placeholder="eks: V2010"
              className="form-control input-default"
            />
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="description">
              Beskrivelse:{' '}
            </label>
            <textarea rows="7" id="description" className="form-control input-default" name="description"></textarea>
          </div>

          <div className="form-group">
            <button id="report" name="report" className="btn btn-primary">
              Rapporter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;
