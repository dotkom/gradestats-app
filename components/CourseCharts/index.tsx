import dynamic from 'next/dynamic';
import React, { FC, useState } from 'react';
import cx from 'classnames';

import styles from './course-charts.module.scss';

import { Button } from 'components/common/Button';
import { Grade } from 'models/Grade';

const DynamicGradedGraph = dynamic(() => import('./GradedGraph'), { ssr: true });
const DynamicUngradedGraph = dynamic(() => import('./UngradedGraph'), { ssr: true });
const DynamicAverageChart = dynamic(() => import('./AverageChart'), { ssr: false });
const DynamicFailedChart = dynamic(() => import('./FailedChart'), { ssr: false });

interface Props {
  className?: string;
  grades: Grade[];
  currentGrade: Grade;
}

type Tab = 'BAR' | 'AVERAGE' | 'FAILED';

export const CourseCharts: FC<Props> = ({ className, grades, currentGrade }) => {
  const [tab, setTab] = useState<Tab>('BAR');
  const courseHasGrades = grades.length > 0;

  if (!courseHasGrades) {
    return null;
  }

  return (
    <div className={className}>
      <div className={cx(styles.victoryContainer, styles.charts)}>
        {tab === 'BAR' &&
          (currentGrade.passed === 0 ? (
            <DynamicGradedGraph grade={currentGrade} />
          ) : (
            <DynamicUngradedGraph grade={currentGrade} />
          ))}
        {tab === 'AVERAGE' && <DynamicAverageChart grades={grades} />}
        {tab === 'FAILED' && <DynamicFailedChart grades={grades} />}
      </div>
      <menu className={styles.buttons}>
        <Button type="button" className={cx({ active: tab === 'BAR' })} onClick={() => setTab('BAR')}>
          Karakterer
        </Button>
        <Button type="button" className={cx({ active: tab === 'AVERAGE' })} onClick={() => setTab('AVERAGE')}>
          Snitt
        </Button>
        <Button type="button" className={cx({ active: tab === 'FAILED' })} onClick={() => setTab('FAILED')}>
          Strykprosent
        </Button>
      </menu>
    </div>
  );
};
