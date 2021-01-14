import { InifiniteLoading } from 'components/Loading/InfiniteLoading';
import { GradesUser } from 'models/User';
import Head from 'next/head';
import React, { FC } from 'react';
import { UserItem } from './UserItem';

import styles from './users-list-view.module.scss';

interface Props {
  users: GradesUser[];
  isLoading: boolean;
  nextPage: () => void;
}

const TEXT = {
  TITLE: 'Admin - brukere',
  DESCRIPTION: 'Administrer brukere',
  TABLE: {
    ID: 'Id',
    EMAIL: 'E-post',
    USERNAME: 'Brukernavn',
    JOINED_DATE: 'Ble med dato',
    IS_ADMIN: 'Admin',
  },
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
          <table className={styles.table}>
            <tbody className={styles.tableContent}>
              <tr>
                <th>{TEXT.TABLE.ID}</th>
                <th>{TEXT.TABLE.EMAIL}</th>
                <th>{TEXT.TABLE.USERNAME}</th>
                <th>{TEXT.TABLE.JOINED_DATE}</th>
                <th>{TEXT.TABLE.IS_ADMIN}</th>
              </tr>
              {users
                .sort((userA, userB) => userA.id - userB.id)
                .map((user) => (
                  <UserItem key={user.username} user={user} />
                ))}
            </tbody>
          </table>
        ) : null}
        <InifiniteLoading triggerNextPage={nextPage} isLoading={isLoading} />
      </section>
    </>
  );
};
