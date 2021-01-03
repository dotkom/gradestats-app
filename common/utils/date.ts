const LOCALE = 'nb-NO';

const formatter = new Intl.DateTimeFormat(LOCALE);

export const formatDateString = (dateString: string) => {
  const date = new Date(Date.parse(dateString));
  return formatter.format(date);
};
