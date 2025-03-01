// import NextAuth from 'next-auth';
import { UserData } from 'app/api/auth/[...nextauth]/route';

interface UserData {
  name: string;
  email: string;
  picture: string;
  accessToken: string;
  sub: string;
  'connect-userid_sec': string[];
  'dataporten-userid_sec': string[];
  email_verified: boolean;
  iat: number;
  exp: number;
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserData | null;
  }
}
