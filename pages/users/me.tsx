import React, { FC } from 'react';

import type { LoggedInUser } from 'models/User';
import { MyUserView } from 'views/MyUserView';
import { withUser } from 'common/auth/ssr';

interface ServerProps {
  user: LoggedInUser | null;
}

const MyUserPage: FC<ServerProps> = ({ user }) => {
  if (!user) {
    return null;
  }
  return <MyUserView user={user} />;
};

export const getServerSideProps = withUser<ServerProps>(async (_, user) => {
  return {
    props: {
      user,
    },
  };
});

export default MyUserPage;
