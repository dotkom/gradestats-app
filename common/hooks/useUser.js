import useSWR from 'swr';

import { fetcher } from '../fetcher';

export function useUser() {
  const { data, mutate } = useSWR('/api/auth/user', fetcher);
  const loading = !data;
  const user = data?.user;
  return [user, { mutate, loading }];
}
