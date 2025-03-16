import type { GradesUser } from 'models/User';
import { getUserListApiUrl } from 'common/urls';
import { UsersListView } from 'views/UsersListView';
import type { ListResponse } from 'common/requests';

import { getServerSession } from 'next-auth';

export const PAGE_SIZE = 20;

export default async function Page() {
  const session = await getServerSession();
  const usersListUrl = getUserListApiUrl({ limit: PAGE_SIZE, offset: 0 });
  const initialUsersResponse = await fetch(usersListUrl);
  const data: ListResponse<GradesUser> = await initialUsersResponse.json();

  if (!session?.user.isStaff) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return (
    <>
      <title>Admin - brukere</title>
      <meta property="description" content="Administrer brukere" />
      <UsersListView initialUsersReponse={data} />
    </>
  );
}
