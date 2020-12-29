import React, { FC } from 'react';

import { LoggedInUser } from 'models/User';
import { GetServerSideProps } from 'next';
import { ssrAuthMiddleware } from 'common/auth/middleware';
import { MyUserView } from 'views/MyUserView';

interface ServerProps {
  user: LoggedInUser | null;
}

const MyUserPage: FC<ServerProps> = ({ user }) => {
  if (!user) {
    return null;
  }
  return <MyUserView user={user} />;
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (ctx) => {
  await ssrAuthMiddleware(ctx);
  const request = ctx.req as typeof ctx.req & { user?: LoggedInUser };
  return {
    redirect: !request.user
      ? {
          permanent: false,
          destination: '/',
        }
      : undefined,
    props: {
      user: request.user ?? null,
    },
  };
};

export default MyUserPage;
