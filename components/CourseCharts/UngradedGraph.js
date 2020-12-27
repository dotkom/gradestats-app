import { getColorForGradeLetter } from 'common/utils/grades';
import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

export const UngradedGraph = ({ grade }) => {
  return (
    <VictoryChart
      height={220}
      theme={VictoryTheme.material}
      domainPadding={60}
      padding={32}
      style={{
        parent: {
          border: '1px solid #666666',
          background: 'var(--background-color)',
        },
      }}
    >
      <VictoryAxis
        tickFormat={['Bestått', 'Ikke bestått']}
        style={{ parent: { marginTop: '2px' } }}
        offsetY={28}
        padding={{ top: 20, bottom: 60 }}
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
