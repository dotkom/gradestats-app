'use client';
import type { Session } from 'next-auth';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import type { FC, PropsWithChildren } from 'react';
import React from 'react';

interface Props {
  session: Session | null;
}

const SessionProvider: FC<PropsWithChildren<Props>> = ({ session, children }) => {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>;
};

export default SessionProvider;
