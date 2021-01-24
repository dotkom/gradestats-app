import { Course } from 'models/Course';
import { FC } from 'react';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';

import styles from './course-content.module.scss';
import { BasicCard } from 'components/Card/BasicCard';

interface Props {
  className?: string;
  course: Course;
}

const getOmEmnetUrl = (courseCode: string) => `http://www.ntnu.no/studier/emner/${courseCode}`;
const getStudiekvalitetsportalenUrl = (courseCode: string) =>
  `https://innsida.ntnu.no/studiekvalitetsportalen/emner/${courseCode}`;

export const CourseContent: FC<Props> = ({ className, course }) => {
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
      <Heading className={styles.header} as="h2">
        Lenker
      </Heading>
      <BasicCard>
        <ul className={styles.externalLinks}>
          <li className={styles.linkWrapper}>
            <a className={styles.link} href={getOmEmnetUrl(course.code)} target="_blank" rel="noopener noreferrer">
              Emnesider for {course.code} (NTNU)
            </a>
          </li>
          <li className={styles.linkWrapper}>
            <a
              className={styles.link}
              href={getStudiekvalitetsportalenUrl(course.code)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Studiekvalitetsportalen
            </a>
          </li>
        </ul>
      </BasicCard>
    </article>
  );
};
