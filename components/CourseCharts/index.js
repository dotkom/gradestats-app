import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import cx from 'classnames';

import { Button } from 'components/common/Button';

const DynamicGradedGraph = dynamic(() => import('./GradedGraph'), { ssr: true });
const DynamicUngradedGraph = dynamic(() => import('./UngradedGraph'), { ssr: true });
const DynamicAverageChart = dynamic(() => import('./AverageChart'), { ssr: false });
const DynamicFailedChart = dynamic(() => import('./FailedChart'), { ssr: false });

export const CourseCharts = ({ grades, currentGrade }) => {
  const [tab, setTab] = useState('BAR'); // 'BAR' | 'AVERAGE' | 'FAILED'
  const [showKont, setShowKont] = useState(false);

  const courseHasGrades = grades.length > 0;

  const toggleShowKont = () => {
    setShowKont((current) => !current);
  };

  if (!courseHasGrades) {
    return null;
  }

  return (
    <div className="well text-center">
      <div className="victory-container" style={{ padding: 'var(--spacing-2)' }}>
        {tab === 'BAR' &&
          (currentGrade.passed === 0 ? (
            <DynamicGradedGraph grade={currentGrade} />
          ) : (
            <DynamicUngradedGraph grade={currentGrade} />
          ))}
        {tab === 'AVERAGE' && <DynamicAverageChart grades={grades} showKont={showKont} />}
        {tab === 'FAILED' && <DynamicFailedChart grades={grades} showKont={showKont} />}
      </div>
      <br />
      {(tab === 'FAILED' || tab === 'AVERAGE') && (
        <div className="text-left">
          <button type="button" onClick={toggleShowKont} className="btn btn-default">
            {showKont ? 'Skjul kont' : 'Vis kont'}
          </button>
        </div>
      )}
      <div className="btn-group">
        <Button
          type="button"
          className={cx('btn', 'btn-default', { active: tab === 'BAR' })}
          onClick={() => setTab('BAR')}
        >
          Karakterer
        </Button>
        <Button
          type="button"
          className={cx('btn', 'btn-default', { active: tab === 'AVERAGE' })}
          onClick={() => setTab('AVERAGE')}
        >
          Snitt
        </Button>
        <Button
          type="button"
          className={cx('btn', 'btn-default', { active: tab === 'FAILED' })}
          onClick={() => setTab('FAILED')}
        >
          Strykprosent
        </Button>
      </div>
    </div>
  );
};

export default CourseCharts;
