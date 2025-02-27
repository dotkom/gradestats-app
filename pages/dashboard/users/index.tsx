import { FC, useCallback } from 'react';

import type { GradesUser } from 'models/User';
import { withUser } from 'common/auth/ssr';
import { getUserListApiUrl } from 'common/urls';
import useSWRInfinite from 'swr/infinite';
import { UsersListView } from 'views/UsersListView';
import { requestsWithAuth, Requests, ListResponse } from 'common/requests';

const PAGE_SIZE = 20;

const getUsersUrlPaginated = (pageNumber: number, previousPageData: ListResponse<GradesUser> | null) => {
  if (previousPageData && !previousPageData?.results.length) return null;
  const offset = pageNumber * PAGE_SIZE;
  const usersListUrl = getUserListApiUrl({ limit: PAGE_SIZE, offset });
  return usersListUrl;
};

interface ServerProps {
  initialUsersResponse: ListResponse<GradesUser>;
}

const UsersPage: FC<ServerProps> = ({ initialUsersResponse }) => {
  const { data, isValidating, setSize } = useSWRInfinite<ListResponse<GradesUser>>(
    getUsersUrlPaginated,
    requestsWithAuth.get,
    {
      fallbackData: [initialUsersResponse],
    }
  );

  const nextPage = useCallback(() => setSize((currentSize) => currentSize + 1), []);

  const users = data?.flatMap((coursesResponse) => coursesResponse.results) || [];
  return <UsersListView isLoading={isValidating} users={users} nextPage={nextPage} />;
};

export const getServerSideProps = withUser<ServerProps>(async (ctx, user) => {
  const requests = await Requests.fromSession(ctx);
  const usersListUrl = getUserListApiUrl({ limit: PAGE_SIZE, offset: 0 });
  const initialUsersResponse = await requests.get<ListResponse<GradesUser>>(usersListUrl);
  const props = {
    initialUsersResponse,
  };
  if (user?.isStaff) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props,
    };
  }
  return {
    props,
  };
});

export default UsersPage;
