import type { VictoryThemeDefinition } from 'victory';

const yellow200 = 'var(--yellow)';
const deepOrange600 = '#F4511E';
const lime300 = '#DCE775';
const lightGreen500 = '#8BC34A';
const teal700 = '#00796B';
const cyan900 = '#006064';
const colors = [deepOrange600, yellow200, lime300, lightGreen500, teal700, cyan900];
const blueGrey50 = '#ECEFF1';
const blueGrey300 = '#90A4AE';
const blueGrey700 = '#455A64';
const grey900 = '#212121';

// Typography
const sansSerif = "'Helvetica Neue', 'Helvetica', sans-serif";
const letterSpacing = 'normal';
const fontSize = 12;

// Layout
const padding = 8;
const baseProps = {
  width: 350,
  height: 220,
  padding: 0,
  domainPadding: 25,
};

const baseStyleProps = {
  parent: {
    border: '1px solid var(--background-color-offset)',
    background: 'var(--background-color)',
  },
};

// * Labels
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding,
  fill: 'var(--text-color)',
  stroke: 'transparent',
  strokeWidth: 0,
};

const centeredLabelStyles = {
  ...baseLabelStyles,
  textAnchor: 'middle',
};

// Strokes
const strokeDasharray = '5,10';
const strokeLinecap = 'round';
const strokeLinejoin = 'round';

// Put it all together...
export const graphTheme: VictoryThemeDefinition = {
  area: {
    ...baseProps,
    style: {
      data: {
        fill: grey900,
      },
      labels: baseLabelStyles,
    },
  },

  axis: {
    ...baseProps,
    style: {
      axis: {
        fill: 'transparent',
        stroke: blueGrey300,
        strokeWidth: 2,
        strokeLinecap,
        strokeLinejoin,
      },
      axisLabel: {
        ...centeredLabelStyles,
        padding,
        stroke: 'transparent',
      },
      grid: {
        fill: 'none',
        stroke: 'var(--text-color)',
        opacity: 0.7,
        strokeDasharray,
        strokeLinecap,
        strokeLinejoin,
        pointerEvents: 'painted',
      },
      ticks: {
        fill: 'transparent',
        size: 5,
        stroke: 'var(--text-color)',
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin,
      },
      tickLabels: { ...baseLabelStyles, fill: 'var(--text-color)' },
    },
  },

  polarDependentAxis: {
    style: {
      ticks: {
        fill: 'transparent',
        size: 1,
        stroke: 'transparent',
      },
    },
  },

  bar: {
    ...baseProps,
    style: {
      data: {
        fill: blueGrey700,
        padding,
        strokeWidth: 0,
      },
      labels: baseLabelStyles,
    },
  },

  boxplot: {
    ...baseProps,
    style: {
      max: { padding, stroke: blueGrey700, strokeWidth: 1 },
      maxLabels: { ...baseLabelStyles, padding: 3 },
      median: { padding, stroke: blueGrey700, strokeWidth: 1 },
      medianLabels: { ...baseLabelStyles, padding: 3 },
      min: { padding, stroke: blueGrey700, strokeWidth: 1 },
      minLabels: { ...baseLabelStyles, padding: 3 },
      q1: { padding, fill: blueGrey700 },
      q1Labels: { ...baseLabelStyles, padding: 3 },
      q3: { padding, fill: blueGrey700 },
      q3Labels: { ...baseLabelStyles, padding: 3 },
    },
    boxWidth: 20,
  },

  candlestick: {
    ...baseProps,
    style: {
      data: {
        stroke: blueGrey700,
      },
      labels: { ...baseLabelStyles, padding: 5 },
    },
    candleColors: {
      positive: '#ffffff',
      negative: blueGrey700,
    },
  },

  chart: baseProps,

  errorbar: {
    ...baseProps,
    borderWidth: 8,
    style: {
      data: {
        fill: 'transparent',
        opacity: 1,
        stroke: blueGrey700,
        strokeWidth: 2,
      },
      labels: baseLabelStyles,
    },
  },

  group: { ...baseProps, colorScale: colors },

  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: 'vertical',
    titleOrientation: 'top',
    style: {
      data: {
        type: 'circle',
      },
      labels: baseLabelStyles,
      title: { ...baseLabelStyles, padding: 5 },
    },
  },

  line: {
    ...baseProps,
    domainPadding: 0,
    style: {
      ...baseStyleProps,
      data: {
        fill: 'transparent',
        opacity: 1,
        stroke: 'var(--red)',
        strokeWidth: 2,
      },
      labels: baseLabelStyles,
    },
  },

  pie: {
    ...baseProps,
    colorScale: colors,
    style: {
      data: {
        padding,
        stroke: blueGrey50,
        strokeWidth: 1,
      },
      labels: { ...baseLabelStyles, padding: 20 },
    },
  },

  scatter: {
    ...baseProps,
    style: {
      data: {
        fill: blueGrey700,
        opacity: 1,
        stroke: 'transparent',
        strokeWidth: 0,
      },
      labels: baseLabelStyles,
    },
  },

  stack: {
    ...baseProps,
    colorScale: colors,
  },

  tooltip: {
    style: { ...baseLabelStyles, padding: 0, pointerEvents: 'none' },
    flyoutStyle: {
      stroke: grey900,
      strokeWidth: 1,
      fill: '#f0f0f0',
      pointerEvents: 'none',
    },
    flyoutPadding: 5,
    cornerRadius: 5,
    pointerLength: 10,
  },

  voronoi: {
    ...baseProps,
    style: {
      data: {
        fill: 'transparent',
        stroke: 'transparent',
        strokeWidth: 0,
      },
      labels: { ...baseLabelStyles, padding: 5, pointerEvents: 'none' },
      flyout: {
        stroke: grey900,
        strokeWidth: 1,
        fill: '#f0f0f0',
        pointerEvents: 'none',
      },
    },
  },
};
