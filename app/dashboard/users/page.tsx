import { FC, useCallback } from 'react';

import type { GradesUser } from 'models/User';
import { getUserListApiUrl } from 'common/urls';
import useSWRInfinite from 'swr/infinite';
import { UsersListView } from 'views/UsersListView';
import { requestsWithAuth, ListResponse } from 'common/requests';

const PAGE_SIZE = 20;

const getUsersUrlPaginated = (index: number, previousPageData: ListResponse<GradesUser>) => {
  if (previousPageData && !previousPageData?.results.length) return null;
  const offset = index * PAGE_SIZE;
  const usersListUrl = getUserListApiUrl({ limit: PAGE_SIZE, offset });
  return usersListUrl;
};

const getInitialUsersResponse = async () => {
  const usersListUrl = getUserListApiUrl({ limit: PAGE_SIZE, offset: 0 });
  const initialUsersResponse = await fetch(usersListUrl);
  const data: ListResponse<GradesUser> = await initialUsersResponse.json();

  // if (user?.isStaff) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/',
  //     },
  //     props,
  //   };
  // }
  return {
    initialUsersResponse: data,
  };
};

const UsersPage: FC = async () => {
  const { initialUsersResponse } = await getInitialUsersResponse();

  const { data, isValidating, setSize } = useSWRInfinite<ListResponse<GradesUser>>(
    getUsersUrlPaginated,
    requestsWithAuth.get,
    {
      fallbackData: [initialUsersResponse],
    }
  );

  const nextPage = useCallback(() => setSize((currentSize) => currentSize + 1), []);

  const users = data?.flatMap((coursesResponse) => coursesResponse.results) || [];
  return (
    <>
      <title>Admin - brukere</title>
      <meta property="description" content="Administrer brukere" />
      <UsersListView isLoading={isValidating} users={users} nextPage={nextPage} />
    </>
  );
};

export default UsersPage;
