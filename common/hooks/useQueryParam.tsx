import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const useQueryParam = (name: string, defaultValue = '') => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const value = searchParams.get(name) || defaultValue;

  const setValue = (newValue: string | string[]) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (Array.isArray(newValue)) {
      for (const element of newValue) {
        current.append(name, element);
      }
    } else {
      current.set(name, newValue);
    }

    router.replace(`${pathname}${current}`);
  };

  return [value, setValue] as [typeof value, typeof setValue];
};
