import { LoggedInUser } from 'models/User';
import { useSession } from 'next-auth/client';

export const useUser = () => {
  const [session, loading] = useSession();
  const user = (session as any) as LoggedInUser | null;
  return [user, loading] as [typeof user, typeof loading];
};
