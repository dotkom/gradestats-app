import React from 'react';

import { VictoryChart, VictoryLine } from 'victory';

export const LineChart = ({ data }) => {
  return (
    <VictoryChart height={220}>
      <VictoryLine data={data} />
    </VictoryChart>
  );
};
