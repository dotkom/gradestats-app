import React from 'react';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryLabel } from 'victory';

import { isKont, calculateFailureRate } from 'common/utils/grades';

export const FailedChart = ({ grades, showKont }) => {
  const gradesData = grades
    .filter((grade) => !isKont(grade) || showKont)
    .map((grade) => ({
      x: grade.semester_code,
      y: calculateFailureRate(grade),
    }));
  const ticks = gradesData.map((datum) => datum.x);
  return (
    <VictoryChart
      height={220}
      width={350}
      domainPadding={5}
      padding={{
        bottom: 32,
      }}
      style={{
        parent: {
          border: '1px solid #666666',
          background: '#ffffff',
        },
      }}
    >
      <VictoryAxis
        label="Semester"
        style={{
          axisLabel: { padding: 30 },
        }}
        tickFormat={ticks}
      />
      <VictoryLine
        data={gradesData}
        domain={{
          y: [Math.min(...gradesData.map((datum) => datum.y)) - 5, Math.max(...gradesData.map((datum) => datum.y)) + 5],
        }}
        labels={({ datum }) => `${datum.y.toFixed(0)} %`}
        labelComponent={<VictoryLabel renderInPortal dy={-10} />}
      />
    </VictoryChart>
  );
};

export default FailedChart;
