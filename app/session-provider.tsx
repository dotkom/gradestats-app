'use client';
import { Session } from 'next-auth';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import React, { FC, PropsWithChildren } from 'react';

interface Props {
  session: Session | null;
}

const SessionProvider: FC<PropsWithChildren<Props>> = ({ session, children }) => {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>;
};

export default SessionProvider;
