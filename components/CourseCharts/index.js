import React, { useState } from 'react';
import { GradedGraph } from './GradedGraph';
import { Averages } from './Averages';
import { UngradedGraph } from './UngradedGraph';

const calculateAverageGrade = (grades) => {
  let average = 0;
  let attendees = 0;
  for (const grade of grades) {
    attendees += grade.attendee_count;
    average += grade.average_grade * grade.attendee_count;
  }
  if (attendees === 0) {
    return 0;
  } else {
    return average / attendees;
  }
};

export const CourseCharts = ({ grades }) => {
  const [currentGrade, setCurrentGrade] = useState([...grades].reverse()[0]);
  const totalAverage = calculateAverageGrade(grades);
  return (
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
      <div id="grades-graph" style={{ padding: '10px' }}>
        {currentGrade.passed === 0 ? <GradedGraph grade={currentGrade} /> : <UngradedGraph grade={currentGrade} />}
      </div>
      <div id="bar-chart-data">
        <Averages totalAverage={totalAverage} gradeAverage={currentGrade.average_grade} />
        <div id="grade-group">
          <div id="grade-buttons" className="btn-toolbar">
            {grades.map((grade) => (
              <button
                key={grade.semester_code}
                type="button"
                className="btn-grade btn btn-default"
                onClick={() => setCurrentGrade(grade)}
              >
                {grade.semester_code}
              </button>
            ))}
          </div>
        </div>
      </div>
      <br />
      <div className="hide text-left" id="show-kont-selector">
        <button id="show-kont" type="button" className="btn btn-default" data-toggle="button">
          Vis kont
        </button>
      </div>
    </div>
  );
};
