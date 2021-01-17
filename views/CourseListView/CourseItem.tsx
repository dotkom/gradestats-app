import { ListResponse } from 'common/requests';
import { getCourseGradeListApiUrl } from 'common/urls';
import {
  calculateAverageGrade,
  calculateAveragePassingRate,
  isGraded,
  mapGradeAverageToLetter,
} from 'common/utils/grades';
import { formatPercentage } from 'common/utils/math';
import { LinkCard } from 'components/Card/LinkCard';
import { Text } from 'components/Typography/Text';
import { Course } from 'models/Course';
import { Grade } from 'models/Grade';
import Link from 'next/link';
import { FC } from 'react';
import useSWR from 'swr';
import cx from 'classnames';

import styles from './course-item.module.scss';

interface Props {
  course: Course;
}

export const CourseItem: FC<Props> = ({ course }) => {
  const courseGradeUrl = getCourseGradeListApiUrl(course.code, { limit: 10, offset: 0 });
  const { data: gradesResponse } = useSWR<ListResponse<Grade>>(courseGradeUrl, {
    refreshWhenHidden: false,
    refreshInterval: 0,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
    revalidateOnFocus: false,
  });
  const grades = gradesResponse?.results;
  const showGradeLetter = grades?.some(isGraded);
  const averageGrade = grades
    ? showGradeLetter
      ? calculateAverageGrade(grades)
      : calculateAveragePassingRate(grades)
    : undefined;
  const gradeLetter = averageGrade ? mapGradeAverageToLetter(averageGrade) : undefined;
  return (
    <li className={styles.item}>
      <Link href="/course/[courseCode]" as={`/course/${course.code}`}>
        <LinkCard className={styles.content}>
          <Text>{course.code}</Text>
          <Text>{course.norwegian_name}</Text>
          <Text>
            {grades ? (
              showGradeLetter ? (
                <Text size="h4">{gradeLetter || '-'}</Text>
              ) : (
                <Text>{averageGrade ? formatPercentage(averageGrade) : '-'}</Text>
              )
            ) : null}
          </Text>
        </LinkCard>
      </Link>
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
