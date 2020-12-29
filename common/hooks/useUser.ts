import { LoggedInUser } from 'models/User';
import useSWR from 'swr';

import { fetcher } from '../fetcher';

export const useUser = () => {
  const { data, mutate, revalidate } = useSWR<{ user: LoggedInUser }>('/api/auth/user', fetcher);
  const loading = !data;
  const user = data?.user;
  const functions = { mutate, loading, revalidate };
  return [user, functions] as [typeof user, typeof functions];
};
