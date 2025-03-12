import { useSearchParams } from 'next/navigation';

export const useQueryParam = (name: string, defaultValue = '') => {
  const searchParams = useSearchParams();
  const value = searchParams.get(name) || defaultValue;

  const setValue = (newValue: string) => {
    const current = new URLSearchParams(searchParams.toString());

    current.set(name, newValue);

    window.history.pushState(null, '', `?${current}`);
  };

  return [value, setValue] as [typeof value, typeof setValue];
};
