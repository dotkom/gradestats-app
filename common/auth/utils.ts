import type { LoggedInUser } from 'models/User';
import type { GetServerSidePropsContext } from 'next';
import { signIn, signOut, getSession } from 'next-auth/react';

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

export const getUser = async (ctx?: GetServerSidePropsContext) => {
  if (!process.browser && !ctx) {
    return null;
  }
  const session = await getSession(ctx);

  const user = session as any as LoggedInUser | null;
  return user;
};
