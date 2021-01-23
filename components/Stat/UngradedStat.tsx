import { formatPercentage } from 'common/utils/math';
import { Stat } from 'components/Stat/Stat';
import { FC } from 'react';

interface Props {
  label: string;
  percentage: number;
  mode: 'passing' | 'failing';
}

export const UngradedStat: FC<Props> = ({ label, percentage, mode }) => {
  return (
    <Stat label={label} value={formatPercentage(percentage)} extra={mode === 'passing' ? 'Bestått' : 'Ikke bestått'} />
  );
};
