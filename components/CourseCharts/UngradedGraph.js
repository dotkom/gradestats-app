import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const GRADE_COLORS = {
  PASSED: '#00CC00',
  NOT_PASSED: '#CC0000',
};

export const UngradedGraph = ({ grade }) => {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={60}
      padding={32}
      style={{
        parent: {
          border: '1px solid #666666',
          background: '#ffffff',
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
        style={{ data: { fill: ({ datum }) => GRADE_COLORS[datum.status] } }}
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
