import { graphTheme } from 'common/utils/chart';
import { getColorForGradeLetter } from 'common/utils/grades';
import { Grade } from 'models/Grade';
import React, { FC, memo } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

interface Props {
  grade: Grade;
}

export const GradedGraphComponent: FC<Props> = ({ grade }) => {
  return (
    <VictoryChart
      theme={graphTheme}
      domainPadding={0}
      padding={{
        top: 24,
        left: 32,
        bottom: 32,
        right: 32,
      }}
      style={{
        parent: {
          border: '1px solid var(--background-color-offset)',
          background: 'var(--background-color)',
        },
      }}
    >
      <VictoryAxis
        tickFormat={['A', 'B', 'C', 'D', 'E', 'F']}
        style={{ parent: { marginTop: '2px' }, grid: { stroke: 'none' } }}
        offsetY={28}
        padding={{ top: 0, bottom: 32 }}
      />
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
    </VictoryChart>
  );
};

export const GradedGraph = memo(GradedGraphComponent, (prevProps, nextProps) => {
  return prevProps.grade.id === nextProps.grade.id;
});

export default GradedGraph;
