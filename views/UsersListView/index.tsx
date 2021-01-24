import Head from 'next/head';
import { FC } from 'react';

import { InifiniteLoading } from 'components/Loading/InfiniteLoading';
import { GradesUser } from 'models/User';
import { UserItem, UsersListHeader } from './UserItem';

import styles from './users-list-view.module.scss';

interface Props {
  users: GradesUser[];
  isLoading: boolean;
  nextPage: () => void;
}

const TEXT = {
  TITLE: 'Admin - brukere',
  DESCRIPTION: 'Administrer brukere',
};

export const UsersListView: FC<Props> = ({ users, isLoading, nextPage }) => {
  return (
    <>
      <Head>
        <title>{TEXT.TITLE}</title>
        <meta property="og:title" content={TEXT.TITLE} />
        <meta name="description" content={TEXT.DESCRIPTION} />
        <meta property="og:description" content={TEXT.DESCRIPTION} />
      </Head>
      <section className={styles.page}>
        {users.length ? (
          <ol className={styles.usersList}>
            <UsersListHeader />
            {users
              .sort((userA, userB) => userA.id - userB.id)
              .map((user) => (
                <UserItem key={user.username} user={user} />
              ))}
          </ol>
        ) : null}
        <InifiniteLoading triggerNextPage={nextPage} isLoading={isLoading} />
      </section>
    </>
  );
};
