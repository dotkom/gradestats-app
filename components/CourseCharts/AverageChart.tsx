import { graphTheme } from 'common/utils/chart';
import { isKont, isNotKont } from 'common/utils/grades';
import type { Grade } from 'models/Grade';
import type { FC } from 'react';
import { memo } from 'react';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryLabel, VictoryLegend } from 'victory';

interface Props {
  grades: Grade[];
  currentSemesterCode: string;
}

export const AverageChartComponent: FC<Props> = ({ grades }) => {
  const ticks = grades.map((datum) => datum.semester_code);
  const regularGradesData = grades.filter(isNotKont).map((grade) => ({
    x: grade.semester_code,
    y: grade.average_grade,
  }));
  const kontGradesData = grades.filter(isKont).map((grade) => ({
    x: grade.semester_code,
    y: grade.average_grade,
  }));
  return (
    <VictoryChart
      theme={graphTheme}
      domainPadding={0}
      padding={{
        top: 10,
        left: 16,
        bottom: 10,
        right: 5,
      }}
    >
      <VictoryAxis tickFormat={ticks} style={{ grid: { stroke: 'none' } }} />

      <VictoryAxis
        dependentAxis
        domain={[0, 5]}
        tickValues={[0, 1, 2, 3, 4, 5]}
        style={{ tickLabels: { fontSize: 10, padding: 0 } }}
      />
      {regularGradesData.length ? (
        <VictoryLine
          data={regularGradesData}
          interpolation="linear"
          style={{ data: { stroke: 'var(--green)' } }}
          labels={({ datum }) => `${datum.y.toFixed(2)}`}
          labelComponent={
            <VictoryLabel
              style={{ color: 'var(--text-color)', fill: 'var(--text-color)', fontSize: 10 }}
              renderInPortal
              dy={-10}
            />
          }
        />
      ) : null}
      {kontGradesData.length ? (
        <VictoryLine
          data={kontGradesData}
          interpolation="linear"
          style={{ data: { stroke: 'var(--blue)' } }}
          labels={({ datum }) => `${datum.y.toFixed(2)}`}
          labelComponent={
            <VictoryLabel
              style={{ color: 'var(--text-color)', fill: 'var(--text-color)', fontSize: 10 }}
              renderInPortal
              dy={-10}
            />
          }
        />
      ) : null}
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
          { name: 'Vår/Høst', symbol: { fill: 'var(--green)', type: 'diamond' } },
          { name: 'Kont', symbol: { fill: 'var(--blue)' } },
        ]}
      />
    </VictoryChart>
  );
};

export const AverageChart = memo(AverageChartComponent, (prevProps, nextProps) => {
  const prevGrades = prevProps.grades.map((grade) => grade.id);
  const nextGrades = nextProps.grades.map((grade) => grade.id);
  return String(prevGrades) === String(nextGrades) && prevProps.currentSemesterCode === nextProps.currentSemesterCode;
});

export default AverageChart;
