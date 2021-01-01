import dynamic from 'next/dynamic';
import React, { FC, useState } from 'react';
import Carousel from 'react-alice-carousel';
import cx from 'classnames';

import styles from './course-charts.module.scss';

import { Button } from 'components/common/Button';
import { Grade } from 'models/Grade';
import GradedGraph from './GradedGraph';
import UngradedGraph from './UngradedGraph';
import { EventObject } from 'react-alice-carousel/lib/types';

const DynamicAverageChart = dynamic(() => import('./AverageChart'), { ssr: false });
const DynamicFailedChart = dynamic(() => import('./FailedChart'), { ssr: false });
interface Props {
  className?: string;
  grades: Grade[];
  currentGrade: Grade;
}

type Tab = 'BAR' | 'AVERAGE' | 'FAILED';

const TAB_INDEX: Record<Tab, number> = {
  BAR: 0,
  AVERAGE: 1,
  FAILED: 2,
};

const INDEX_TAB: Record<number, Tab> = {
  0: 'BAR',
  1: 'AVERAGE',
  2: 'FAILED',
};

export const CourseCharts: FC<Props> = ({ className, grades, currentGrade }) => {
  const [tab, setTab] = useState<Tab>('BAR');
  const courseHasGrades = grades.length > 0;

  if (!courseHasGrades) {
    return null;
  }

  const handleSlideChange = (event: EventObject) => {
    setTab(INDEX_TAB[event.item]);
  };

  return (
    <div className={cx(styles.victoryContainer, styles.charts, className)}>
      <Carousel
        mouseTracking
        activeIndex={TAB_INDEX[tab]}
        onSlideChanged={handleSlideChange}
        disableButtonsControls
        items={[
          currentGrade.passed === 0 ? (
            <GradedGraph key="graded" grade={currentGrade} />
          ) : (
            <UngradedGraph key="ungraded" grade={currentGrade} />
          ),
          <DynamicAverageChart key="averages" grades={grades} />,
          <DynamicFailedChart key="failed" grades={grades} />,
        ]}
      ></Carousel>
      {/*
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
      */}
    </div>
  );
};
