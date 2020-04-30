import React, { useState } from 'react';
import cx from 'classnames';

import { calculateAverageGrade } from '../../common/utils/grades';

import { GradedGraph } from './GradedGraph';
import { Averages } from './Averages';
import { UngradedGraph } from './UngradedGraph';
import { AverageChart } from './AverageChart';
import { FailedChart } from './FailedChart';

export const CourseCharts = ({ grades }) => {
  const [tab, setTab] = useState('BAR'); // 'BAR' | 'AVERAGE' | 'FAILED'
  const [showKont, setShowKont] = useState(false);
  const [currentGrade, setCurrentGrade] = useState([...grades].reverse()[0]);
  const totalAverage = calculateAverageGrade(grades);

  const toggleShowKont = () => {
    setShowKont((current) => !current);
  };

  return (
    <div className="well text-center">
      <div>
        <div className="btn-group">
          <button
            type="button"
            className={cx('btn', 'btn-default', { active: tab === 'BAR' })}
            onClick={() => setTab('BAR')}
          >
            Karakterer
          </button>
          <button
            type="button"
            className={cx('btn', 'btn-default', { active: tab === 'AVERAGE' })}
            onClick={() => setTab('AVERAGE')}
          >
            Snitt
          </button>
          <button
            type="button"
            className={cx('btn', 'btn-default', { active: tab === 'FAILED' })}
            onClick={() => setTab('FAILED')}
          >
            Strykprosent
          </button>
        </div>
      </div>
      <div style={{ padding: '10px' }}>
        {tab === 'BAR' &&
          (currentGrade.passed === 0 ? <GradedGraph grade={currentGrade} /> : <UngradedGraph grade={currentGrade} />)}
        {tab === 'AVERAGE' && <AverageChart grades={grades} showKont={showKont} />}
        {tab === 'FAILED' && <FailedChart grades={grades} showKont={showKont} />}
      </div>
      {tab === 'BAR' && (
        <div>
          <Averages totalAverage={totalAverage} gradeAverage={currentGrade.average_grade} />
          <div>
            <div className="btn-toolbar">
              {grades.map((grade) => (
                <button
                  key={grade.semester_code}
                  type="button"
                  className={cx('"btn-grade', 'btn', 'btn-default', { active: currentGrade === grade })}
                  onClick={() => setCurrentGrade(grade)}
                >
                  {grade.semester_code}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <br />
      {(tab === 'FAILED' || tab === 'AVERAGE') && (
        <div className="text-left">
          <button type="button" onClick={toggleShowKont} className="btn btn-default">
            {showKont ? 'Skjul kont' : 'Vis kont'}
          </button>
        </div>
      )}
    </div>
  );
};
