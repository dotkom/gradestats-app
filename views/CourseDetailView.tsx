import Head from 'next/head';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Tags } from 'components/Tags';
import { Facts } from 'components/Facts';
import { CourseContent } from 'components/CourseContent';
import { CourseCharts } from 'components/CourseCharts';
import { isKont, isNotKont } from 'common/utils/grades';
import { GradeAverages } from 'components/GradeAverages/GradeAverages';
import { Course } from 'models/Course';
import { Grade } from 'models/Grade';
import { Tag } from 'models/Tag';
import { Heading } from 'components/Typography/Heading';
import { ReportCourseButton } from 'components/Report/ReportCourseButton';

import styles from './course-detail-view.module.scss';

interface Props {
  course: Course;
  grades: Grade[];
  tags: Tag[];
}

const ROLLING_AVERAGE_YEARS = 3;

type SemesterFilter = 'regular' | 'kont' | 'all';

const filterGradesBySemesters = (grades: Grade[], semesterFilter: SemesterFilter) => {
  if (semesterFilter === 'all') {
    return grades;
  } else if (semesterFilter == 'regular') {
    return grades.filter(isNotKont);
  } else {
    return grades.filter(isKont);
  }
};

export const CourseDetailView: FC<Props> = ({ course, grades }) => {
  const hasGrades = grades.length !== 0;
  const [semesterFilter, setSemesterFilter] = useState<SemesterFilter>('all');
  const filteredGrades = filterGradesBySemesters(grades, semesterFilter);
  const [currentGrade, setCurrentGrade] = useState([...filteredGrades].reverse()[0]);

  const handleGradeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index = Number(event.target.value);
    setCurrentGrade(filteredGrades[index]);
  };

  const handleSemesterFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = Boolean(event.target.checked);
    if (isChecked) {
      setSemesterFilter('all');
    } else {
      setSemesterFilter('regular');
    }
  };

  useEffect(() => {
    setCurrentGrade([...filteredGrades].reverse()[0]);
  }, [semesterFilter]);

  return (
    <>
      <Head>
        <title>{`${course.code} - ${course.norwegian_name}`}</title>
        <meta property="og:title" content={`${course.code} - ${course.norwegian_name}`} />
        <meta property="og:description" content={course.content} />
        <meta property="og:article:tag" content={course.code} />
        <meta property="og:article:tag" content={course.short_name} />
        <meta property="og:article:tag" content={course.norwegian_name} />
        <meta property="og:article:tag" content={course.english_name} />
        <meta property="og:article:tag" content={course.course_level} />
        <meta property="og:article:tag" content={course.place} />
      </Head>
      <section className={styles.container}>
        <Heading className={styles.heading} as="h1">
          {course.code} - {course.norwegian_name}
        </Heading>
        {hasGrades ? (
          <div className={styles.charts}>
            <CourseCharts grades={filteredGrades} currentGrade={currentGrade} />
            <input
              type="range"
              defaultValue={filteredGrades.length - 1}
              min={0}
              max={filteredGrades.length - 1}
              onChange={handleGradeChange}
            />
            <input
              type="checkbox"
              name="Inkluder kont"
              onChange={handleSemesterFilterChange}
              checked={semesterFilter === 'all'}
            />
          </div>
        ) : null}
        <aside className={styles.facts}>
          {hasGrades ? (
            <GradeAverages
              allGrades={filteredGrades}
              selectedGrade={currentGrade}
              rollingYearCount={ROLLING_AVERAGE_YEARS}
            />
          ) : null}
          <Facts course={course} />
          <Tags courseCode={course.code} />
          <ReportCourseButton courseCode={course.code} />
        </aside>
        <CourseContent course={course} className={styles.content} />
      </section>
    </>
  );
};
