import { mapGradeAverageToLetter } from 'common/utils/grades';
import Link from 'next/link';
import React, { FC } from 'react';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import cx from 'classnames';

import styles from './course-card.module.scss';
import { OutlinedCard } from 'components/Card/OutlinedCard';

export const GRADE_COLORS: Record<string, string> = {
  A: styles.gradeA,
  B: styles.gradeB,
  C: styles.gradeC,
  D: styles.gradeD,
  E: styles.gradeE,
  F: styles.gradeF,
  PASSED: styles.gradePassed,
  NOT_PASSED: styles.gradeNotPassed,
};

interface Props {
  className?: string;
  code: string;
  name: string;
  gradeAverage: number;
}

export const CourseCard: FC<Props> = ({ className, code, name, gradeAverage }) => {
  const gradeLetter = mapGradeAverageToLetter(gradeAverage);
  return (
    <Link href="/course/[courseCode]" as={`/course/${code}`}>
      <OutlinedCard as="a" className={cx(className, styles.card)}>
        <Heading className={styles.code} as="h3">
          {code}
        </Heading>
        <Text className={styles.text}>{name}</Text>
        <Text className={cx(styles.grade, GRADE_COLORS[gradeLetter])}>{gradeLetter}</Text>
      </OutlinedCard>
    </Link>
  );
};
