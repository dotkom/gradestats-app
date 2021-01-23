import dynamic from 'next/dynamic';
import { FC, useState } from 'react';
import Carousel from 'react-alice-carousel';
import cx from 'classnames';

import styles from './course-charts.module.scss';

import { Button } from 'components/common/Button';
import { Grade } from 'models/Grade';
import GradedGraph from './GradedGraph';
import UngradedGraph from './UngradedGraph';
import { EventObject } from 'react-alice-carousel/lib/types';
import { Heading } from 'components/Typography/Heading';
import { BasicCard } from 'components/Card/BasicCard';
import { CarouselDot } from './CarouselDot';

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
  const courseHasGrades = grades.length > 0;

  if (!courseHasGrades) {
    return null;
  }

  const handleSlideChange = (event: EventObject) => {
    setTab(INDEX_TAB[event.item]);
  };

  const handleNextSlideClick = () => {
    setTab(INDEX_TAB[(TAB_INDEX[tab] + 1) % 3]);
  };

  return (
    <div className={cx(styles.victoryContainer, className)}>
      <header className={styles.titles}>
        <Heading as="h2" size="h4">
          {TAB_TITLE[TAB_INDEX[tab]]}
        </Heading>
        <Button variant="link" onClick={handleNextSlideClick}>
          <Heading as="p" size="h4">
            {TAB_TITLE[(TAB_INDEX[tab] + 1) % 3] + ` ->`}
          </Heading>
        </Button>
      </header>
      <Carousel
        mouseTracking
        activeIndex={TAB_INDEX[tab]}
        onSlideChanged={handleSlideChange}
        disableButtonsControls
        renderDotsItem={CarouselDot}
        items={[
          currentGrade.passed === 0 ? (
            <BasicCard key="graded">
              <GradedGraph grade={currentGrade} />
            </BasicCard>
          ) : (
            <BasicCard key="ungraded">
              <UngradedGraph grade={currentGrade} />
            </BasicCard>
          ),
          <BasicCard key="averages">
            <DynamicAverageChart grades={grades} currentSemesterCode={currentGrade.semester_code} />
          </BasicCard>,
          <BasicCard key="failed">
            <DynamicFailedChart grades={grades} />
          </BasicCard>,
        ]}
      />
    </div>
  );
};
