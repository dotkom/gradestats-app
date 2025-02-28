import { FC } from 'react';

import { InifiniteLoading } from 'components/Loading/InfiniteLoading';
import { GradesUser } from 'models/User';
import { UserItem, UsersListHeader } from './UserItem';

import styles from './users-list-view.module.scss';

export interface Props {
  users: GradesUser[];
  isLoading: boolean;
  nextPage: () => void;
}

export const UsersListView: FC<Props> = ({ users, isLoading, nextPage }) => {
  return (
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
  );
};
