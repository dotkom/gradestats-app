import { mapGradeAverageToLetter } from 'common/utils/grades';
import { Stat } from 'components/Stat';
import React, { FC } from 'react';

interface Props {
  label: string;
  average: number;
}

export const GradedStat: FC<Props> = ({ label, average }) => {
  return <Stat label={label} value={mapGradeAverageToLetter(average)} extra={average.toFixed(2)} />;
};
