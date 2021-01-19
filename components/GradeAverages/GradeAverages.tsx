import React, { FC } from 'react';

import s from './grade-averages.module.scss';
import { GradedStat } from 'components/Stat/GradedStat';
import { UngradedStat } from 'components/Stat/UngradedStat';
import { Heading } from 'components/Typography/Heading';
import { Grade } from 'models/Grade';
import {
  calculateAverageGrade,
  isGraded,
  findRelativeRollingGrades,
  calculatePassingRate,
  calculateAveragePassingRate,
} from 'common/utils/grades';
import { BasicCard } from 'components/Card/BasicCard';

interface Props {
  selectedGrade: Grade;
  allGrades: Grade[];
  rollingYearCount: number;
}

export const GradeAverages: FC<Props> = ({ selectedGrade, allGrades, rollingYearCount }) => {
  const isSelectedGradeGraded = isGraded(selectedGrade);
  const rollingGrades = findRelativeRollingGrades(rollingYearCount, selectedGrade.year, allGrades);
  const areAllRollingGradesUngraded = rollingGrades.every((grade) => !isGraded(grade));
  const areAllGradesUngraded = allGrades.every((grade) => !isGraded(grade));

  return (
    <div>
      <Heading className={s.heading} as="h2">
        Karakterer
      </Heading>
      <BasicCard as="dl" className={s.stats}>
        {isSelectedGradeGraded ? (
          <GradedStat
            label={`${selectedGrade.year} ${selectedGrade.semester_display}`}
            average={selectedGrade.average_grade}
          />
        ) : (
          <UngradedStat
            label={`${selectedGrade.year} ${selectedGrade.semester_display}`}
            percentage={calculatePassingRate(selectedGrade)}
            mode="passing"
          />
        )}
        {!areAllRollingGradesUngraded ? (
          <GradedStat
            label={`Siste ${rollingYearCount === 1 ? `år` : `${rollingYearCount} år`}`}
            average={calculateAverageGrade(rollingGrades)}
          />
        ) : (
          <UngradedStat
            label={`Siste ${rollingYearCount === 1 ? `år` : `${rollingYearCount} år`}`}
            percentage={calculateAveragePassingRate(rollingGrades)}
            mode="passing"
          />
        )}
        {!areAllGradesUngraded ? (
          <GradedStat label="Alle år" average={calculateAverageGrade(allGrades)} />
        ) : (
          <UngradedStat label="Alle år" percentage={calculateAveragePassingRate(allGrades)} mode="passing" />
        )}
      </BasicCard>
    </div>
  );
};
