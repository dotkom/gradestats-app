import { LoggedInUser } from 'models/User';
import { useSession } from 'next-auth/client';

export const useUser = () => {
  const [session, loading] = useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (session as any) as LoggedInUser | null;
  return [user, loading] as [typeof user, typeof loading];
};
