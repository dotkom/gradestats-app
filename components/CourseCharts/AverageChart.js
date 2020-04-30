import React from 'react';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryLabel } from 'victory';

import { isKont } from '../../common/utils/grades';

export const AverageChart = ({ grades, showKont }) => {
  const gradesData = grades
    .filter((grade) => !isKont(grade) || showKont)
    .map((grade) => ({
      x: grade.semester_code,
      y: grade.average_grade,
    }));
  const ticks = gradesData.map((datum) => datum.x);
  return (
    <VictoryChart
      height={350}
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
          y: [
            Math.min(...gradesData.map((datum) => datum.y)) - 0.3,
            Math.max(...gradesData.map((datum) => datum.y)) + 0.3,
          ],
        }}
        labels={({ datum }) => datum.y.toFixed(2)}
        labelComponent={<VictoryLabel renderInPortal dy={-20} />}
      />
    </VictoryChart>
  );
};
