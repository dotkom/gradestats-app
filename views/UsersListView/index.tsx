'use client';
import { useCallback, type FC } from 'react';

import { InifiniteLoading } from 'components/Loading/InfiniteLoading';
import type { GradesUser } from 'models/User';
import { UserItem, UsersListHeader } from './UserItem';

import styles from './users-list-view.module.scss';
import useSWRInfinite from 'swr/infinite';
import type { ListResponse } from 'common/requests';
import { PAGE_SIZE } from 'app/dashboard/users/page';
import { getUserListApiUrl } from 'common/urls';
import { requestsWithAuth } from 'common/requests';

export interface Props {
  initialUsersReponse: ListResponse<GradesUser>;
}

const getUsersUrlPaginated = (index: number, previousPageData: ListResponse<GradesUser>) => {
  if (previousPageData && !previousPageData?.results.length) return null;
  const offset = index * PAGE_SIZE;
  const usersListUrl = getUserListApiUrl({ limit: PAGE_SIZE, offset });
  return usersListUrl;
};

export const UsersListView: FC<Props> = ({ initialUsersReponse }) => {
  const { data, isLoading, setSize } = useSWRInfinite<ListResponse<GradesUser>>(
    getUsersUrlPaginated,
    requestsWithAuth.get,
    {
      fallbackData: [initialUsersReponse],
    }
  );

  const nextPage = useCallback(() => setSize((currentSize) => currentSize + 1), []);

  const users = data?.flatMap((coursesResponse) => coursesResponse.results) || [];

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
