'use client';
import type { FC } from 'react';

import { MyUserView } from 'views/MyUserView';
import { useSession } from 'next-auth/react';

const MyUserPage: FC = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }
  return <MyUserView user={session.user} />;
};

export default MyUserPage;
