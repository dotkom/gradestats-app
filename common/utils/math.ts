const LOCALE = 'nb-NO';

const percentageFormatter = new Intl.NumberFormat(LOCALE, { maximumSignificantDigits: 2 });

export const formatPercentage = (percentage: number | bigint) => {
  return `${percentageFormatter.format(percentage)} %`;
};

export const average = (values: number[]) => {
  return values.reduce((total, value) => total + value, 0) / values.length;
};
