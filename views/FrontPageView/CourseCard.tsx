import {
  calculateAverageGrade,
  calculateAveragePassingRate,
  isGraded,
  mapGradeAverageToLetter,
} from 'common/utils/grades';
import Link from 'next/link';
import { FC } from 'react';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import cx from 'classnames';

import styles from './course-card.module.scss';
import { LinkCard } from 'components/Card/LinkCard';
import { Grade } from 'models/Grade';
import { formatPercentage } from 'common/utils/math';

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
  grades: Grade[];
}

export const CourseCard: FC<Props> = ({ className, code, name, grades }) => {
  const showGradeLetter = grades.some(isGraded);
  const averageGrade = grades
    ? showGradeLetter
      ? calculateAverageGrade(grades)
      : calculateAveragePassingRate(grades)
    : undefined;
  const gradeLetter = averageGrade ? mapGradeAverageToLetter(averageGrade) : undefined;
  return (
    <Link href="/course/[courseCode]" as={`/course/${code}`}>
      <LinkCard className={cx(className, styles.card)}>
        <Heading className={styles.code} as="h3">
          {code}
        </Heading>
        <Text className={styles.text}>{name}</Text>
        <Text className={cx(styles.grade, GRADE_COLORS[gradeLetter ?? 'PASSED'])}>
          {showGradeLetter ? gradeLetter || '-' : averageGrade ? formatPercentage(averageGrade) : '-'}
        </Text>
      </LinkCard>
    </Link>
  );
};
