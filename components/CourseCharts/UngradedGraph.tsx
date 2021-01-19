import { graphTheme } from 'common/utils/chart';
import { getColorForGradeLetter } from 'common/utils/grades';
import { Grade } from 'models/Grade';
import React, { FC, memo } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

interface Props {
  grade: Grade;
}

export const UngradedGraphComponent: FC<Props> = ({ grade }) => {
  return (
    <VictoryChart
      theme={graphTheme}
      domainPadding={48}
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
        tickFormat={['Bestått', 'Ikke bestått']}
        style={{ parent: { marginTop: '2px' }, grid: { stroke: 'none' } }}
        offsetY={28}
        padding={{ top: 0, bottom: 60 }}
      />
      <VictoryBar
        barRatio={1.2}
        style={{ data: { fill: ({ datum }) => getColorForGradeLetter(datum.status) } }}
        labels={({ datum }) => datum.attendees}
        domain={{ x: [1, 2], y: [0, Math.max(grade.passed, grade.f) + 10] }}
        data={[
          {
            position: 1,
            status: 'PASSED',
            attendees: grade.passed,
          },
          {
            position: 2,
            status: 'NOT_PASSED',
            attendees: grade.f,
          },
        ]}
        x="position"
        y="attendees"
      />
    </VictoryChart>
  );
};

export const UngradedGraph = memo(UngradedGraphComponent, (prevProps, nextProps) => {
  return prevProps.grade.id === nextProps.grade.id;
});

export default UngradedGraph;
