import { LoggedInUser } from 'models/User';
import { GetServerSidePropsContext } from 'next';
import { signIn, signOut, getSession } from 'next-auth/client';

export interface FeideProfile {
  sub: string;
  'connect-userid_sec': string[];
  'dataporten-userid_sec': string[];
  name: string;
  email: string;
  email_verified: boolean;
  picture: string;
}

export const OIDC_CLIENT_NAME = 'feide';

export const logIn = async () => {
  await signIn(OIDC_CLIENT_NAME);
};

export const logOut = async () => {
  await signOut();
};

export const getUserClient = async () => {
  const session = await getSession();
  const user = (session as any) as LoggedInUser | null;
  return user;
};

export const getUserServer = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  const user = (session as any) as LoggedInUser | null;
  return user;
};
