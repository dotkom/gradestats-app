import { useUser } from 'common/hooks/useUser';
import { Button } from 'components/common/Button';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import { LoggedInUser } from 'models/User';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import styles from './my-user-view.module.scss';

interface Props {
  user: LoggedInUser;
}

export const MyUserView: FC<Props> = ({ user }) => {
  const { push } = useRouter();
  const [, { revalidate }] = useUser();

  const handleLogOut = async () => {
    await fetch('/api/auth/logout');
    revalidate();
    push('/');
  };

  return (
    <section className={styles.container}>
      <Heading as="h1">Min side</Heading>
      <Heading as="h2">Logget inn som: {user.fullName}</Heading>
      <Text>E-post: {user.email}</Text>
      <Button onClick={handleLogOut}>Logg ut</Button>
    </section>
  );
};
