import { mapGradeAverageToLetter } from 'common/utils/grades';
import { formatPercentage } from 'common/utils/math';
import { LinkCard } from 'components/Card/LinkCard';
import { Text } from 'components/Typography/Text';
import type { Course } from 'models/Course';
import type { FC } from 'react';
import cx from 'classnames';

import styles from './course-item.module.scss';

interface Props {
  course: Course;
}

export const CourseItem: FC<Props> = ({ course }) => {
  const showGradeLetter = course.average !== 0;
  const has_grades = course.average !== 0 || course.pass_rate !== 0;
  const averageGrade = showGradeLetter ? course.average : course.pass_rate;

  return (
    <li className={styles.item}>
      <LinkCard href={`/course/${course.code}`} className={styles.content}>
        <Text>{course.code}</Text>
        <Text>{course.norwegian_name}</Text>
        {has_grades ? (
          showGradeLetter ? (
            <Text size="h4">{mapGradeAverageToLetter(averageGrade)}</Text>
          ) : (
            <Text>{averageGrade > 0 ? formatPercentage(averageGrade) : '-'}</Text>
          )
        ) : (
          <Text>-</Text>
        )}
      </LinkCard>
    </li>
  );
};

export const CourseListHeader: FC = () => {
  return (
    <div className={cx(styles.header)}>
      <Text size="h4">Fagkode</Text>
      <Text size="h4">Navn</Text>
      <Text size="h4">Snitt</Text>
    </div>
  );
};
