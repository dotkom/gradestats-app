import React, { FC } from 'react';

import { Heading } from 'components/Typography/Heading';

import { Stat } from '../Stat/Stat';

import s from './facts.module.scss';
import { Course } from 'models/Course';

interface Props {
  course: Course;
}

export const Facts: FC<Props> = ({ course }) => {
  const semesters = [course.taught_in_spring && 'vår', course.taught_in_autumn && 'høst'].filter(Boolean);
  return (
    <div>
      <Heading className={s.heading} as="h2">
        Om emnet
      </Heading>
      <dl className={s.facts}>
        <Stat label="Studiepoeng" value={String(course.credit)} />
        <Stat label="Nivå" value={course.course_level} />
        <Stat label="Undervisningsspråk" value={course.taught_in_english ? 'Engelsk' : 'Norsk'} />
        <Stat
          label={semesters.length === 1 ? 'Semester' : 'Semestere'}
          value={semesters.length ? semesters.join(` og `) : 'Ingen'}
        />
      </dl>
    </div>
  );
};
