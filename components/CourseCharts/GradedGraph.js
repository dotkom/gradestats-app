import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const GRADE_COLORS = {
  A: '#00CC00',
  B: '#00CC33',
  C: '#CCFF33',
  D: '#FFFF00',
  E: '#FF6600',
  F: '#CC0000',
};

export const GradedGraph = ({ grade }) => {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={0}
      padding={32}
      style={{
        parent: {
          border: '1px solid #666666',
          background: '#ffffff',
        },
      }}
    >
      <VictoryAxis
        tickFormat={['A', 'B', 'C', 'D', 'E', 'F']}
        style={{ parent: { marginTop: '2px' } }}
        offsetY={28}
        padding={{ top: 20, bottom: 60 }}
      />
      <VictoryBar
        barRatio={1.5}
        style={{ data: { fill: ({ datum }) => GRADE_COLORS[datum.letter] } }}
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
