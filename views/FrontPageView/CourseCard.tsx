import { mapGradeAverageToLetter } from 'common/utils/grades';
import type { FC } from 'react';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import cx from 'classnames';

import styles from './course-card.module.scss';
import { LinkCard } from 'components/Card/LinkCard';
import { formatPercentage } from 'common/utils/math';
import type { Course } from 'models/Course';

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
  course: Course;
}

export const CourseCard: FC<Props> = ({ className, code, name, course }) => {
  const showGradeLetter = course.average !== 0;
  const averageGrade = showGradeLetter ? course.average : course.pass_rate;

  const gradeLetter = averageGrade ? mapGradeAverageToLetter(averageGrade) : undefined;
  return (
    <LinkCard href={`/course/${code}`} className={cx(className, styles.card)}>
      <Heading className={styles.code} as="h3">
        {code}
      </Heading>
      <Text className={styles.text}>{name}</Text>
      <Text className={cx(styles.grade, GRADE_COLORS[gradeLetter ?? 'PASSED'])}>
        {showGradeLetter ? gradeLetter || '-' : averageGrade ? formatPercentage(averageGrade) : '-'}
      </Text>
    </LinkCard>
  );
};
