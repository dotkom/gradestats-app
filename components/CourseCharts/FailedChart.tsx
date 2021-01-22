import React, { FC, memo } from 'react';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryLabel, VictoryLegend } from 'victory';

import { calculateFailureRate, isKont, isNotKont } from 'common/utils/grades';
import { Grade } from 'models/Grade';
import { graphTheme } from 'common/utils/chart';

interface Props {
  grades: Grade[];
}

export const FailedChartComponent: FC<Props> = ({ grades }) => {
  const ticks = grades.map((datum) => datum.semester_code);
  const regularGradesData = grades.filter(isNotKont).map((grade) => ({
    x: grade.semester_code,
    y: calculateFailureRate(grade),
  }));
  const kontGradesData = grades.filter(isKont).map((grade) => ({
    x: grade.semester_code,
    y: calculateFailureRate(grade),
  }));
  return (
    <VictoryChart
      theme={graphTheme}
      domainPadding={0}
      padding={{
        top: 10,
        left: 35,
        bottom: 10,
        right: 5,
      }}
    >
      <VictoryAxis tickFormat={ticks} style={{ grid: { stroke: 'none' } }} />
      <VictoryAxis
        dependentAxis
        domain={[0, 100]}
        tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        tickFormat={(tick) => `${tick} %`}
        style={{ tickLabels: { fontSize: 10, padding: 0 } }}
        fixLabelOverlap
      />
      <VictoryLine
        data={regularGradesData}
        style={{ data: { stroke: 'var(--red)', strokeWidth: 2 } }}
        interpolation="linear"
        labels={({ datum }) => `${datum.y.toFixed(0)} %`}
        domain={{ y: [0, 100] }}
        labelComponent={
          <VictoryLabel
            style={{ color: 'var(--text-color)', fill: 'var(--text-color)', fontSize: 10 }}
            renderInPortal
            dy={-10}
          />
        }
      />
      <VictoryLine
        data={kontGradesData}
        style={{ data: { stroke: 'var(--purple)', strokeWidth: 2 } }}
        interpolation="linear"
        labels={({ datum }) => `${datum.y.toFixed(0)} %`}
        domain={{ y: [0, 100] }}
        labelComponent={
          <VictoryLabel
            style={{ color: 'var(--text-color)', fill: 'var(--text-color)', fontSize: 10 }}
            renderInPortal
            dy={-10}
          />
        }
      />
      <VictoryLegend
        x={100}
        y={0}
        orientation="horizontal"
        gutter={20}
        style={{
          border: { stroke: 'none', fill: 'var(--background-color-offset)' },
          labels: { borderRadius: 'var(--spacing-1)', fill: 'var(--text-color)', fontSize: 10, padding: 0 },
        }}
        data={[
          { name: 'Vår/Høst', symbol: { fill: 'var(--red)', type: 'diamond' } },
          { name: 'Kont', symbol: { fill: 'var(--purple)' } },
        ]}
      />
    </VictoryChart>
  );
};

export const FailedChart = memo(FailedChartComponent, (prevProps, nextProps) => {
  const prevGrades = prevProps.grades.map((grade) => grade.id);
  const nextGrades = nextProps.grades.map((grade) => grade.id);
  return String(prevGrades) === String(nextGrades);
});

export default FailedChart;
