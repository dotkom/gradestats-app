import { fetcher, ListResponse } from 'common/fetcher';
import { getCourseGradeListApiUrl } from 'common/urls';
import {
  calculateAverageGrade,
  calculateAveragePassingRate,
  isGraded,
  mapGradeAverageToLetter,
} from 'common/utils/grades';
import { formatPercentage } from 'common/utils/math';
import { StatValue } from 'components/Stat/Stat';
import { Course } from 'models/Course';
import { Grade } from 'models/Grade';
import Link from 'next/link';
import React, { FC } from 'react';
import useSWR from 'swr';

import styles from './course-item.module.scss';

interface Props {
  course: Course;
}

export const CourseItem: FC<Props> = ({ course }) => {
  const courseGradeUrl = getCourseGradeListApiUrl(course.code, { limit: 10, offset: 0 });
  const { data: gradesResponse } = useSWR<ListResponse<Grade>>(courseGradeUrl, fetcher, {
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
    <Link href="/course/[courseCode]" as={`/course/${course.code}`}>
      <a className={styles.listItem}>
        <td>{course.code}</td>
        <td>{course.norwegian_name}</td>
        <td>
          {grades ? (
            <StatValue
              value={showGradeLetter ? gradeLetter || '-' : averageGrade ? formatPercentage(averageGrade) : '-'}
              extra={showGradeLetter ? averageGrade?.toFixed(2) : undefined}
            />
          ) : null}
        </td>
      </a>
    </Link>
  );
};
