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
import { ReportDialogButton } from 'components/Report/ReportDialogButton';

import styles from './course-detail-view.module.scss';
import { Label } from 'components/forms/Label';
import { Select } from 'components/forms/Select';

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

  const handleSemesterFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SemesterFilter;
    setSemesterFilter(value);
  };

  const handleSemesterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const newCurrentGrade = filteredGrades.find((grade) => grade.semester_code == value);
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
              selectedGrade={currentGrade}
              rollingYearCount={ROLLING_AVERAGE_YEARS}
            />
          ) : null}
          <Facts course={course} />
          <Tags courseCode={course.code} />
        </aside>
        {hasGrades ? (
          <menu className={styles.controls}>
            <Label className={styles.semesterRangeLabel} label="Semester">
              <Select
                className={styles.semesterFilterSelect}
                name="semester"
                onChange={handleSemesterChange}
                value={currentGrade.semester_code}
              >
                {[...filteredGrades].reverse().map((grade) => (
                  <option
                    key={grade.semester_code}
                    value={grade.semester_code}
                  >{`${grade.semester_display} ${grade.year}`}</option>
                ))}
              </Select>
            </Label>
            {grades.some(isKont) ? (
              <Label label="Vis semester">
                <Select
                  className={styles.semesterFilterSelect}
                  name="filter-semesters"
                  onChange={handleSemesterFilterChange}
                >
                  <option value="all">Alle</option>
                  <option value="regular">Vår/Høst</option>
                  <option value="kont">Kont</option>
                </Select>
              </Label>
            ) : null}
          </menu>
        ) : null}
        <CourseContent course={course} className={styles.content} />
        <ReportDialogButton className={styles.report} courseCode={course.code}>
          Meld feil eller send tilbakemelding om emnet
        </ReportDialogButton>
      </section>
    </>
  );
};
