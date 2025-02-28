'use client';
// FIXME: server only
import { logOut } from 'common/auth/utils';
import { Button } from 'components/common/Button';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import { LoggedInUser } from 'models/User';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import styles from './my-user-view.module.scss';

interface Props {
  user: LoggedInUser;
}

export const MyUserView: FC<Props> = ({ user }) => {
  const router = useRouter();

  const handleLogOut = async () => {
    await logOut();
    router.push('/');
  };

  return (
    <section className={styles.container}>
      <Heading as="h1">Min side</Heading>
      <Heading as="h2">Logget inn som: {user.fullName}</Heading>
      <Text>E-post: {user.email}</Text>
      {user?.isStaff && <Link href="/dashboard">Dashboard</Link>}
      <Button className={styles.logout} onClick={handleLogOut}>
        Logg ut
      </Button>
    </section>
  );
};
