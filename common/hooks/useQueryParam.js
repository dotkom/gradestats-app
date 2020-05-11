import { useRouter } from 'next/router';

export const useQueryParam = (name, defaultValue = '') => {
  const { query, pathname, replace } = useRouter();
  const value = query[name] || defaultValue;

  const setValue = (newValue) => {
    replace({ pathname, query: { ...query, [name]: newValue } });
  };

  return [value, setValue];
};
