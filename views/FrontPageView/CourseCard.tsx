import { mapGradeAverageToLetter } from 'common/utils/grades';
import Link from 'next/link';
import React, { FC } from 'react';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';

import styles from './course-card.module.scss';

interface Props {
  code: string;
  name: string;
  gradeAverage: number;
}

export const CourseCard: FC<Props> = ({ code, name, gradeAverage }) => {
  return (
    <Link href="/course/[courseCode]" as={`/course/${code}`}>
      <a className={styles.card}>
        <Heading className={styles.code} as="h3">
          {code}
        </Heading>
        <Text className={styles.text}>{name}</Text>
        <Text className={styles.grade}>{mapGradeAverageToLetter(gradeAverage)}</Text>
      </a>
    </Link>
  );
};
