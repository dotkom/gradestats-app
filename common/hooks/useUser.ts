import { LoggedInUser } from 'models/User';
import { useSession } from 'next-auth/react';

export const useUser = () => {
  const { data: session, update: loading } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const user = session?.user as LoggedInUser | null;
  return [user, loading] as [typeof user, typeof loading];
};
