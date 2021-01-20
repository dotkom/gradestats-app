import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import cx from 'classnames';

import { Grade } from 'models/Grade';
import { Label } from 'components/forms/Label';
import { Scrolly } from 'components/forms/Scrolly';
import { Select } from 'components/forms/Select';

import styles from './semester-menu.module.scss';
import { SemesterFilter } from 'common/utils/grades';

interface Props {
  className?: string;
  hasKont: boolean;
  grades: Grade[];
  onSemesterChange: (semesterCode: string) => void;
  onSemesterFilterChange: (semesterFilter: SemesterFilter) => void;
}

export const SemesterMenu: FC<Props> = ({ className, grades, onSemesterChange, onSemesterFilterChange, hasKont }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isStickied, setIsStickied] = useState(false);

  const handleSemesterFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SemesterFilter;
    onSemesterFilterChange(value);
  };

  useEffect(() => {
    const menu = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsStickied(!entry.isIntersecting);
    });
    if (menu) {
      observer.observe(menu);
    }

    return () => observer.disconnect();
  }, [ref.current]);

  return (
    <menu className={cx(styles.controls, className)}>
      <div
        className={cx(styles.controlsContent, {
          [styles.sticky]: isStickied,
        })}
      >
        <Label className={styles.semesterSelectLabel} label="Semester">
          <Scrolly values={grades.map((grade) => grade.semester_code)} onClick={onSemesterChange} />
        </Label>
        {hasKont ? (
          <Label label="Filter">
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
      </div>
      <div ref={ref} className={styles.observedPixel} />
    </menu>
  );
};