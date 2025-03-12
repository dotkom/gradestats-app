import type { Grade } from 'models/Grade';
import type { FC } from 'react';
import { VictoryBar } from 'victory';

interface Props {
  grade: Grade;
}

export const PreviewChart: FC<Props> = ({ grade }) => {
  return (
    <VictoryBar
      barRatio={1.5}
      style={{ data: { fill: ({ datum }) => getColorForGradeLetter(datum.letter) } }}
      labels={({ datum }) => datum.attendees}
      data={[
        {
          position: 1,
          letter: 'A',
          attendees: grade.a,
        },
        {
          position: 2,
          letter: 'B',
          attendees: grade.b,
        },
        {
          position: 3,
          letter: 'C',
          attendees: grade.c,
        },
        {
          position: 4,
          letter: 'D',
          attendees: grade.d,
        },
        {
          position: 5,
          letter: 'E',
          attendees: grade.e,
        },
        {
          position: 6,
          letter: 'F',
          attendees: grade.f,
        },
      ]}
      x="position"
      y="attendees"
    />
  );
};

export const GRADE_COLORS: Record<string, string> = {
  A: '#16dbc4',
  B: '#16dbc4',
  C: '#43cbff',
  D: '#43cbff;',
  E: '#33a1fd',
  F: '#ff9999',
  PASSED: '#16dbc4',
  NOT_PASSED: '#ff9999',
};

export const getColorForGradeLetter = (gradeLetter: string) => {
  return GRADE_COLORS[gradeLetter];
};
