'use client';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import cx from 'classnames';

import styles from './course-charts.module.scss';
import './dots.css';
import { Button } from 'components/common/Button';
import type { Grade } from 'models/Grade';
import GradedGraph from './GradedGraph';
import UngradedGraph from './UngradedGraph';
import { Heading } from 'components/Typography/Heading';
import { BasicCard } from 'components/Card/BasicCard';

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

const TAB_TITLE: Record<number, string> = {
  0: 'Karakterfordeling',
  1: 'Snitt',
  2: 'Strykprosent',
};

export const CourseCharts: FC<Props> = ({ className, grades, currentGrade }) => {
  const [tab, setTab] = useState<Tab>('BAR');

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setTab(INDEX_TAB[next]),
  };

  const sliderRef = useRef<Slider>(null);
  const next = () => {
    sliderRef.current?.slickNext();
  };

  const courseHasGrades = grades.length > 0;

  if (!courseHasGrades) {
    return null;
  }

  return (
    <div className={cx(styles.victoryContainer, className)}>
      <header className={styles.titles}>
        <Heading as="h2" size="h4">
          {TAB_TITLE[TAB_INDEX[tab]]}
        </Heading>
        <Button variant="link" onClick={next}>
          <Heading as="p" size="h4">
            {TAB_TITLE[(TAB_INDEX[tab] + 1) % 3] + ` ->`}
          </Heading>
        </Button>
      </header>
      <Slider
        ref={(slider) => {
          sliderRef.current = slider;
        }}
        {...settings}
      >
        {currentGrade.passed === 0 ? (
          <BasicCard key="graded">
            <GradedGraph grade={currentGrade} />
          </BasicCard>
        ) : (
          <BasicCard key="ungraded">
            <UngradedGraph grade={currentGrade} />
          </BasicCard>
        )}
        <BasicCard key="averages">
          <DynamicAverageChart grades={grades} currentSemesterCode={currentGrade.semester_code} />
        </BasicCard>
        <BasicCard key="failed">
          <DynamicFailedChart grades={grades} />
        </BasicCard>
      </Slider>
    </div>
  );
};
