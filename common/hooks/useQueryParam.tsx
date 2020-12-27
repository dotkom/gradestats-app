import { useRouter } from 'next/router';

export const useQueryParam = (name: string, defaultValue = '') => {
  const { query, pathname, replace } = useRouter();
  const value = query[name] || defaultValue;

  const setValue = (newValue: string | string[]) => {
    replace({ pathname, query: { ...query, [name]: newValue } });
  };

  return [value, setValue] as [typeof value, typeof setValue];
};
