import Head from 'next/head';
import { FC, useEffect, useState } from 'react';
import { Tags } from 'components/Tags';
import { Facts } from 'components/Facts';
import { CourseContent } from 'components/CourseContent';
import { CourseCharts } from 'components/CourseCharts';
import { filterGradesBySemesters, isKont, SemesterFilter } from 'common/utils/grades';
import { GradeAverages } from 'components/GradeAverages/GradeAverages';
import { Course } from 'models/Course';
import { Grade } from 'models/Grade';
import { Tag } from 'models/Tag';
import { Heading } from 'components/Typography/Heading';
import { ReportDialogButton } from 'components/Report/ReportDialogButton';
import { SemesterMenu } from './SemesterMenu';

import styles from './course-detail-view.module.scss';

interface Props {
  course: Course;
  grades: Grade[];
  tags: Tag[];
}

const ROLLING_AVERAGE_YEARS = 3;

export const CourseDetailView: FC<Props> = ({ course, grades, tags }) => {
  const hasGrades = grades.length !== 0;
  const [semesterFilter, setSemesterFilter] = useState<SemesterFilter>('all');
  const filteredGrades = filterGradesBySemesters(grades, semesterFilter);
  const [currentGrade, setCurrentGrade] = useState([...filteredGrades].reverse()[0]);

  const handleSemesterFilterChange = (semesterFilter: SemesterFilter) => {
    setSemesterFilter(semesterFilter);
  };

  const handleSemesterChange = (semesterCode: string) => {
    const newCurrentGrade = filteredGrades.find((grade) => grade.semester_code === semesterCode);
    if (newCurrentGrade) {
      setCurrentGrade(newCurrentGrade);
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
        <meta name="description" content={course.content} />
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
          <CourseCharts className={styles.charts} grades={filteredGrades} currentGrade={currentGrade} />
        ) : null}
        <aside className={styles.facts}>
          {hasGrades ? (
            <GradeAverages
              allGrades={filteredGrades}
              course={course}
              selectedGrade={currentGrade}
              rollingYearCount={ROLLING_AVERAGE_YEARS}
            />
          ) : null}
          <Facts course={course} />
          <Tags courseCode={course.code} tags={tags} />
        </aside>
        {hasGrades ? (
          <SemesterMenu
            className={styles.controls}
            hasKont={grades.some(isKont)}
            currentSemester={currentGrade.semester_code}
            grades={filteredGrades}
            onSemesterChange={handleSemesterChange}
            onSemesterFilterChange={handleSemesterFilterChange}
          />
        ) : null}
        <CourseContent course={course} className={styles.content} />
        <ReportDialogButton className={styles.report} courseCode={course.code}>
          Meld feil eller send tilbakemelding om emnet
        </ReportDialogButton>
      </section>
    </>
  );
};
