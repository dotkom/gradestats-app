import React from 'react';

import { VictoryChart, VictoryLine } from 'victory';

export const LineChart = ({ data }) => {
  return (
    <VictoryChart>
      <VictoryLine data={data} />
    </VictoryChart>
  );
};
