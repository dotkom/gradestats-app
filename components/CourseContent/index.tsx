import { Course } from 'models/Course';
import React, { FC } from 'react';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';

import styles from './course-content.module.scss';

interface Props {
  className?: string;
  course: Course;
}

export const CourseContent: FC<Props> = ({ className, course }) => {
  const ntnuUrl = `http://www.ntnu.no/studier/emner/${course.code}`;
  return (
    <article className={className}>
      <Heading className={styles.header} as="h2">
        Faglig Innhold
      </Heading>
      <Text className={styles.text}>{course.content || 'Ingen info.'}</Text>
      <Heading className={styles.header} as="h2">
        Læringsmål
      </Heading>
      <Text className={styles.text}>{course.learning_goal || 'Ingen info.'}</Text>
      <div className={styles.externalLinks}>
        <a className={styles.link} href={ntnuUrl} target="_blank" rel="noopener noreferrer">
          Emnesider for {course.code} (NTNU)
        </a>
      </div>
    </article>
  );
};
